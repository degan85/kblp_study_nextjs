import { useState } from 'react';

// 커스텀 훅 - useForm
export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // 입력 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // 입력하면 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // 필드 블러(포커스 아웃) 핸들러
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  // 폼 리셋
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  // 특정 필드 값 설정
  const setFieldValue = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 특정 필드 에러 설정
  const setFieldError = (name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  // 전체 값 설정
  const setAllValues = (newValues) => {
    setValues(newValues);
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    resetForm,
    setFieldValue,
    setFieldError,
    setAllValues,
    setErrors
  };
}