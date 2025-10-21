'use client';

import { useState } from 'react';
import { useForm } from '../../hooks/useForm';

export default function Step3Page() {
  const [submittedData, setSubmittedData] = useState(null);

  // 커스텀 훅 사용
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
    setFieldError,
    setErrors
  } = useForm({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    bio: '',
    newsletter: false
  });

  // 간단한 유효성 검사
  const validateForm = () => {
    const newErrors = {};

    // 사용자명 검사
    if (!values.username) {
      newErrors.username = '사용자명은 필수입니다';
    } else if (values.username.length < 3) {
      newErrors.username = '사용자명은 최소 3자 이상이어야 합니다';
    }

    // 이메일 검사
    if (!values.email) {
      newErrors.email = '이메일은 필수입니다';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }

    // 비밀번호 검사
    if (!values.password) {
      newErrors.password = '비밀번호는 필수입니다';
    } else if (values.password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다';
    }

    // 비밀번호 확인 검사
    if (!values.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인은 필수입니다';
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }

    // 전화번호 검사 (선택사항)
    if (values.phone && !/^\d{3}-\d{4}-\d{4}$/.test(values.phone)) {
      newErrors.phone = '전화번호 형식: 010-1234-5678';
    }

    return newErrors;
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // 에러가 없으면 제출
      setSubmittedData(values);
      console.log('폼 제출:', values);

      // 선택: 제출 후 폼 초기화
      // resetForm();
    } else {
      // 에러가 있으면 에러 표시
      setErrors(validationErrors);
    }
  };

  // 전화번호 포맷터
  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/[^\d]/g, '');
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // 전화번호 입력 핸들러
  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setFieldValue('phone', formatted);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Step 3: 커스텀 훅을 사용한 폼</h1>

      <div className="info-box">
        <h3>학습 목표</h3>
        <ul className="lesson-list">
          <li>커스텀 훅(useForm) 생성 및 활용</li>
          <li>폼 로직의 재사용 가능한 분리</li>
          <li>touched 상태를 활용한 에러 표시 최적화</li>
          <li>필드별 유효성 검사 구현</li>
          <li>포맷터 함수 활용 (전화번호 등)</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 사용자명 */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            사용자명: *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="user123"
          />
          {touched.username && errors.username && (
            <p className="form-error">{errors.username}</p>
          )}
        </div>

        {/* 이메일 */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            이메일: *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="user@example.com"
          />
          {touched.email && errors.email && (
            <p className="form-error">{errors.email}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            비밀번호: *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="최소 6자 이상"
          />
          {touched.password && errors.password && (
            <p className="form-error">{errors.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            비밀번호 확인: *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="비밀번호 재입력"
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword}</p>
          )}
        </div>

        {/* 전화번호 (포맷터 적용) */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            전화번호:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={values.phone}
            onChange={handlePhoneChange}
            onBlur={handleBlur}
            placeholder="010-1234-5678"
            maxLength="13"
          />
          {touched.phone && errors.phone && (
            <p className="form-error">{errors.phone}</p>
          )}
        </div>

        {/* 생년월일 */}
        <div className="form-group">
          <label htmlFor="birthDate" className="form-label">
            생년월일:
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            className="form-input"
            value={values.birthDate}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {/* 자기소개 */}
        <div className="form-group">
          <label htmlFor="bio" className="form-label">
            자기소개:
          </label>
          <textarea
            id="bio"
            name="bio"
            className="form-textarea"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="3"
            placeholder="간단한 자기소개를 작성해주세요"
          />
        </div>

        {/* 뉴스레터 구독 */}
        <div className="form-group">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="newsletter"
              className="form-checkbox"
              checked={values.newsletter}
              onChange={handleChange}
            />
            뉴스레터를 구독하겠습니다
          </label>
        </div>

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            회원가입
          </button>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setSubmittedData(null);
            }}
            className="btn btn-secondary"
          >
            초기화
          </button>
        </div>
      </form>

      {/* 현재 폼 상태 */}
      <div className="data-display">
        <h3 className="data-title">폼 상태:</h3>
        <div className="data-content">
          <div className="mb-2">
            <strong>Values:</strong>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </div>
          <div className="mb-2">
            <strong>Errors:</strong>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </div>
          <div>
            <strong>Touched:</strong>
            <pre>{JSON.stringify(touched, null, 2)}</pre>
          </div>
        </div>
      </div>

      {/* 제출 성공 메시지 */}
      {submittedData && (
        <div className="success-message">
          <h3>회원가입 완료!</h3>
          <p>환영합니다, {submittedData.username}님!</p>
          <div className="data-content mt-2">
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* 코드 예시 */}
      <div className="code-block">
        <h3>커스텀 훅 사용 예시:</h3>
        <pre>{`// hooks/useForm.js
export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // ... 핸들러 함수들

  return {
    values, errors, touched,
    handleChange, handleBlur,
    resetForm, setFieldValue
  };
}

// 컴포넌트에서 사용
const form = useForm({
  username: '',
  email: ''
});

<input
  name="username"
  value={form.values.username}
  onChange={form.handleChange}
  onBlur={form.handleBlur}
/>`}</pre>
      </div>

      <div className="info-box">
        <h3>학습 포인트</h3>
        <p>
          1. <strong>커스텀 훅의 장점:</strong> 폼 로직을 재사용 가능한 단위로 분리할 수 있습니다.
        </p>
        <p>
          2. <strong>Touched 상태:</strong> 사용자가 필드를 터치(포커스 후 블러)한 후에만 에러를 표시합니다.
        </p>
        <p>
          3. <strong>유효성 검사 분리:</strong> validateForm 함수로 유효성 검사 로직을 독립적으로 관리합니다.
        </p>
        <p>
          4. <strong>포맷터 함수:</strong> 입력 값을 자동으로 포맷팅하여 사용자 경험을 향상시킵니다.
        </p>
      </div>
    </div>
  );
}