# 갈피 — 디자인 스펙 (타이포그래피 에디토리얼)

문학잡지를 디지털로 옮긴 느낌. 문장 텍스트 자체가 UI이고, 나머지 요소는 그것을 받쳐주는 조연.
앱 이름 "갈피": 책갈피에서 유래, "갈피를 잡다"는 이중 의미.
레퍼런스: Readwise, 카카오 브런치 스토리, 문학동네 온라인.

---

## 컬러 팔레트

| 역할 | 이름 | HEX |
|------|------|-----|
| Background | Paper White | `#FBF8F6` |
| Surface (기본 카드) | Warm Ivory | `#F7F2ED` |
| Surface Featured (강조 카드) | Ink Black | `#2E2824` |
| Primary Text | Deep Charcoal | `#3D3530` |
| Secondary Text | Warm Umber | `#7D7068` |
| Hint / Metadata | Pale Sand | `#B09888` |
| Accent | Rose Brown | `#A86B52` |
| Like (활성) | Dusty Rose | `#D4907A` |
| Divider | Linen | `#EDE6DC` |
| Inverted Text (dark card 위) | Cream White | `#F2ECE4` |
| Inverted Secondary | Warm Ash | `#8C8078` |
| Quote Deco | Blush Pink | `#F2C4B4` |
| Inactive | Pale Taupe | `#CEC1B8` |

다크 모드 없음 — 다크 카드(Ink Black)가 다크 모드를 대신하는 강조 역할을 함.

---

## 타이포그래피

원칙: **세리프가 주인공, 산세리프는 메타 정보에만.**

| 용도 | 폰트 | 사이즈 | 굵기 | 기타 |
|------|------|--------|------|------|
| 큰 따옴표 장식 | Playfair Display | 52sp | Regular | 장식 전용, 색 `#E8DDD0` |
| 앱 타이틀 / 섹션 헤드 | Noto Serif KR | 22sp | Bold | |
| 서브 헤드 | Noto Serif KR | 14sp | SemiBold | letter-spacing 0.05em |
| 본문 문장 (카드) | Noto Serif KR | 14sp | Regular | line-height 1.85× |
| 강조 카드 본문 | Noto Serif KR | 15sp | Regular | line-height 1.9× |
| 책 제목 | Noto Serif KR | 12sp | SemiBold | |
| 저자 / 날짜 | Noto Sans KR | 11sp | Regular | color Pale Sand |
| 좋아요 수 / 뱃지 | Noto Sans KR | 11sp | Regular | |
| 버튼 레이블 | Noto Sans KR | 14sp | Medium | |
| 힌트 텍스트 | Noto Serif KR | 13sp | Light | font-style italic |

---

## 간격 & 레이아웃

```
기본 단위: 8dp
페이지 좌우 패딩: 28dp
카드 내부 패딩: 24dp (상하) / 28dp (좌우)
카드 간 구분: 1dp Linen (#E8E2D8) divider — 카드 사이 간격 없음
섹션 헤더 하단 패딩: 20dp
큰 따옴표 장식 top offset: 12dp / left offset: 22dp
본문 텍스트 top padding (따옴표 아래): 20dp
```

---

## 컴포넌트 스타일

### SentenceCard — 기본 (light)
```
배경: #FBF8F6 (Background와 동일, 구분은 divider로만)
좌우 패딩: 28dp
상하 패딩: 24dp
하단 구분선: 1dp #EDE6DC
elevation: 없음 (flat)
hover: #F7F2EE (미세한 warm 변화)
```
레이아웃:
1. **큰 따옴표 `"` 장식** (Playfair Display 56sp, `#F2C4B4` Blush Pink) — absolute, top-left
2. **본문 문장** (Noto Serif KR 14sp, `#3A342E`) — top padding 20dp으로 따옴표와 겹침 허용
3. **메타 행**: 책 제목(좌) + 좋아요(우) — 상단 margin 14dp
   - 책 제목: `#A89888` 12sp SemiBold
   - 저자: `#A89888` 10sp, 제목 아래 1dp 간격
   - 좋아요: `♡` 또는 `♥` + 카운트, 11sp

