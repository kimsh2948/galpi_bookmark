# 갈피

Flutter 앱. 책 페이지를 촬영해 문장을 추출·저장하고, 다른 사용자와 공유하는 독서 소셜 앱.
앱 이름 "갈피"는 책갈피에서 유래. "갈피를 잡다"는 의미도 겸함.

디자인 스펙: @DESIGN.md

## 기술 스택

- **Frontend**: Flutter (Dart)
- **OCR**: Google ML Kit Text Recognition (한국어 지원)
- **인증**: 카카오 로그인 (Kakao SDK for Flutter)
- **백엔드**: Firebase Auth + Firestore
- **도서 검색**: 카카오 책 검색 API (`https://dapi.kakao.com/v3/search/book`)

## 앱 구조 (app/ 기준)

```
app/                             # Flutter 앱 루트 (여기서 flutter run)
  lib/
    main.dart
    screens/
      login_screen.dart          # 카카오 소셜 로그인
      main_screen.dart           # 하단 탭 2개 (내 책갈피 / 광장)
      my_bookmarks_screen.dart   # 내가 저장한 문장 리스트
      plaza_screen.dart          # 공유된 문장 피드 + 좋아요
      write_screen.dart          # 문장 작성 (카메라 + 책 검색 + 공유 토글)
    services/
      kakao_auth_service.dart
      firebase_service.dart
      ocr_service.dart
      book_search_service.dart   # Functions 프록시 호출
    models/
      sentence.dart
      book.dart
      user.dart
    widgets/
      sentence_card.dart
      book_search_field.dart
  android/
  ios/
  pubspec.yaml
  CLAUDE.md                      # 이 파일
  design.md                      # 디자인 스펙
```

백엔드는 `../backend/` 디렉터리에 분리되어 있음:
- `../backend/functions/` — Firebase Cloud Functions (kakaoCustomToken, searchBooks)
- `../backend/firebase.json` — Firebase 서비스 설정
- `../backend/firestore.rules` — Firestore 보안 규칙

## 핵심 화면별 스펙

### 로그인 화면
- 카카오 소셜 로그인 버튼 하나
- 로그인 성공 시 메인 화면으로 이동
- Firebase Auth와 카카오 토큰 연동 (Custom Token 방식)

### 메인 화면
- `BottomNavigationBar` 탭 2개: **내 책갈피** / **광장**
- FAB(플로팅 버튼)으로 글쓰기 화면 진입

### 내 책갈피 탭
- 내가 저장한 문장 카드 리스트
- 로컬 캐시 **Hive** + Firestore 동기화
- 카드: 책 제목, 추출 문장, 저장 날짜, 공개 여부 표시
- **카드 롱프레스** → 바텀시트 메뉴 3가지: 편집 / 공개·비공개 전환 / 삭제
  - 편집: 글쓰기 화면 재진입 (기존 데이터 pre-fill)
  - 삭제: 확인 다이얼로그 후 Hive + Firestore 동시 삭제

### 광장 탭
- `isPublic == true`인 전체 문장 Firestore **무한 스크롤** (cursor pagination)
  - 첫 로드: 최신 20개, 스크롤 끝 도달 시 `startAfterDocument`로 20개씩 추가 fetch
- 좋아요 버튼 (likes 카운트 필드, 중복 방지용 likedBy 배열)
- 최신순 정렬

### 글쓰기 화면
구성 순서 (위→아래):
1. **책 제목 검색창** — 카카오 책 검색 API, 결과 드롭다운 선택
2. **카메라 버튼** — `image_picker`로 촬영 → ML Kit OCR 실행
3. **OCR 결과 텍스트** — `SelectableText` 위젯으로 표시, 드래그로 원하는 문장 선택
   - 텍스트 선택 시 상단에 "이 문장 가져오기" 커스텀 툴바 버튼 노출 (`SelectableText.selectionControls`)
   - "가져오기" 탭 → 아래 입력창에 선택된 텍스트 복사
4. **문장 입력창** — 가져온 문장을 수동으로 추가 편집 가능한 `TextField`
5. **공유 여부 토글** — `Switch` 위젯, 기본값 `false` (비공개)
6. **저장 버튼** — Firestore 저장 후 내 책갈피로 복귀

OCR 흐름 요약: 촬영 → ML Kit 전체 텍스트 추출 → SelectableText 표시 → 드래그 선택 → "가져오기" → TextField에 반영 → 편집 후 저장

## Firestore 데이터 모델

### `sentences` 컬렉션
```json
{
  "id": "auto",
  "userId": "string",
  "userNickname": "string",
  "bookTitle": "string",
  "bookAuthor": "string",
  "bookThumbnail": "string (url)",
  "text": "string",
  "isPublic": false,
  "likes": 0,
  "likedBy": [],
  "createdAt": "Timestamp"
}
```

### `users` 컬렉션
```json
{
  "uid": "string",
  "kakaoId": "string",
  "nickname": "string",
  "profileImage": "string (url)",
  "createdAt": "Timestamp"
}
```

## 주요 패키지 (pubspec.yaml)

```yaml
dependencies:
  flutter:
    sdk: flutter
  # 인증
  kakao_flutter_sdk_user: ^1.9.0
  firebase_core: ^3.0.0
  firebase_auth: ^5.0.0
  cloud_firestore: ^5.0.0
  # OCR
  google_mlkit_text_recognition: ^0.13.0
  image_picker: ^1.1.0
  # 로컬 캐시
  hive_flutter: ^1.1.0
  # HTTP
  http: ^1.2.0
  # 상태관리
  provider: ^6.1.0
  # UI
  shimmer: ^3.0.0
  flutter_native_splash: ^2.4.0

dev_dependencies:
  flutter_launcher_icons: ^0.14.0
  hive_generator: ^2.0.0
  build_runner: ^2.4.0
```

## 환경 변수 / API 키

- `KAKAO_NATIVE_APP_KEY`: 카카오 네이티브 앱 키 (AndroidManifest, Info.plist에도 등록)
- `KAKAO_REST_API_KEY`: 책 검색 API 호출 시 `Authorization: KakaoAK {KEY}` 헤더
- Firebase: `google-services.json` (Android), `GoogleService-Info.plist` (iOS)
- 카카오 커스텀 스킴: `kakao{NATIVE_APP_KEY}://oauth`

## 구현 시 주의사항

- OCR 후 텍스트는 항상 사용자가 수정할 수 있어야 함 (자동완성 강제 금지)
- 공유 토글은 저장 시점에만 적용, 저장 후에도 내 책갈피 롱프레스 메뉴에서 전환 가능
- 좋아요 중복 방지: `likedBy` 배열에 `userId` 포함 여부로 체크, Firestore transaction 사용
- 광장 피드 Firestore 복합 인덱스 필요: `isPublic ASC` + `createdAt DESC`
- 로컬 캐시(Hive) Box 이름: `sentences` — `SentenceModel` TypeAdapter 등록
- Hive는 앱 시작 시 `Hive.initFlutter()` + `Hive.openBox('sentences')` 순서 보장
- 카카오 로그인 → Firebase Custom Token: 서버리스 환경이면 Firebase Functions로 토큰 발급
- OCR 촬영 이미지는 텍스트 추출 후 즉시 폐기 — Firebase Storage 미사용
- 바코드 스캔은 추후 확장 (현재는 텍스트 검색만 구현)
