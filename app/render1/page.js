'use client';

import { useState } from 'react';

export default function Render1Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMessages, setHasMessages] = useState(true);
  const [messageCount, setMessageCount] = useState(5);

  // 방법 1: if/else 문을 사용한 조건부 렌더링
  const renderLoginStatus = () => {
    if (isLoggedIn) {
      return <p className="text-green-600 font-semibold">✅ 로그인되었습니다</p>;
    } else {
      return <p className="text-red-600 font-semibold">❌ 로그인이 필요합니다</p>;
    }
  };

  return (
    <div className="main-content">
      <h1 className="form-title">Render 1: 기본 조건부 렌더링</h1>

      {/* 방법 1: if/else 함수 사용 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">1️⃣ if/else 조건문</h2>
        <p className="text-muted-foreground mb-4">
          함수 내에서 if/else를 사용하여 조건에 따라 다른 JSX를 반환할 수 있습니다.
        </p>

        <div className="bg-accent p-4 rounded-lg mb-4">
          {renderLoginStatus()}
        </div>

        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="btn btn-primary"
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
      </div>

      {/* 방법 2: 삼항 연산자 (? :) */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">2️⃣ 삼항 연산자 (? :)</h2>
        <p className="text-muted-foreground mb-4">
          JSX 내부에서 직접 조건부 렌더링을 할 때 가장 많이 사용하는 방법입니다.
        </p>

        <div className="bg-accent p-4 rounded-lg mb-4">
          {isLoggedIn ? (
            <div className="space-y-2">
              <p className="text-green-600 font-semibold">👤 환영합니다!</p>
              <p className="text-sm">대시보드에 접근할 수 있습니다.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-red-600 font-semibold">🔒 로그인이 필요합니다</p>
              <p className="text-sm">서비스를 이용하려면 로그인하세요.</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="btn btn-primary"
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
      </div>

      {/* 방법 3: 논리 AND 연산자 (&&) */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">3️⃣ 논리 AND 연산자 (&&)</h2>
        <p className="text-muted-foreground mb-4">
          조건이 true일 때만 렌더링하고 싶을 때 사용합니다. (false일 때는 아무것도 표시하지 않음)
        </p>

        <div className="bg-accent p-4 rounded-lg mb-4">
          {hasMessages && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
              <p className="text-blue-700 dark:text-blue-300 font-semibold">
                📬 새로운 메시지가 {messageCount}개 있습니다
              </p>
            </div>
          )}

          {!hasMessages && (
            <p className="text-muted-foreground">
              📭 메시지가 없습니다
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setHasMessages(!hasMessages)}
            className="btn btn-primary"
          >
            메시지 {hasMessages ? '숨기기' : '보이기'}
          </button>

          {hasMessages && (
            <button
              onClick={() => setMessageCount(messageCount + 1)}
              className="btn btn-secondary"
            >
              메시지 추가
            </button>
          )}
        </div>
      </div>

      {/* 방법 4: 조합 예제 (로그인/로그아웃 UI) */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">4️⃣ 실전 예제: 로그인 UI</h2>
        <p className="text-muted-foreground mb-4">
          여러 조건부 렌더링 기법을 조합하여 실제 UI를 만듭니다.
        </p>

        <div className="border border-border rounded-lg p-6 bg-accent">
          {/* 헤더 */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">마이 페이지</h3>
            <div className={`px-3 py-1 rounded-full text-sm ${
              isLoggedIn
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {isLoggedIn ? '온라인' : '오프라인'}
            </div>
          </div>

          {/* 로그인 상태에 따른 콘텐츠 */}
          {isLoggedIn ? (
            <div className="space-y-4">
              <div className="bg-background p-4 rounded">
                <p className="font-semibold mb-2">👤 사용자 정보</p>
                <p className="text-sm text-muted-foreground">이름: 홍길동</p>
                <p className="text-sm text-muted-foreground">이메일: hong@example.com</p>
              </div>

              {hasMessages && (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    📬 읽지 않은 메시지 {messageCount}개
                  </p>
                </div>
              )}

              <button
                onClick={() => setIsLoggedIn(false)}
                className="btn btn-danger w-full"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-background p-4 rounded text-center">
                <p className="text-muted-foreground mb-2">
                  로그인하여 더 많은 기능을 이용하세요
                </p>
                <p className="text-sm text-muted-foreground">
                  ✨ 개인화된 콘텐츠<br />
                  📊 대시보드 접근<br />
                  💬 메시지 확인
                </p>
              </div>

              <button
                onClick={() => setIsLoggedIn(true)}
                className="btn btn-primary w-full"
              >
                로그인하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 핵심 코드 설명 */}
      <div className="form-container bg-muted">
        <h2 className="text-xl font-bold mb-4">💡 핵심 코드</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. if/else 조건문</h3>
            <div className="code-block">
              <pre>{`const renderComponent = () => {
  if (조건) {
    return <div>참일 때 보여줄 JSX</div>;
  } else {
    return <div>거짓일 때 보여줄 JSX</div>;
  }
};

return <div>{renderComponent()}</div>;`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. 삼항 연산자</h3>
            <div className="code-block">
              <pre>{`{조건 ? (
  <div>참일 때 보여줄 JSX</div>
) : (
  <div>거짓일 때 보여줄 JSX</div>
)}`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. 논리 AND 연산자 (&&)</h3>
            <div className="code-block">
              <pre>{`{조건 && <div>조건이 참일 때만 보여줄 JSX</div>}

{!조건 && <div>조건이 거짓일 때만 보여줄 JSX</div>}`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. 조건부 클래스 적용</h3>
            <div className="code-block">
              <pre>{`<div className={\`기본클래스 \${조건 ? '참일때클래스' : '거짓일때클래스'}\`}>
  내용
</div>`}</pre>
            </div>
          </div>

          <div className="info-box">
            <h3>⚡ 언제 어떤 방법을 사용할까?</h3>
            <ul className="lesson-list">
              <li><strong>if/else</strong>: 복잡한 로직이 필요하거나 여러 줄의 코드가 필요할 때</li>
              <li><strong>삼항 연산자</strong>: 간단한 조건으로 두 가지 중 하나를 선택할 때 (가장 많이 사용)</li>
              <li><strong>&& 연산자</strong>: 조건이 참일 때만 렌더링하고, 거짓일 때는 아무것도 안 보여줄 때</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
