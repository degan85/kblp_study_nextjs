'use client';

import { useState } from 'react';

export default function Render2Page() {
  const [userRole, setUserRole] = useState('guest'); // 'admin', 'user', 'guest'

  /* 📝 TODO 1: 객체를 사용한 조건부 렌더링
   * 힌트: 각 역할에 대한 배지 정보를 객체로 정의
   * const badges = { admin: {...}, user: {...}, guest: {...} }
   */
  const getRoleBadge = () => {
    return (
      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
        역할 배지
      </span>
    );
  };

  /* 📝 TODO 2: switch 문을 사용한 조건부 렌더링
   * 힌트: userRole에 따라 다른 대시보드 반환
   */
  const renderDashboard = () => {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-muted-foreground">여기에 역할별 대시보드를 작성하세요</p>
      </div>
    );
  };

  return (
    <div className="main-content">
      <h1 className="form-title">Render 2: 복잡한 조건부 렌더링</h1>

      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">1️⃣ 객체를 사용한 조건부 렌더링</h2>

        <div className="bg-accent p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">현재 역할:</span>
            {getRoleBadge()}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setUserRole('admin')} className="btn btn-secondary">관리자로 전환</button>
          <button onClick={() => setUserRole('user')} className="btn btn-secondary">사용자로 전환</button>
          <button onClick={() => setUserRole('guest')} className="btn btn-secondary">게스트로 전환</button>
        </div>
      </div>

      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">2️⃣ switch 문 사용</h2>
        {renderDashboard()}
      </div>

      <div className="form-container bg-muted">
        <h2 className="text-xl font-bold mb-4">💡 핵심 코드</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">1. 객체를 사용한 조건부 렌더링</h3>
            <div className="code-block">
              <pre>{`const styles = {
  admin: 'bg-red-100 text-red-800',
  user: 'bg-blue-100 text-blue-800',
  guest: 'bg-gray-100 text-gray-800',
};

return <div className={styles[userRole]}>{userRole}</div>;`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">2. switch 문 사용</h3>
            <div className="code-block">
              <pre>{`const renderContent = () => {
  switch (status) {
    case 'approved':
      return <div>승인됨</div>;
    case 'rejected':
      return <div>거절됨</div>;
    default:
      return <div>대기 중</div>;
  }
};`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
