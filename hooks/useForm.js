import { useState } from 'react';

// 커스텀 훅 - useForm
export function useForm(initialValues) {
  /* 📝 TODO 1: 상태 선언
   * - values: 폼 값들
   * - errors: 에러 메시지들
   * - touched: 필드 터치 여부
   */
  // 여기에 useState 코드 작성
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});


  /* 📝 TODO 2: 입력 값 변경 핸들러
   * 1. e.target에서 name, value, type, checked 구조 분해
   * 2. checkbox면 checked, 아니면 value 사용
   * 3. 값이 변경되면 해당 필드 에러 초기화
   */
  const handleChange = (e) => {
    // 여기에 코드 작성
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // 에러 초기화
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  /* 📝 TODO 3: 필드 블러(포커스 아웃) 핸들러
   * - 해당 필드의 touched를 true로 설정
   */
  const handleBlur = (e) => {
    // 여기에 코드 작성
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  /* 📝 TODO 4: 폼 리셋
   * - 모든 상태를 초기값으로 리셋
   */
  const resetForm = () => {
    // 여기에 코드 작성
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  /* 📝 TODO 5: 특정 필드 값 설정
   * - name과 value를 받아서 해당 필드만 업데이트
   */
  const setFieldValue = (name, value) => {
    // 여기에 코드 작성
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /* 📝 TODO 6: 특정 필드 에러 설정 */
  const setFieldError = (name, error) => {
    // 여기에 코드 작성
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  /* 📝 TODO 7: 전체 값 설정 */
  const setAllValues = (newValues) => {
    // 여기에 코드 작성
    setValues(newValues);
  };

  // 반환할 객체
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

/* 💡 사용 예시:
const form = useForm({
  name: '',
  email: ''
});

<input
  name="name"
  value={form.values.name}
  onChange={form.handleChange}
  onBlur={form.handleBlur}
/>
*/