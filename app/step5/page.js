'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod 스키마 정의
const formSchema = z.object({
  // 기본 정보
  username: z.string()
    .min(3, '사용자명은 최소 3자 이상이어야 합니다')
    .max(20, '사용자명은 최대 20자까지 가능합니다')
    .regex(/^[a-zA-Z0-9_]+$/, '사용자명은 영문, 숫자, 언더스코어만 사용 가능합니다'),

  email: z.string()
    .email('올바른 이메일 형식을 입력해주세요'),

  password: z.string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[A-Z]/, '비밀번호에 대문자가 하나 이상 포함되어야 합니다')
    .regex(/[a-z]/, '비밀번호에 소문자가 하나 이상 포함되어야 합니다')
    .regex(/[0-9]/, '비밀번호에 숫자가 하나 이상 포함되어야 합니다')
    .regex(/[^A-Za-z0-9]/, '비밀번호에 특수문자가 하나 이상 포함되어야 합니다'),

  confirmPassword: z.string(),

  // 개인 정보
  age: z.string()
    .transform(val => val === '' ? undefined : Number(val))
    .pipe(
      z.number()
        .min(18, '18세 이상만 가입 가능합니다')
        .max(120, '올바른 나이를 입력해주세요')
        .optional()
    ),

  phone: z.string()
    .regex(/^010-\d{4}-\d{4}$/, '전화번호 형식: 010-0000-0000')
    .optional()
    .or(z.literal('')),

  website: z.string()
    .url('올바른 URL 형식을 입력해주세요 (예: https://example.com)')
    .optional()
    .or(z.literal('')),

  // 추가 정보
  bio: z.string()
    .max(500, '자기소개는 500자 이내로 작성해주세요')
    .optional(),

  terms: z.boolean()
    .refine(val => val === true, '이용약관에 동의해주세요'),

  marketing: z.boolean().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['confirmPassword']
});

