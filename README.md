# React Form Tutorial with Next.js

React Hook을 사용한 폼 핸들링을 단계별로 학습할 수 있는 튜토리얼 프로젝트입니다.

## 프로젝트 소개

이 프로젝트는 React의 기초부터 고급 폼 처리까지 5단계로 구성된 학습 자료입니다. 데이터베이스 대신 파일 시스템을 사용하여 폼 데이터를 저장하고 불러올 수 있습니다.

## 학습 단계

### Step 1: 기본 폼 처리
- useState를 사용한 상태 관리
- 단일 입력 필드 처리
- 기본 submit 핸들링

### Step 2: 다양한 Input 타입
- 텍스트, 이메일, 라디오, 체크박스, 텍스트영역
- 객체를 사용한 복수 상태 관리
- 여러 입력 타입 동시 처리

### Step 3: Custom Hook 활용
- useForm 커스텀 훅 사용
- 코드 재사용성 향상
- 관심사의 분리

### Step 4: 파일 저장/불러오기
- Next.js API Routes 활용
- 파일 시스템 기반 CRUD
- 저장된 데이터 관리

### Step 5: 고급 Validation
- react-hook-form 라이브러리 사용
- Zod 스키마 기반 유효성 검사
- 실시간 에러 피드백

## Git 브랜치 구조

이 프로젝트는 학습을 위한 3개의 브랜치로 구성되어 있습니다:

### 📘 main 브랜치
- 완성된 코드가 포함된 메인 브랜치
- 프로젝트 전체 구조 확인 가능

### 📗 solution 브랜치
- main과 동일한 완성 코드
- 정답 확인용 브랜치

### 📝 example 브랜치
- TODO 주석이 포함된 학습용 템플릿
- 학생들이 직접 코드를 작성하며 학습
- 각 페이지의 "핵심 코드" 섹션을 참고하여 구현

## 사용 방법

### 1. 프로젝트 설치

```bash
git clone git@github.com:degan85/kblp_study_nextjs.git
cd kblp_study_nextjs
npm install
```

### 2. 학습 시작 (example 브랜치)

```bash
# example 브랜치로 전환
git checkout example

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000`을 열어 학습을 시작하세요.

### 3. 학습 진행 방법

1. 각 Step 페이지의 하단 "핵심 코드" 섹션 확인
2. TODO 주석을 참고하여 코드 작성
3. 개발 서버에서 실시간으로 결과 확인
4. 막히는 부분이 있으면 힌트 주석 참고

### 4. 정답 확인

특정 파일의 정답을 보고 싶을 때:

```bash
# 특정 파일의 차이점 확인
git diff solution app/step1/page.js

# solution 브랜치로 전환하여 확인
git checkout solution
```

다시 학습으로 돌아가기:
```bash
git checkout example
```

## 프로젝트 구조

```
kblp_nextjs/
├── app/
│   ├── page.js           # 메인 페이지 (커리큘럼)
│   ├── step1/page.js     # Step 1: 기본 폼
│   ├── step2/page.js     # Step 2: 다양한 Input
│   ├── step3/page.js     # Step 3: Custom Hook
│   ├── step4/page.js     # Step 4: 파일 저장/불러오기
│   ├── step5/page.js     # Step 5: 고급 Validation
│   └── api/forms/route.js # API 엔드포인트
├── components/
│   └── Navigation.js     # 네비게이션 컴포넌트
├── hooks/
│   └── useForm.js        # 커스텀 훅
└── data/
    └── forms.json        # 폼 데이터 저장 파일
```

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Form Libraries**: react-hook-form, Zod
- **Runtime**: Node.js

## 학습 목표

이 튜토리얼을 완료하면 다음을 학습할 수 있습니다:

- ✅ React의 상태 관리 (useState)
- ✅ 폼 이벤트 핸들링 (onChange, onSubmit, onBlur)
- ✅ 커스텀 Hook 작성 및 활용
- ✅ Next.js API Routes 사용
- ✅ 파일 시스템 기반 데이터 저장
- ✅ react-hook-form과 Zod를 활용한 유효성 검사
- ✅ 에러 처리 및 사용자 피드백

## 개발 환경

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 문제 해결

### 서버가 실행되지 않을 때
- Node.js 버전 확인 (18.17 이상 권장)
- `node_modules` 삭제 후 재설치: `rm -rf node_modules && npm install`

### 브랜치 전환 후 코드가 안 보일 때
- 브라우저 캐시 삭제 또는 새로고침 (Ctrl + Shift + R)
- 개발 서버 재시작

### 파일 저장이 안 될 때
- `data` 디렉토리가 존재하는지 확인
- 파일 쓰기 권한 확인

## 라이선스

MIT

## 기여

이슈나 개선 사항이 있으면 GitHub Issues로 제보해주세요.
