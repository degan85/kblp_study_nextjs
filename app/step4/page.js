'use client';

import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';

export default function Step4Page() {
  const [savedForms, setSavedForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 커스텀 훅 사용
  const form = useForm({
    title: '',
    name: '',
    email: '',
    department: '',
    subject: '',
    content: '',
    priority: 'medium'
  });

  // 저장된 데이터 불러오기
  const loadSavedForms = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/forms');
      if (response.ok) {
        const data = await response.json();
        setSavedForms(data);
      } else {
        setMessage('데이터를 불러오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('데이터 불러오기 오류:', error);
      setMessage('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 불러오기
  useEffect(() => {
    loadSavedForms();
  }, []);

  // 폼 데이터 저장 (파일로)
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.values)
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('데이터가 성공적으로 저장되었습니다!');

        // 저장 후 목록 새로고침
        await loadSavedForms();

        // 폼 초기화
        form.resetForm();

        // 메시지 3초 후 제거
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('저장 오류:', error);
      setMessage('저장 중 오류가 발생했습니다.');
    }
  };

  // 저장된 데이터 삭제
  const handleDelete = async (id) => {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch(`/api/forms?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setMessage('데이터가 삭제되었습니다.');
        await loadSavedForms();
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('삭제 오류:', error);
      setMessage('삭제 중 오류가 발생했습니다.');
    }
  };

  // 저장된 데이터 불러와서 폼에 채우기
  const handleLoad = (savedForm) => {
    const { id, createdAt, ...formData } = savedForm;
    form.setAllValues(formData);
    setMessage('데이터를 불러왔습니다.');
    setTimeout(() => setMessage(''), 3000);
  };

  // 날짜 포맷터
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Step 4: 파일 저장 및 불러오기</h1>

      <div className="info-box">
        <h3>학습 목표</h3>
        <ul className="lesson-list">
          <li>Next.js API Routes를 사용한 백엔드 구현</li>
          <li>파일 시스템을 사용한 데이터 저장</li>
          <li>fetch API를 사용한 HTTP 요청</li>
          <li>비동기 작업 처리 (async/await)</li>
          <li>로딩 상태 및 오류 처리</li>
        </ul>
      </div>

      {/* 알림 메시지 */}
      {message && (
        <div className={message.includes('오류') || message.includes('실패')
          ? 'error-message' : 'success-message'}>
          {message}
        </div>
      )}

      {/* 입력 폼 */}
      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            문서 제목: *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            value={form.values.title}
            onChange={form.handleChange}
            placeholder="예: 2024년 1월 회의록"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              작성자: *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              value={form.values.name}
              onChange={form.handleChange}
              placeholder="홍길동"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              이메일: *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={form.values.email}
              onChange={form.handleChange}
              placeholder="hong@example.com"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="department" className="form-label">
              부서:
            </label>
            <input
              type="text"
              id="department"
              name="department"
              className="form-input"
              value={form.values.department}
              onChange={form.handleChange}
              placeholder="개발팀"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority" className="form-label">
              우선순위:
            </label>
            <select
              id="priority"
              name="priority"
              className="form-select"
              value={form.values.priority}
              onChange={form.handleChange}
            >
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
              <option value="urgent">긴급</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            제목: *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="form-input"
            value={form.values.subject}
            onChange={form.handleChange}
            placeholder="문서 주제를 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" className="form-label">
            내용: *
          </label>
          <textarea
            id="content"
            name="content"
            className="form-textarea"
            value={form.values.content}
            onChange={form.handleChange}
            rows="5"
            placeholder="내용을 입력하세요..."
            required
          />
        </div>

        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            파일로 저장
          </button>
          <button type="button" onClick={form.resetForm} className="btn btn-secondary">
            폼 초기화
          </button>
          <button type="button" onClick={loadSavedForms} className="btn btn-secondary">
            목록 새로고침
          </button>
        </div>
      </form>

      {/* 저장된 데이터 목록 */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">저장된 문서 목록</h2>

        {isLoading ? (
          <div className="text-center py-4">데이터를 불러오는 중...</div>
        ) : savedForms.length === 0 ? (
          <div className="text-center py-8 bg-muted rounded-lg">
            저장된 문서가 없습니다.
          </div>
        ) : (
          <div className="space-y-4">
            {savedForms.map((savedForm) => (
              <div key={savedForm.id} className="border border-border rounded-lg p-4 bg-card">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{savedForm.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      작성자: {savedForm.name} ({savedForm.email})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      저장 시간: {formatDate(savedForm.createdAt)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${savedForm.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                      savedForm.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      savedForm.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'}`}>
                    {savedForm.priority === 'urgent' ? '긴급' :
                     savedForm.priority === 'high' ? '높음' :
                     savedForm.priority === 'medium' ? '보통' : '낮음'}
                  </span>
                </div>

                <p className="text-sm mb-2">
                  <strong>제목:</strong> {savedForm.subject}
                </p>

                <p className="text-sm mb-3">
                  <strong>내용:</strong> {savedForm.content.substring(0, 100)}
                  {savedForm.content.length > 100 && '...'}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleLoad(savedForm)}
                    className="btn btn-secondary text-sm"
                  >
                    불러오기
                  </button>
                  <button
                    onClick={() => handleDelete(savedForm.id)}
                    className="btn btn-danger text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 코드 예시 */}
      <div className="code-block mt-8">
        <h3>핵심 코드:</h3>
        <pre>{`// 데이터 저장
const handleSave = async () => {
  const response = await fetch('/api/forms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });

  if (response.ok) {
    // 성공 처리
  }
};

// 데이터 불러오기
const loadData = async () => {
  const response = await fetch('/api/forms');
  const data = await response.json();
  setForms(data);
};`}</pre>
      </div>

      <div className="info-box mt-6">
        <h3>학습 포인트</h3>
        <p>
          1. <strong>API Routes:</strong> Next.js의 API Routes를 사용하여 서버 사이드 로직을 구현합니다.
        </p>
        <p>
          2. <strong>파일 시스템:</strong> Node.js의 fs 모듈을 사용하여 JSON 파일로 데이터를 저장합니다.
        </p>
        <p>
          3. <strong>비동기 처리:</strong> async/await를 사용하여 비동기 작업을 동기적으로 처리합니다.
        </p>
        <p>
          4. <strong>상태 관리:</strong> 로딩 상태와 오류 처리를 통해 사용자 경험을 개선합니다.
        </p>
      </div>
    </div>
  );
}