export default function Step5Page() {
  const [submittedData, setSubmittedData] = useState(null);

  // react-hook-form 사용
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      phone: '',
      website: '',
      bio: '',
      terms: false,
      marketing: false
    },
    mode: 'onChange' // 실시간 유효성 검사
  });

  // 비밀번호 강도 체크
  const password = watch('password');
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, text: '' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengthMap = {
      0: { text: '', color: '' },
      1: { text: '매우 약함', color: 'text-red-600' },
      2: { text: '약함', color: 'text-orange-600' },
      3: { text: '보통', color: 'text-yellow-600' },
      4: { text: '강함', color: 'text-blue-600' },
      5: { text: '매우 강함', color: 'text-green-600' }
    };

    return { strength, ...strengthMap[strength] };
  };

  // 폼 제출 핸들러
  const onSubmit = async (data) => {
    // 서버 전송 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('폼 데이터:', data);
    setSubmittedData(data);

    // 실제 프로젝트에서는 여기서 API 호출
  };

  // 폼 리셋
  const handleReset = () => {
    reset();
    setSubmittedData(null);
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="form-container max-w-2xl mx-auto">
      <h1 className="form-title">Step 5: 고급 Validation 폼</h1>

      <div className="info-box">
        <h3>학습 목표</h3>
        <ul className="lesson-list">
          <li>react-hook-form을 사용한 고급 폼 관리</li>
          <li>Zod를 사용한 스키마 기반 유효성 검사</li>
          <li>실시간 유효성 검사 및 오류 표시</li>
          <li>비밀번호 강도 체크 구현</li>
          <li>조건부 유효성 검사 (비밀번호 확인)</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* 기본 정보 섹션 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">기본 정보</h3>

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              사용자명: *
            </label>
            <input
              id="username"
              type="text"
              className={`form-input ${errors.username ? 'border-destructive' : ''}`}
              placeholder="user123"
              {...register('username')}
            />
            {errors.username && (
              <p className="form-error">{errors.username.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              이메일: *
            </label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'border-destructive' : ''}`}
              placeholder="user@example.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              비밀번호: *
            </label>
            <input
              id="password"
              type="password"
              className={`form-input ${errors.password ? 'border-destructive' : ''}`}
              placeholder="최소 8자, 대소문자, 숫자, 특수문자 포함"
              {...register('password')}
            />
            {password && (
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-2 w-8 rounded ${
                          i <= passwordStrength.strength
                            ? passwordStrength.strength <= 2
                              ? 'bg-red-500'
                              : passwordStrength.strength === 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm font-medium ${passwordStrength.color}`}>
                    {passwordStrength.text}
                  </span>
                </div>
              </div>
            )}
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              비밀번호 확인: *
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`form-input ${errors.confirmPassword ? 'border-destructive' : ''}`}
              placeholder="비밀번호를 다시 입력하세요"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="form-error">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        {/* 개인 정보 섹션 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">개인 정보</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="age" className="form-label">
                나이:
              </label>
              <input
                id="age"
                type="number"
                className={`form-input ${errors.age ? 'border-destructive' : ''}`}
                placeholder="18"
                {...register('age')}
              />
              {errors.age && (
                <p className="form-error">{errors.age.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                전화번호:
              </label>
              <input
                id="phone"
                type="tel"
                className={`form-input ${errors.phone ? 'border-destructive' : ''}`}
                placeholder="010-0000-0000"
                {...register('phone')}
              />
              {errors.phone && (
                <p className="form-error">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="website" className="form-label">
              웹사이트:
            </label>
            <input
              id="website"
              type="url"
              className={`form-input ${errors.website ? 'border-destructive' : ''}`}
              placeholder="https://example.com"
              {...register('website')}
            />
            {errors.website && (
              <p className="form-error">{errors.website.message}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="bio" className="form-label">
              자기소개:
            </label>
            <textarea
              id="bio"
              className={`form-textarea ${errors.bio ? 'border-destructive' : ''}`}
              rows="4"
              placeholder="간단한 자기소개를 작성해주세요 (최대 500자)"
              {...register('bio')}
            />
            {errors.bio && (
              <p className="form-error">{errors.bio.message}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">
              {watch('bio')?.length || 0} / 500자
            </p>
          </div>
        </div>

        {/* 약관 동의 섹션 */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">약관 동의</h3>

          <div className="form-group">
            <label className="flex items-start">
              <input
                type="checkbox"
                className={`form-checkbox mt-1 ${errors.terms ? 'border-destructive' : ''}`}
                {...register('terms')}
              />
              <span className="ml-2 text-sm">
                <span className="font-medium">[필수]</span> 이용약관 및 개인정보 처리방침에 동의합니다
              </span>
            </label>
            {errors.terms && (
              <p className="form-error ml-6">{errors.terms.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="flex items-start">
              <input
                type="checkbox"
                className="form-checkbox mt-1"
                {...register('marketing')}
              />
              <span className="ml-2 text-sm">
                <span className="text-muted-foreground">[선택]</span> 마케팅 정보 수신에 동의합니다
              </span>
            </label>
          </div>
        </div>

        <div className="btn-group">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary disabled:opacity-50"
          >
            {isSubmitting ? '제출 중...' : '회원가입'}
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            초기화
          </button>
        </div>
      </form>

      {/* 제출 결과 */}
      {submittedData && (
        <div className="success-message mt-6">
          <h3 className="font-bold mb-2">회원가입 완료!</h3>
          <p>환영합니다, {submittedData.username}님!</p>
          <div className="data-content mt-3">
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        </div>
      )}

      {/* 코드 예시 */}
      <div className="code-block mt-8">
        <h3>react-hook-form + Zod 사용 예시:</h3>
        <pre>{`// Zod 스키마 정의
const formSchema = z.object({
  username: z.string()
    .min(3, '최소 3자 이상')
    .max(20, '최대 20자까지'),

  email: z.string()
    .email('올바른 이메일 형식'),

  password: z.string()
    .min(8, '최소 8자 이상')
    .regex(/[A-Z]/, '대문자 포함')
});

// react-hook-form 설정
const { register, handleSubmit, formState: { errors } }
  = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange'
  });`}</pre>
      </div>

      <div className="info-box mt-6">
        <h3>학습 포인트</h3>
        <p>
          1. <strong>스키마 기반 검증:</strong> Zod를 사용하여 타입 안전한 유효성 검사를 구현합니다.
        </p>
        <p>
          2. <strong>react-hook-form:</strong> 성능 최적화된 폼 관리 라이브러리로 불필요한 리렌더링을 방지합니다.
        </p>
        <p>
          3. <strong>실시간 검증:</strong> mode: 'onChange'로 입력과 동시에 유효성을 검사합니다.
        </p>
        <p>
          4. <strong>커스텀 검증:</strong> refine 메서드로 복잡한 비즈니스 로직을 구현할 수 있습니다.
        </p>
      </div>
    </div>
  );
}