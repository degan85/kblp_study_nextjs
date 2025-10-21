'use client';

import { useState } from 'react';

export default function Step1Page() {
  // useState를 사용한 상태 관리
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    setSubmittedName(name);
    console.log('제출된 이름:', name);
  };

  // 입력 변경 핸들러
  const handleChange = (e) => {
    setName(e.target.value);
  };

  // 초기화 핸들러
  const handleReset = () => {
    setName('');
    setSubmittedName('');
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Step 1: 기본 폼 예제</h1>

      <div className="info-box">
        <h3>학습 목표</h3>
        <ul className="lesson-list">
          <li>useState Hook을 사용한 상태 관리</li>
          <li>onChange 이벤트를 통한 입력 값 추적</li>
          <li>onSubmit 이벤트를 통한 폼 제출 처리</li>
          <li>e.preventDefault()로 기본 동작 방지</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            이름을 입력하세요:
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={handleChange}
            placeholder="예: 홍길동"
          />
        </div>

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            제출
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            초기화
          </button>
        </div>
      </form>

      {/* 실시간 입력 값 표시 */}
      <div className="data-display">
        <h3 className="data-title">현재 입력 값:</h3>
        <div className="data-content">
          {name || '(입력 대기중...)'}
        </div>
      </div>

      {/* 제출된 값 표시 */}
      {submittedName && (
        <div className="success-message">
          <strong>제출 완료!</strong>
          <p>안녕하세요, {submittedName}님!</p>
        </div>
      )}

      {/* 코드 예시 */}
      <div className="code-block">
        <h3>핵심 코드:</h3>
        <pre>{`// useState를 사용한 상태 관리
const [name, setName] = useState('');

// 입력 변경 핸들러
const handleChange = (e) => {
  setName(e.target.value);
};

// 폼 제출 핸들러
const handleSubmit = (e) => {
  e.preventDefault();
  console.log('제출된 이름:', name);
};`}</pre>
      </div>

      <div className="info-box">
        <h3>학습 포인트</h3>
        <p>
          1. <strong>useState Hook:</strong> React에서 컴포넌트의 상태를 관리하는 기본 Hook입니다.
        </p>
        <p>
          2. <strong>양방향 바인딩:</strong> value와 onChange를 통해 입력 필드와 상태를 동기화합니다.
        </p>
        <p>
          3. <strong>이벤트 처리:</strong> React에서는 camelCase로 이벤트를 작성합니다 (onSubmit, onChange).
        </p>
        <p>
          4. <strong>preventDefault:</strong> 폼 제출 시 페이지 새로고침을 방지합니다.
        </p>
      </div>
    </div>
  );
}