### SentenceCard — 강조 (dark/featured)
```
배경: #2E2824 (Ink Black)
나머지 구조 동일
큰 따옴표: #4A3C36 (배경보다 약간 밝아 질감만 남김)
본문: #F0EAE0
책 제목: #8A7E74
저자: #6A5E54
좋아요 비활성: #6A5E54
좋아요 활성: #C8A898 (Dusty Blush)
```
사용처: 광장 탭 첫 번째 카드 (오늘의 픽), 내 책갈피의 최근 저장 카드.

### AppBar
```
배경: #FBF8F6 (투명에 가깝게)
하단 테두리: 1dp #EDE6DC
상단 서브타이틀: Noto Serif KR 10sp, letter-spacing 0.14em, #B09888
  - 앞에 블러시 핑크 `·` 장식 문자 추가 (color #F2C4B4)
메인 타이틀: Noto Serif KR 22sp Bold, #3D3530
elevation: 0 (shadow 없음)
```

### BottomNavigationBar
```
배경: #FBF8F6
상단 테두리: 1dp #EDE6DC
높이: 72dp (하단 safe area 포함)
아이콘: outlined 계열, 22dp
활성 색: #A86B52 (Rose Brown)
비활성 색: #CEC1B8
레이블: Noto Sans KR 9sp, letter-spacing 0.05em
탭: 내 책갈피 (bookmark_outlined) / 광장 (groups_outlined)
```

### FAB (글쓰기 버튼)
```
배경: #2E2824 (Ink Black)
아이콘: edit_outlined, 22dp, #F2ECE4
형태: RoundedRectangleBorder radius 16dp
크기: 52×52dp
그림자: elevation 6, color rgba(46,40,36,0.32)
위치: bottomRight, margin 20dp
```

### 입력 필드 (글쓰기 화면)
```
배경: transparent
하단 밑줄만 사용 (UnderlineInputBorder) — 박스 border 없음
활성 밑줄: 1.5dp #A86B52
비활성 밑줄: 1dp #EDE6DC
hint: Noto Serif KR italic, #CEC1B8
본문 입력: Noto Serif KR 15sp, #3D3530, line-height 1.9
```

### 버튼
- **Primary**: 배경 `#2E2824`, 텍스트 `#F2ECE4`, radius 10dp, height 52dp
- **Text 버튼**: 텍스트 `#A86B52`, Noto Serif KR Medium
- **카카오 로그인**: 배경 `#FEE500`, radius 12dp, shadow rgba(254,229,0,0.4)

### 공유 토글
```
활성: #A86B52 (Rose Brown)
비활성: #CEC1B8
레이블: "전체 공개" — Noto Serif KR 13sp, #7A6E64
```

### 좋아요 버튼
```
아이콘: favorite_border (비활성) / favorite (활성)
비활성: #CEC1B8
활성: #D4907A (Dusty Rose)
애니메이션: scale 1.0 → 1.25 → 1.0, 200ms, Curves.easeInOut
```

### 책 검색 드롭다운 (글쓰기 화면)
```
카드 배경: #F7F2ED
테두리: 1dp #EDE6DC
radius: 12dp
shadow: 0 4dp 16dp rgba(46,40,36,0.08)
아이템: 섬네일 28×38dp (radius 4dp) + 제목 13sp Serif + 저자 11sp Sans
구분선: 0.5dp #EDE6DC
hover 배경: rgba(168,107,82,0.06)
```

### 카메라 촬영 영역
```
테두리: 1.5dp dashed #CEC1B8
radius: 12dp
배경: transparent
중앙 아이콘: photo_camera_outlined, 26dp, #CEC1B8
힌트: "촬영해서 문장을 추출하세요" — Noto Serif KR italic 13sp, #CEC1B8
높이: 110dp
hover: 테두리 색 → #A86B52
```

---

## 화면별 디자인 노트

