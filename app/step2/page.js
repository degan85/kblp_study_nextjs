'use client';

import { useState } from 'react';

export default function Step2Page() {
  /* 📝 TODO 1: 객체를 사용한 상태 관리
   * formData 객체에 다음 필드를 포함:
   * - name: ''
   * - email: ''
   * - age: ''
   * - gender: ''
   * - hobby: []  // 배열로 관리
   * - message: ''
   * - agree: false
   */
  const [formData, setFormData] = useState({
    // 여기에 초기 상태 객체 작성
  });

  const [submittedData, setSubmittedData] = useState(null);

  /* 📝 TODO 2: 통합 입력 변경 핸들러
   * 1. e.target에서 name, value, type, checked 구조 분해
   * 2. checkbox 타입 처리:
   *    - agree 체크박스: checked 값 사용
   *    - hobby 체크박스: 배열에 추가/제거
   * 3. 일반 input: value 사용
   *
   * 힌트: 스프레드 연산자 {...prev} 사용
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // TODO: type이 'checkbox'인 경우 처리
    // - name이 'agree'인 경우
    // - name이 'hobby'인 아닌 경우 (hobby 체크박스)

    // TODO: 일반 input 처리
  };

  /* 📝 TODO 3: 폼 제출 핸들러
   * 1. e.preventDefault()
   * 2. submittedData 상태 업데이트
   * 3. console.log로 제출 데이터 출력
   */
  const handleSubmit = (e) => {
    // 여기에 코드 작성
  };

  /* 📝 TODO 4: 폼 초기화 핸들러
   * - formData를 초기 상태로 리셋
   * - submittedData를 null로 설정
   */
  const handleReset = () => {
    // 여기에 코드 작성
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

      {/* 📝 TODO 5: form의 onSubmit 연결 */}
      <form>
        {/* 텍스트 입력 */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            이름: *
          </label>
          {/* 📝 TODO 6: input에 name, value, onChange 속성 추가 */}
          <input
            type="text"
            id="name"
            className="form-input"
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
            className="form-input"
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
            className="form-input"
            min="1"
            max="120"
            placeholder="20"
          />
        </div>

        {/* 라디오 버튼 */}
        <div className="form-group">
          <label className="form-label">성별:</label>
          <div>
            {/* 📝 TODO 7: radio 버튼의 name, value, checked, onChange 속성 추가
             * checked는 formData.gender === 'male' 형태로 비교
             */}
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio"
              />
              남성
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                className="form-radio"
              />
              여성
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
              />
              기타
            </label>
          </div>
        </div>

        {/* 체크박스 (다중 선택) */}
        <div className="form-group">
          <label className="form-label">취미:</label>
          <div>
            {/* 📝 TODO 8: hobby 체크박스 처리
             * checked는 formData.hobby.includes(hobbyOption) 사용
             */}
            {['독서', '운동', '영화', '게임', '요리'].map(hobbyOption => (
              <label key={hobbyOption} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  name="hobby"
                  className="form-checkbox"
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
            className="form-textarea"
            rows="4"
            placeholder="자유롭게 작성해주세요..."
          />
        </div>

        {/* 동의 체크박스 */}
        <div className="form-group">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
            />
            개인정보 수집 및 이용에 동의합니다
          </label>
        </div>

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            제출
          </button>
          <button type="button" className="btn btn-secondary">
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
      {/* 📝 TODO 9: submittedData가 있을 때만 표시 */}

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