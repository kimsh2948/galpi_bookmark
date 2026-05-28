import * as admin from "firebase-admin";
import {onCall, HttpsError} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import axios from "axios";

admin.initializeApp();

const kakaoRestApiKey = defineSecret("KAKAO_REST_API_KEY");

// ─── 1. 카카오 → Firebase Custom Token 발급 ───────────────────────────────────
export const kakaoCustomToken = onCall(
  {region: "asia-northeast3"},
  async (request) => {
    const kakaoAccessToken: string = request.data.accessToken;
    if (!kakaoAccessToken) {
      throw new HttpsError("invalid-argument", "accessToken이 필요합니다.");
    }

    const kakaoUser = await axios
      .get("https://kapi.kakao.com/v2/user/me", {
        headers: {Authorization: `Bearer ${kakaoAccessToken}`},
      })
      .catch(() => {
        throw new HttpsError("unauthenticated", "카카오 토큰이 유효하지 않습니다.");
      });

    const kakaoId = String(kakaoUser.data.id);
    const nickname = kakaoUser.data.kakao_account?.profile?.nickname ?? "";
    const profileImage =
      kakaoUser.data.kakao_account?.profile?.profile_image_url ?? "";

    const uid = `kakao:${kakaoId}`;
    await admin.firestore().collection("users").doc(uid).set(
      {uid, kakaoId, nickname, profileImage},
      {merge: true}
    );

    const customToken = await admin.auth().createCustomToken(uid, {
      kakaoId,
      nickname,
    });

    return {customToken};
  }
);

// ─── 2. 카카오 책 검색 API 프록시 ─────────────────────────────────────────────
export const searchBooks = onCall(
  {region: "asia-northeast3", secrets: [kakaoRestApiKey]},
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "로그인이 필요합니다.");
    }

    const query: string = request.data.query;
    const page: number = request.data.page ?? 1;
    const size: number = Math.min(request.data.size ?? 10, 50);

    if (!query || query.trim().length === 0) {
      throw new HttpsError("invalid-argument", "검색어가 필요합니다.");
    }

    const response = await axios
      .get("https://dapi.kakao.com/v3/search/book", {
        params: {query: query.trim(), page, size, target: "title"},
        headers: {Authorization: `KakaoAK ${kakaoRestApiKey.value()}`},
      })
      .catch(() => {
        throw new HttpsError("internal", "책 검색에 실패했습니다.");
      });

    return {
      books: response.data.documents.map((book: {
        title: string;
        authors: string[];
        thumbnail: string;
        isbn: string;
      }) => ({
        title: book.title,
        author: book.authors.join(", "),
        thumbnail: book.thumbnail,
        isbn: book.isbn,
      })),
      isEnd: response.data.meta.is_end,
    };
  }
);