### 로그인 화면
```
배경: #FBF8F6
구성 (center-aligned, vertical):
  - 상단: 북마크 리본 라인 SVG 아이콘 (48dp, stroke #A86B52 / 가로선 #F2C4B4)
  - 앱 이름: "갈피" — Noto Serif KR 38sp Bold, #2E2824, letter-spacing -0.02em
  - 앱 이름 아래 장식선: 28dp × 2dp, color #F0C8BC, border-radius 2dp
  - 캐치프레이즈: "오늘 읽은 문장을 기억하세요" — Noto Serif KR 13sp italic, #B09888
  - 간격 56dp
  - 카카오 로그인 버튼: #FEE500 배경, #191919 텍스트, radius 12dp
    shadow: rgba(254,229,0,0.4) blur 8dp
    → 버튼 위: "소셜 계정으로 시작하기" — 9sp, letter-spacing 0.15em, #CEC1B8
```

### 내 책갈피 탭
- AppBar 서브타이틀 "내 책갈피" (앞에 `·` 장식), 메인 타이틀은 사용자 닉네임
- 리스트 상단 카운트: pill 뱃지 — "문장 {N}개" Noto Sans KR 10sp, color `#A86B52`, 배경 rgba(168,107,82,0.10), radius 20dp
- 첫 번째 카드는 항상 dark/featured 스타일
- 빈 상태: 북마크 라인 SVG(56dp, `#CEC1B8`) + "아직 저장된 문장이 없어요" + "카메라 버튼을 눌러 첫 문장을 남겨보세요" (13sp, Serif italic, `#B09888`)

### 광장 탭
- AppBar 서브타이틀 "광장" (앞에 `·` 장식), 메인 타이틀 "오늘의 문장"
- 첫 번째 카드 → dark featured
- 피드는 구분선(divider)만으로 카드를 나눔. 카드 사이 여백 없음 — 신문 지면 느낌
- 실시간 새 문장 알림: 상단에 "새 문장 3개" 얇은 배너 (`#A86B52` 배경, 흰 텍스트)
  → 양쪽에 작은 dot(5dp, rgba(255,255,255,0.6)) 배치, 탭 시 스크롤 to top

### 글쓰기 화면
```
AppBar: "문장 추가" 타이틀, 좌: ✕ (닫기), 우: "저장" (Antique Rust 텍스트 버튼)
배경: #FAF8F4
구성 순서:
  1. 책 검색 입력 (밑줄 스타일, hint: "책 제목으로 검색")
  2. 선택된 책 정보 행 (섬네일 + 제목 + 저자) — 선택 전엔 숨김
  3. 카메라 촬영 영역 (dashed border) — 탭 시 촬영 진입
  4. OCR 결과 영역 — SelectableText, Noto Serif KR 14sp, #3D3530
     - 배경: #F7F2ED, radius 12dp, padding 16dp
     - 드래그 선택 시 커스텀 툴바: "이 문장 가져오기" 버튼만 노출 (radius 10dp)
     - 선택 하이라이트 색: #A86B52 18% opacity
     - 상단 라벨: "추출된 텍스트 · 원하는 문장을 드래그하세요"
       (Noto Serif KR italic 11sp, #A89888)
     - OCR 실행 전엔 숨김
  5. 문장 입력 TextArea — 가져온 문장 표시 및 추가 편집 (Serif 15sp, 최소 4줄)
  6. 하단 행: "전체 공개" 레이블 + 토글 스위치 (우측 정렬)
```

---

## 애니메이션 & 트랜지션

| 상황 | 효과 |
|------|------|
| 화면 전환 | `FadeTransition` 180ms — 잉크가 스며드는 느낌 |
| 카드 진입 (리스트 로드) | 아래→위 8dp 이동 + fade, 각 카드 40ms stagger |
| 좋아요 탭 | scale 1.0→1.25→1.0, 200ms, easeInOut |
| 저장 성공 | SnackBar: 배경 `#2E2824`, 텍스트 `#F2ECE4`, "문장이 저장되었습니다" |
| OCR 처리 중 | 텍스트 필드에 커서 blinking만 — 스피너 대신 |

**원칙**: 애니메이션은 200ms 이하. 튀거나 통통 튀는 효과 없음. 종이를 넘기듯 조용하게.

---

## 아이콘

