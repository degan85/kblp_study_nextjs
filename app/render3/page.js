'use client';

import { useState } from 'react';

export default function Render3Page() {
  const [fruits] = useState(['사과', '바나나', '딸기', '포도', '수박']);
  const [users] = useState([
    { id: 1, name: '김철수', age: 25, email: 'kim@example.com' },
    { id: 2, name: '이영희', age: 30, email: 'lee@example.com' },
    { id: 3, name: '박민수', age: 28, email: 'park@example.com' },
  ]);

  return (
    <div className="main-content">
      <h1 className="form-title">Render 3: 기본 리스트 렌더링</h1>

      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">1️⃣ 간단한 배열 렌더링</h2>
        <p className="text-muted-foreground mb-4">
          map() 함수를 사용하여 배열의 각 요소를 JSX로 변환합니다.
        </p>

        <div className="bg-accent p-4 rounded-lg">
          <h3 className="font-semibold mb-3">과일 목록</h3>
          {/* 📝 TODO 1: map()을 사용하여 fruits 배열 렌더링
           * 힌트: {fruits.map((fruit, index) => <li key={index}>{fruit}</li>)}
           */}
          <p>여기에 과일 리스트를 렌더링하세요</p>
        </div>
      </div>

      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">2️⃣ 객체 배열 렌더링</h2>
        <p className="text-muted-foreground mb-4">
          객체 배열을 렌더링할 때는 고유한 ID를 key로 사용합니다.
        </p>

        <div className="bg-accent p-4 rounded-lg">
          <h3 className="font-semibold mb-3">사용자 목록</h3>
          {/* 📝 TODO 2: users 배열을 카드 형식으로 렌더링
           * 힌트: {users.map((user) => <div key={user.id}>...</div>)}
           */}
          <p>여기에 사용자 리스트를 렌더링하세요</p>
        </div>
      </div>

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
            <h3 className="font-semibold mb-2">2. 객체 배열 렌더링</h3>
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

          <div className="info-box">
            <h3>🔑 key prop이 중요한 이유</h3>
            <ul className="lesson-list">
              <li>React가 어떤 항목이 변경/추가/제거되었는지 식별하는 데 사용</li>
              <li>key는 형제 요소 사이에서 고유해야 함</li>
              <li>가능하면 데이터의 고유 ID를 key로 사용하세요</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
