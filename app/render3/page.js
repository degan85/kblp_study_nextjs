'use client';

import { useState } from 'react';

export default function Render3Page() {
  // 예제 데이터들
  const [fruits] = useState(['사과', '바나나', '딸기', '포도', '수박']);

  const [users] = useState([
    { id: 1, name: '김철수', age: 25, email: 'kim@example.com' },
    { id: 2, name: '이영희', age: 30, email: 'lee@example.com' },
    { id: 3, name: '박민수', age: 28, email: 'park@example.com' },
    { id: 4, name: '정수진', age: 32, email: 'jung@example.com' },
  ]);

  const [products] = useState([
    { id: 101, name: '노트북', price: 1200000, category: '전자제품', stock: 5 },
    { id: 102, name: '마우스', price: 35000, category: '전자제품', stock: 20 },
    { id: 103, name: '키보드', price: 89000, category: '전자제품', stock: 15 },
    { id: 104, name: '모니터', price: 350000, category: '전자제품', stock: 8 },
    { id: 105, name: '책상', price: 250000, category: '가구', stock: 3 },
  ]);

  const [comments] = useState([
    { id: 1, author: '김철수', text: '정말 유용한 정보네요!', date: '2024-01-15' },
    { id: 2, author: '이영희', text: '도움이 많이 되었습니다.', date: '2024-01-16' },
    { id: 3, author: '박민수', text: '감사합니다!', date: '2024-01-17' },
  ]);

  return (
    <div className="main-content">
      <h1 className="form-title">Render 3: 기본 리스트 렌더링</h1>

      {/* 방법 1: 간단한 배열 렌더링 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">1️⃣ 간단한 배열 렌더링</h2>
        <p className="text-muted-foreground mb-4">
          map() 함수를 사용하여 배열의 각 요소를 JSX로 변환합니다.
        </p>

        <div className="bg-accent p-4 rounded-lg">
          <h3 className="font-semibold mb-3">과일 목록</h3>
          <ul className="space-y-2">
            {fruits.map((fruit, index) => (
              <li
                key={index}
                className="bg-background p-3 rounded border border-border flex items-center"
              >
                <span className="text-2xl mr-3">🍎</span>
                <span>{fruit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="info-box mt-4">
          <h4 className="font-semibold mb-2">⚠️ key prop 주의사항</h4>
          <p className="text-sm">
            위 예제에서는 index를 key로 사용했지만, 실전에서는 고유한 ID를 사용하는 것이 좋습니다.
            리스트가 변경되지 않는 정적 데이터일 때만 index를 사용하세요.
          </p>
        </div>
      </div>

      {/* 방법 2: 객체 배열 렌더링 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">2️⃣ 객체 배열 렌더링</h2>
        <p className="text-muted-foreground mb-4">
          객체 배열을 렌더링할 때는 고유한 ID를 key로 사용합니다.
        </p>

        <div className="bg-accent p-4 rounded-lg">
          <h3 className="font-semibold mb-3">사용자 목록</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-background p-4 rounded border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold">{user.name}</h4>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    ID: {user.id}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">나이: {user.age}세</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 방법 3: 테이블 형식 렌더링 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">3️⃣ 테이블 형식 렌더링</h2>
        <p className="text-muted-foreground mb-4">
          표 형식으로 데이터를 보여줄 때도 map()을 활용합니다.
        </p>

        <div className="bg-accent p-4 rounded-lg overflow-x-auto">
          <h3 className="font-semibold mb-3">제품 목록</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">제품명</th>
                <th className="text-left p-2">가격</th>
                <th className="text-left p-2">카테고리</th>
                <th className="text-left p-2">재고</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-background"
                >
                  <td className="p-2 text-sm">{product.id}</td>
                  <td className="p-2 text-sm font-semibold">{product.name}</td>
                  <td className="p-2 text-sm">
                    {product.price.toLocaleString()}원
                  </td>
                  <td className="p-2 text-sm">{product.category}</td>
                  <td className="p-2 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        product.stock > 10
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 5
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.stock}개
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 방법 4: 카드 형식 렌더링 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">4️⃣ 카드 형식 렌더링</h2>
        <p className="text-muted-foreground mb-4">
          각 아이템을 카드 형태로 보여주는 일반적인 UI 패턴입니다.
        </p>

        <div className="bg-accent p-4 rounded-lg">
          <h3 className="font-semibold mb-3">댓글 목록</h3>
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-background p-4 rounded border border-border"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mr-2">
                      {comment.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{comment.author}</p>
                      <p className="text-xs text-muted-foreground">{comment.date}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm mt-2">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 방법 5: 빈 리스트 처리 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">5️⃣ 빈 리스트 처리</h2>
        <p className="text-muted-foreground mb-4">
          리스트가 비어있을 때 적절한 메시지를 표시하는 것이 좋은 UX입니다.
        </p>

        <div className="bg-accent p-4 rounded-lg">
          <h3 className="font-semibold mb-3">알림 목록</h3>
          {[].length > 0 ? (
            <ul className="space-y-2">
              {[].map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          ) : (
            <div className="bg-background p-8 rounded text-center">
              <p className="text-4xl mb-2">📭</p>
              <p className="text-muted-foreground">표시할 알림이 없습니다</p>
            </div>
          )}
        </div>
      </div>

      {/* 실전 예제: 대시보드 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">6️⃣ 실전 예제: 통계 대시보드</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: '전체 사용자', value: users.length, color: 'bg-blue-50 border-blue-300 text-blue-800', icon: '👥' },
            { label: '전체 제품', value: products.length, color: 'bg-green-50 border-green-300 text-green-800', icon: '📦' },
            { label: '전체 댓글', value: comments.length, color: 'bg-purple-50 border-purple-300 text-purple-800', icon: '💬' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-6 ${stat.color}`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-sm font-semibold mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-accent p-4 rounded-lg">
          <h3 className="font-semibold mb-3">재고가 적은 제품</h3>
          <div className="space-y-2">
            {products
              .filter((p) => p.stock < 10)
              .map((product) => (
                <div
                  key={product.id}
                  className="bg-background p-3 rounded border border-border flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-semibold">
                    재고: {product.stock}개
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 핵심 코드 설명 */}
      <div className="form-container bg-muted">
        <h2 className="text-xl font-bold mb-4">💡 핵심 코드</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. 기본 map() 사용법</h3>
            <div className="code-block">
              <pre>{`const fruits = ['사과', '바나나', '딸기'];

return (
  <ul>
    {fruits.map((fruit, index) => (
      <li key={index}>{fruit}</li>
    ))}
  </ul>
);`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. 객체 배열 렌더링 (고유 ID 사용)</h3>
            <div className="code-block">
              <pre>{`const users = [
  { id: 1, name: '김철수', age: 25 },
  { id: 2, name: '이영희', age: 30 },
];

return (
  <div>
    {users.map((user) => (
      <div key={user.id}>
        <h3>{user.name}</h3>
        <p>{user.age}세</p>
      </div>
    ))}
  </div>
);`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. 빈 배열 처리</h3>
            <div className="code-block">
              <pre>{`{items.length > 0 ? (
  items.map((item) => <div key={item.id}>{item.name}</div>)
) : (
  <p>표시할 항목이 없습니다</p>
)}`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. filter()와 map() 조합</h3>
            <div className="code-block">
              <pre>{`{products
  .filter((product) => product.stock < 10)
  .map((product) => (
    <div key={product.id}>{product.name}</div>
  ))}`}</pre>
            </div>
          </div>

          <div className="info-box">
            <h3>🔑 key prop이 중요한 이유</h3>
            <ul className="lesson-list">
              <li>React가 어떤 항목이 변경/추가/제거되었는지 식별하는 데 사용</li>
              <li>key는 형제 요소 사이에서 고유해야 함 (전역적으로 고유할 필요는 없음)</li>
              <li>index를 key로 사용하면 리스트 순서가 바뀔 때 버그가 발생할 수 있음</li>
              <li>가능하면 데이터의 고유 ID를 key로 사용하세요</li>
            </ul>
          </div>

          <div className="info-box">
            <h3>⚡ 성능 최적화 팁</h3>
            <ul className="lesson-list">
              <li>map() 내부에 복잡한 로직을 넣지 말고, 컴포넌트로 분리하기</li>
              <li>큰 리스트는 가상 스크롤(react-window, react-virtualized) 사용 고려</li>
              <li>filter()와 map()을 연속으로 쓸 때는 한 번만 순회하도록 최적화 고려</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
