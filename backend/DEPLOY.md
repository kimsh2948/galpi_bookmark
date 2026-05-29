# 갈피 — Firebase 배포 현황

## 프로젝트 정보
- **Firebase 프로젝트 ID**: `galpi-ddfe5`
- **리전**: `asia-northeast3` (서울)
- **인증 계정**: forkdev0@gmail.com
- **플랜**: Blaze (pay-as-you-go) ✅

---

## 배포 현황

| 항목 | 상태 | 비고 |
|------|------|------|
| Firestore 보안 규칙 | ✅ 완료 | |
| Firestore 복합 인덱스 | ✅ 완료 | isPublic + createdAt |
| KAKAO_REST_API_KEY Secret 등록 | ✅ 완료 | Secret Manager v1 |
| Functions 빌드 (TypeScript → JS) | ✅ 완료 | `backend/functions/lib/` |
| Functions 배포 | ✅ 완료 | kakaoCustomToken, searchBooks |

---

## Functions 배포 실패 원인 및 해결 방법

**원인**: Cloud Functions v2(2세대) 첫 배포 시 Cloud Build 서비스 계정에 권한 미부여

**해결 (1회만 하면 됨)**:

1. 아래 링크 접속:
   ```
   https://console.cloud.google.com/iam-admin/iam?project=galpi-ddfe5
   ```

2. **"+ 액세스 권한 부여"** 클릭

3. 새 주 구성원에 입력:
   ```
   552335874482@cloudbuild.gserviceaccount.com
   ```

4. 역할: **서비스 계정 사용자 (roles/iam.serviceAccountUser)** 선택

5. 저장

**해결 후 재배포 명령어**:
```bash
cd backend
firebase deploy --only functions --project galpi-ddfe5
```

---

## 배포 완료 후 남은 작업

### 1. Firebase Auth 확인
Firebase 콘솔 → Authentication → 로그인 방법에서 **익명 또는 커스텀 토큰** 활성화 여부 확인
```
https://console.firebase.google.com/project/galpi-ddfe5/authentication
```

### 2. 배포된 Functions 엔드포인트 확인
배포 완료 후 아래 명령어로 확인:
```bash
firebase functions:list --project galpi-ddfe5
```
예상 엔드포인트:
- `kakaoCustomToken` — `https://asia-northeast3-galpi-ddfe5.cloudfunctions.net/kakaoCustomToken`
- `searchBooks` — `https://asia-northeast3-galpi-ddfe5.cloudfunctions.net/searchBooks`

### 3. Flutter 앱 작업 (별도 진행)
`app/` 디렉터리에서 진행. Flutter SDK + Android Studio 설치 필요.
- `google-services.json` → Firebase 콘솔에서 Android 앱 등록 후 다운로드 → `app/android/app/` 에 배치
- 카카오 네이티브 앱 키 → `app/android/app/src/main/AndroidManifest.xml` 에 등록

---

## 로컬 개발 참고

### 에뮬레이터 실행
```bash
cd backend
firebase emulators:start --only functions,firestore --project galpi-ddfe5
```

### Functions 재빌드
```bash
cd backend/functions
npm run build
```

### Secret 로컬 테스트용 (.env.local)
```
# backend/functions/.env.local (gitignore 처리됨 — 실제 키 값은 팀 내부 공유)
KAKAO_REST_API_KEY=여기에_실제_키_입력
```
