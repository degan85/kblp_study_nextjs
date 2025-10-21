'use client';

import { useState } from 'react';

export default function Step2Page() {
  // 객체를 사용한 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    hobby: [],
    message: '',
    agree: false
  });

  const [submittedData, setSubmittedData] = useState(null);

  // 통합 입력 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'agree') {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      } else {
        // hobby 체크박스 처리
        setFormData(prev => ({
          ...prev,
          hobby: checked
            ? [...prev.hobby, value]
            : prev.hobby.filter(h => h !== value)
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    console.log('제출된 데이터:', formData);
  };

  // 폼 초기화 핸들러
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      gender: '',
      hobby: [],
      message: '',
      agree: false
    });
    setSubmittedData(null);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Step 2: 여러 입력 필드를 가진 폼</h1>

      <div className="info-box">
        <h3>학습 목표</h3>
        <ul className="lesson-list">
          <li>객체를 사용한 복잡한 상태 관리</li>
          <li>다양한 입력 타입 처리 (text, email, number, radio, checkbox, select, textarea)</li>
          <li>통합 변경 핸들러 구현</li>
          <li>스프레드 연산자를 사용한 상태 업데이트</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 텍스트 입력 */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            이름: *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="홍길동"
          />
        </div>

        {/* 이메일 입력 */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            이메일: *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="example@email.com"
          />
        </div>

        {/* 숫자 입력 */}
        <div className="form-group">
          <label htmlFor="age" className="form-label">
            나이:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            className="form-input"
            value={formData.age}
            onChange={handleInputChange}
            min="1"
            max="120"
            placeholder="20"
          />
        </div>

        {/* 라디오 버튼 */}
        <div className="form-group">
          <label className="form-label">성별:</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="gender"
                value="male"
                className="form-radio"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
              />
              남성
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="gender"
                value="female"
                className="form-radio"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              여성
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="other"
                className="form-radio"
                checked={formData.gender === 'other'}
                onChange={handleInputChange}
              />
              기타
            </label>
          </div>
        </div>

        {/* 체크박스 (다중 선택) */}
        <div className="form-group">
          <label className="form-label">취미:</label>
          <div>
            {['독서', '운동', '영화', '게임', '요리'].map(hobbyOption => (
              <label key={hobbyOption} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="hobby"
                  value={hobbyOption}
                  className="form-checkbox"
                  checked={formData.hobby.includes(hobbyOption)}
                  onChange={handleInputChange}
                />
                {hobbyOption}
              </label>
            ))}
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            메시지:
          </label>
          <textarea
            id="message"
            name="message"
            className="form-textarea"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            placeholder="자유롭게 작성해주세요..."
          />
        </div>

        {/* 동의 체크박스 */}
        <div className="form-group">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="agree"
              className="form-checkbox"
              checked={formData.agree}
              onChange={handleInputChange}
            />
            개인정보 수집 및 이용에 동의합니다
          </label>
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

      {/* 실시간 상태 표시 */}
      <div className="data-display">
        <h3 className="data-title">현재 폼 데이터:</h3>
        <div className="data-content">
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>

      {/* 제출된 데이터 표시 */}
      {submittedData && (
        <div className="success-message">
          <h3>제출 완료!</h3>
          <div className="data-content mt-2">
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* 코드 예시 */}
      <div className="code-block">
        <h3>핵심 코드:</h3>
        <pre>{`// 객체를 사용한 상태 관리
const [formData, setFormData] = useState({
  name: '',
  email: '',
  hobby: [],
  agree: false
});

// 통합 입력 변경 핸들러
const handleInputChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === 'checkbox') {
    // 체크박스 처리 로직
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};`}</pre>
      </div>

      <div className="info-box">
        <h3>학습 포인트</h3>
        <p>
          1. <strong>객체 상태 관리:</strong> 여러 입력 필드를 하나의 객체로 관리하면 코드가 간결해집니다.
        </p>
        <p>
          2. <strong>Computed Property Names:</strong> [name]: value 문법으로 동적 키를 설정할 수 있습니다.
        </p>
        <p>
          3. <strong>스프레드 연산자:</strong> ...prev를 사용해 기존 상태를 유지하며 업데이트합니다.
        </p>
        <p>
          4. <strong>조건부 처리:</strong> 입력 타입에 따라 다른 로직을 적용할 수 있습니다.
        </p>
      </div>
    </div>
  );
}