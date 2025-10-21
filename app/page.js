import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-primary to-primary/70 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">React 폼 기초 수업</h1>
        <p className="text-lg">
          React Hook을 활용한 폼 처리를 단계별로 학습하는 실습 프로젝트입니다.
        </p>
      </div>

      <div className="form-container mb-8">
        <h2 className="text-2xl font-bold mb-6">📚 수업 개요</h2>

        <div className="space-y-4">
          <div className="info-box">
            <h3>학습 목표</h3>
            <ul className="lesson-list">
              <li>React의 상태 관리와 폼 처리 기초 이해</li>
              <li>useState Hook을 사용한 입력 값 관리</li>
              <li>커스텀 Hook 작성 및 활용</li>
              <li>파일 시스템을 활용한 데이터 저장/불러오기</li>
              <li>유효성 검사 구현 및 에러 처리</li>
            </ul>
          </div>

          <div className="info-box">
            <h3>필요한 사전 지식</h3>
            <ul className="lesson-list">
              <li>JavaScript ES6+ 기본 문법</li>
              <li>React 기본 개념 (컴포넌트, Props, State)</li>
              <li>HTML/CSS 기초</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="form-container">
        <h2 className="text-2xl font-bold mb-6">🎯 학습 단계</h2>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">Step 1: 기본 폼</h3>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                입문
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              useState Hook을 사용한 가장 기본적인 폼 처리를 학습합니다.
              단일 입력 필드의 상태 관리와 이벤트 처리 방법을 익힙니다.
            </p>
            <div className="mb-4">
              <strong>핵심 개념:</strong>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>useState Hook 사용법</li>
                <li>onChange 이벤트 핸들링</li>
                <li>onSubmit과 preventDefault</li>
                <li>양방향 데이터 바인딩</li>
              </ul>
            </div>
            <Link href="/step1" className="btn btn-primary inline-block">
              학습 시작 →
            </Link>
          </div>

          {/* Step 2 */}
          <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">Step 2: 다중 입력 폼</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                초급
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              여러 입력 필드를 가진 복잡한 폼을 다룹니다.
              객체 상태 관리와 다양한 입력 타입 처리 방법을 학습합니다.
            </p>
            <div className="mb-4">
              <strong>핵심 개념:</strong>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>객체 상태 관리</li>
                <li>통합 변경 핸들러</li>
                <li>다양한 입력 타입 (radio, checkbox, select)</li>
                <li>스프레드 연산자 활용</li>
              </ul>
            </div>
            <Link href="/step2" className="btn btn-primary inline-block">
              학습 시작 →
            </Link>
          </div>

          {/* Step 3 */}
          <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">Step 3: 커스텀 훅</h3>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                중급
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              재사용 가능한 커스텀 훅을 작성하여 폼 로직을 분리합니다.
              touched 상태와 기본 유효성 검사를 구현합니다.
            </p>
            <div className="mb-4">
              <strong>핵심 개념:</strong>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>커스텀 훅 작성</li>
                <li>로직 재사용성</li>
                <li>touched 상태 관리</li>
                <li>포맷터 함수 구현</li>
              </ul>
            </div>
            <Link href="/step3" className="btn btn-primary inline-block">
              학습 시작 →
            </Link>
          </div>

          {/* Step 4 */}
          <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">Step 4: 파일 저장/불러오기</h3>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                중급
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              API Routes를 사용하여 폼 데이터를 파일로 저장하고 불러오는 기능을 구현합니다.
              비동기 작업 처리와 로딩 상태 관리를 학습합니다.
            </p>
            <div className="mb-4">
              <strong>핵심 개념:</strong>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>Next.js API Routes</li>
                <li>파일 시스템 활용</li>
                <li>fetch API와 async/await</li>
                <li>로딩 및 오류 처리</li>
              </ul>
            </div>
            <Link href="/step4" className="btn btn-primary inline-block">
              학습 시작 →
            </Link>
          </div>

          {/* Step 5 */}
          <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-semibold">Step 5: 고급 Validation</h3>
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                고급
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              react-hook-form과 Zod를 사용한 고급 폼 관리를 학습합니다.
              스키마 기반 유효성 검사와 실시간 검증을 구현합니다.
            </p>
            <div className="mb-4">
              <strong>핵심 개념:</strong>
              <ul className="list-disc list-inside mt-2 text-sm space-y-1">
                <li>react-hook-form 라이브러리</li>
                <li>Zod 스키마 검증</li>
                <li>실시간 유효성 검사</li>
                <li>비밀번호 강도 체크</li>
              </ul>
            </div>
            <Link href="/step5" className="btn btn-primary inline-block">
              학습 시작 →
            </Link>
          </div>
        </div>
      </div>

      <div className="form-container mt-8">
        <h2 className="text-2xl font-bold mb-6">💡 학습 팁</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="font-semibold mb-2">코드를 직접 수정해보세요</h4>
            <p className="text-sm">
              예제 코드를 복사해서 수정하며 동작 원리를 이해하세요.
            </p>
          </div>

          <div className="bg-accent p-4 rounded-lg">
            <h4 className="font-semibold mb-2">브라우저 개발자 도구 활용</h4>
            <p className="text-sm">
              Console을 열어 상태 변화와 이벤트를 확인하세요.
            </p>
          </div>

          <div className="bg-accent p-4 rounded-lg">
            <h4 className="font-semibold mb-2">단계별로 진행하기</h4>
            <p className="text-sm">
              각 단계를 충분히 이해한 후 다음 단계로 넘어가세요.
            </p>
          </div>

          <div className="bg-accent p-4 rounded-lg">
            <h4 className="font-semibold mb-2">실습 프로젝트 만들기</h4>
            <p className="text-sm">
              학습한 내용을 바탕으로 자신만의 폼을 만들어보세요.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-muted rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          이 프로젝트는 React 폼 처리를 학습하기 위한 교육용 자료입니다.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          문의사항이나 피드백은 언제든지 환영합니다!
        </p>
      </div>
    </div>
  );
}
