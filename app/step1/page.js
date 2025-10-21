'use client';

import { useState } from 'react';

export default function Step1Page() {
  /* 📝 TODO 1: useState를 사용한 상태 관리
   * - name: 입력 필드의 현재 값
   * - submittedName: 제출된 이름 저장
   *
   * 힌트:
   * const [상태명, set상태명] = useState(초기값);
   */

  // 여기에 useState 코드 작성
  const [name, setName] = useState('');


  /* 📝 TODO 2: 폼 제출 핸들러
   * 1. e.preventDefault()로 기본 동작 방지
   * 2. submittedName 상태 업데이트
   * 3. console.log로 제출된 이름 출력
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name);
  };

  /* 📝 TODO 3: 입력 변경 핸들러
   * - e.target.value를 사용하여 name 상태 업데이트
   */
  const handleChange = (e) => {
    // 여기에 코드 작성
    setName(e.target.value);
  };

  /* 📝 TODO 4: 초기화 핸들러
   * - name과 submittedName을 빈 문자열로 초기화
   */
  const handleReset = () => {
    setName('');
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

      {/* 📝 TODO 5: form의 onSubmit 속성 연결
          힌트: onSubmit={handleSubmit} */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label mt-10">
            이름을 입력하세요:
          </label>
          {/* 📝 TODO 6: input의 value와 onChange 속성 연결
           * 힌트: value={name} onChange={handleChange}
           */}
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="form-input"
            placeholder="예: 홍길동"
          />
        </div>

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            제출
          </button>
          {/* 📝 TODO 7: 초기화 버튼의 onClick 속성 연결
              힌트: onClick={handleReset} */}
          <button type="button" className="btn btn-secondary" onClick={handleReset}>
            초기화
          </button>
        </div>
      </form>

      {/* 실시간 입력 값 표시 */}
      <div className="data-display">
        <h3 className="data-title">현재 입력 값:</h3>
        <div className="data-content">
          {/* 📝 TODO 8: name 상태 표시 - 값이 없으면 '(입력 대기중...)' 표시
              힌트: {name || '(입력 대기중...)'} */}
          {name || '(입력 대기중...)'}
        </div>
      </div>

      {/* 📝 TODO 9: submittedName이 있을 때만 표시 (조건부 렌더링)
          힌트: {submittedName && (<div>...</div>)} 형태로 작성 */}

      {/* 제출 성공 메시지는 여기에 추가하세요 */}

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