- 계열: Material Icons **Outlined** (filled는 활성 상태 exclusive)
- 내 책갈피: `menu_book_outlined`
- 광장: `group_outlined`
- 글쓰기: `edit_outlined`
- 카메라: `photo_camera_outlined`
- 닫기: `close`
- 좋아요: `favorite_border` / `favorite`
- 저장: 아이콘 없이 텍스트 버튼만

---

## 앱 아이콘 & 스플래시 스크린

### 앱 아이콘
```
형태: 책갈피 리본 실루엣 라인 아이콘 (단순 선 드로잉, 내부 가로선 포함)
전경색: #A86B52 (Rose Brown), 가로선 강조: #F2C4B4 (Blush Pink)
배경색: #FBF8F6 (Paper White)
모서리 반지름: iOS/Android 플랫폼 기본값 따름 (별도 지정 없음)
그라데이션, 그림자, 텍스트 포함 금지
패키지: flutter_launcher_icons
```

### 스플래시 스크린
```
배경: #FBF8F6
중앙: 앱 이름 "갈피" — Noto Serif KR Bold (이미지로 삽입)
애니메이션 없음 — 단색 배경에 텍스트만, 0.8초 후 로그인 화면으로
패키지: flutter_native_splash
```
이유: 스플래시는 짧을수록 좋음. 로딩 애니메이션은 오히려 기다리는 느낌을 강조함.

---

## 스켈레톤 로딩 (Shimmer)

카드 리스트 첫 로드 및 페이지네이션 추가 로드 시 사용.
패키지: `shimmer: ^3.0.0`

### SentenceCard 스켈레톤
```
shimmer 기본색: #EDE8DF
shimmer 하이라이트: #F7F2ED
방향: 좌→우 sweep

구조 (실제 카드 레이아웃과 동일 높이 유지):
  - 따옴표 자리: 32×32dp 블록 (좌상단)
  - 본문 1행: 너비 100%, 높이 12dp, radius 4dp
  - 본문 2행: 너비 100%, 높이 12dp
  - 본문 3행: 너비 65%, 높이 12dp  ← 마지막 줄은 짧게 (자연스러운 문장 끝 느낌)
  - 하단 좌: 너비 40%, 높이 10dp (책 제목 자리)
  - 하단 우: 너비 20%, 높이 10dp (좋아요 자리)
행 간격: 8dp
```

카드 수: 첫 로드 시 스켈레톤 3개 표시. 실제 데이터 도착 시 fade 교체.

---

## 에러 & 빈 상태 UI

원칙: 에러 색(빨강) 사용 금지. 팔레트 내 색만 사용. 텍스트 중심, 일러스트는 최소.

### 네트워크 없음 (광장 탭)
```
전체 화면 중앙 정렬
아이콘: wifi-off 라인 SVG, 44dp, stroke #CEC1B8 (slash line: #EDE6DC)
메시지: "연결을 확인해주세요" — Noto Serif KR 15sp, #7D7068
서브: "저장된 문장은 내 책갈피에서 볼 수 있어요" — 12sp italic, #B09888
재시도 버튼: "다시 시도" — Text 버튼, Rose Brown #A86B52
```

### OCR 실패 (글쓰기 화면 인라인)
```
카메라 촬영 영역 하단에 인라인 표시 (전체 화면 대체 아님)
메시지: "텍스트를 인식하지 못했어요. 밝은 곳에서 다시 촬영해보세요"
스타일: Noto Serif KR italic 12sp, #A89888
```

### 책 검색 결과 없음 (글쓰기 화면 인라인)
```
드롭다운 위치에 단일 행
메시지: "검색 결과가 없어요" — 13sp, #A89888, 중앙 정렬
```

### 저장/삭제 실패 (SnackBar)
```
배경: #2E2824
텍스트: "저장에 실패했어요. 다시 시도해주세요" — #F2ECE4 13sp
duration: 3초
```

---

## 금지 사항

- 그라데이션 배경 사용 금지
- 드롭섀도 과용 금지 (FAB 제외 elevation 0)
- 둥근 모서리 radius 16dp 초과 금지
- 색 4가지 이상 한 화면에 동시 사용 금지
- 산세리프 폰트를 본문 문장에 사용 금지
- 애니메이션 300ms 초과 금지
