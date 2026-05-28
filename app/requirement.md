📚 문장 수집가
1. 핵심 기능
OCR 문장 추출: 카메라 촬영 ➡️ 구글 ML Kit로 글자 추출 및 수동 수정

도서 매핑: 제목 직접 검색 (바코드는 추후 확장, 카카오 오픈 API 연동)

공유 피드: Firebase 로그인 후 전체 공개 토글 스위치로 서버 저장

2. 핵심 화면
- 로그인 화면
[카카오 소셜 로그인]

- 메인 화면 (탭 2개)
[내 서재]: 내가 저장한 문장 리스트 (로컬/서버 동기화)

[광장]: 남들이 공유한 문장 리스트 (좋아요 기능 포함)

- 글쓰기 화면
구성 요소: 책 제목 검색창 + 카메라 버튼 + 추출된 텍스트 확인창 + 공유 여부 토글 스위치

3. 기술 스택
Frontend: Flutter

On-Device: Google ML Kit Text Recognition (한국어 지원)

Authentication: 카카오 로그인 (Kakao SDK)

Backend: Firebase (Auth, Firestore DB)

Book API: 카카오 책 검색 API