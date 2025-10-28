'use client';

import { useState } from 'react';

export default function Render2Page() {
  const [userRole, setUserRole] = useState('guest'); // 'admin', 'user', 'guest'
  const [status, setStatus] = useState('pending'); // 'pending', 'approved', 'rejected', 'reviewing'
  const [notificationLevel, setNotificationLevel] = useState('info'); // 'info', 'warning', 'error', 'success'

  // 방법 1: 객체를 사용한 조건부 렌더링
  const getRoleBadge = () => {
    const badges = {
      admin: { text: '관리자', color: 'bg-red-100 text-red-800', icon: '👑' },
      user: { text: '사용자', color: 'bg-blue-100 text-blue-800', icon: '👤' },
      guest: { text: '게스트', color: 'bg-gray-100 text-gray-800', icon: '👻' },
    };

    const badge = badges[userRole] || badges.guest;

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badge.color}`}>
        {badge.icon} {badge.text}
      </span>
    );
  };

  // 방법 2: switch 문을 사용한 조건부 렌더링
  const renderDashboard = () => {
    switch (userRole) {
      case 'admin':
        return (
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-300 mb-4">
              👑 관리자 대시보드
            </h3>
            <ul className="space-y-2">
              <li className="text-sm">✅ 사용자 관리</li>
              <li className="text-sm">✅ 시스템 설정</li>
              <li className="text-sm">✅ 데이터 분석</li>
              <li className="text-sm">✅ 보안 설정</li>
            </ul>
          </div>
        );
      case 'user':
        return (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300 mb-4">
              👤 사용자 대시보드
            </h3>
            <ul className="space-y-2">
              <li className="text-sm">✅ 내 프로필</li>
              <li className="text-sm">✅ 설정</li>
              <li className="text-sm">✅ 활동 내역</li>
            </ul>
          </div>
        );
      case 'guest':
        return (
          <div className="bg-gray-50 dark:bg-gray-900/20 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-300 mb-4">
              👻 게스트 모드
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              제한된 기능만 이용 가능합니다. 로그인하여 더 많은 기능을 사용하세요.
            </p>
            <button className="btn btn-primary text-sm">
              로그인하기
            </button>
          </div>
        );
      default:
        return (
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-muted-foreground">알 수 없는 역할입니다.</p>
          </div>
        );
    }
  };

  // 방법 3: 다중 조건 처리
  const getStatusInfo = () => {
    if (status === 'approved') {
      return {
        text: '승인됨',
        color: 'bg-green-50 border-green-300 text-green-800',
        icon: '✅',
        message: '요청이 승인되었습니다!'
      };
    } else if (status === 'rejected') {
      return {
        text: '거절됨',
        color: 'bg-red-50 border-red-300 text-red-800',
        icon: '❌',
        message: '요청이 거절되었습니다.'
      };
    } else if (status === 'reviewing') {
      return {
        text: '검토 중',
        color: 'bg-yellow-50 border-yellow-300 text-yellow-800',
        icon: '👁️',
        message: '현재 검토 중입니다...'
      };
    } else {
      return {
        text: '대기 중',
        color: 'bg-gray-50 border-gray-300 text-gray-800',
        icon: '⏳',
        message: '승인 대기 중입니다.'
      };
    }
  };

  const statusInfo = getStatusInfo();

  // 방법 4: 알림 레벨에 따른 스타일링
  const getNotificationStyle = () => {
    const styles = {
      info: 'bg-blue-50 border-blue-300 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-300 text-yellow-800',
      error: 'bg-red-50 border-red-300 text-red-800',
      success: 'bg-green-50 border-green-300 text-green-800',
    };

    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '🚨',
      success: '✅',
    };

    return {
      style: styles[notificationLevel] || styles.info,
      icon: icons[notificationLevel] || icons.info,
    };
  };

  const notification = getNotificationStyle();

  return (
    <div className="main-content">
      <h1 className="form-title">Render 2: 복잡한 조건부 렌더링</h1>

      {/* 방법 1: 객체를 사용한 조건부 렌더링 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">1️⃣ 객체를 사용한 조건부 렌더링</h2>
        <p className="text-muted-foreground mb-4">
          여러 조건에 대한 스타일이나 텍스트를 객체로 정의하여 깔끔하게 관리할 수 있습니다.
        </p>

        <div className="bg-accent p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">현재 역할:</span>
            {getRoleBadge()}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setUserRole('admin')}
            className={`btn ${userRole === 'admin' ? 'btn-primary' : 'btn-secondary'}`}
          >
            관리자로 전환
          </button>
          <button
            onClick={() => setUserRole('user')}
            className={`btn ${userRole === 'user' ? 'btn-primary' : 'btn-secondary'}`}
          >
            사용자로 전환
          </button>
          <button
            onClick={() => setUserRole('guest')}
            className={`btn ${userRole === 'guest' ? 'btn-primary' : 'btn-secondary'}`}
          >
            게스트로 전환
          </button>
        </div>
      </div>

      {/* 방법 2: switch 문을 사용한 조건부 렌더링 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">2️⃣ switch 문 사용</h2>
        <p className="text-muted-foreground mb-4">
          여러 조건 중 하나를 선택해야 할 때 switch 문이 if/else 체인보다 가독성이 좋습니다.
        </p>

        {renderDashboard()}
      </div>

      {/* 방법 3: 다중 조건 처리 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">3️⃣ 다중 조건 처리</h2>
        <p className="text-muted-foreground mb-4">
          if/else if 체인을 사용하여 여러 조건을 순차적으로 확인할 수 있습니다.
        </p>

        <div className={`border-2 rounded-lg p-6 mb-4 ${statusInfo.color}`}>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{statusInfo.icon}</span>
            <span className="font-bold">{statusInfo.text}</span>
          </div>
          <p className="text-sm">{statusInfo.message}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setStatus('pending')}
            className="btn btn-secondary text-sm"
          >
            대기 중
          </button>
          <button
            onClick={() => setStatus('reviewing')}
            className="btn btn-secondary text-sm"
          >
            검토 중
          </button>
          <button
            onClick={() => setStatus('approved')}
            className="btn btn-secondary text-sm"
          >
            승인됨
          </button>
          <button
            onClick={() => setStatus('rejected')}
            className="btn btn-secondary text-sm"
          >
            거절됨
          </button>
        </div>
      </div>

      {/* 방법 4: 알림 레벨에 따른 스타일링 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">4️⃣ 조건부 스타일링</h2>
        <p className="text-muted-foreground mb-4">
          조건에 따라 다른 스타일을 적용하여 시각적 피드백을 제공합니다.
        </p>

        <div className={`border-2 rounded-lg p-4 mb-4 ${notification.style}`}>
          <div className="flex items-center">
            <span className="text-xl mr-3">{notification.icon}</span>
            <div>
              <p className="font-semibold">알림 메시지</p>
              <p className="text-sm">
                현재 알림 레벨: <strong>{notificationLevel}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <button
            onClick={() => setNotificationLevel('info')}
            className="btn btn-secondary text-sm"
          >
            ℹ️ Info
          </button>
          <button
            onClick={() => setNotificationLevel('warning')}
            className="btn btn-secondary text-sm"
          >
            ⚠️ Warning
          </button>
          <button
            onClick={() => setNotificationLevel('error')}
            className="btn btn-secondary text-sm"
          >
            🚨 Error
          </button>
          <button
            onClick={() => setNotificationLevel('success')}
            className="btn btn-secondary text-sm"
          >
            ✅ Success
          </button>
        </div>
      </div>

      {/* 실전 예제: 역할 기반 권한 시스템 */}
      <div className="form-container mb-6">
        <h2 className="text-xl font-bold mb-4">5️⃣ 실전 예제: 역할 기반 UI</h2>

        <div className="border border-border rounded-lg p-6 bg-accent">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">시스템 제어판</h3>
            {getRoleBadge()}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 항상 보이는 기능 */}
            <div className="bg-background p-4 rounded border border-border">
              <h4 className="font-semibold mb-2">📖 공개 정보</h4>
              <p className="text-sm text-muted-foreground">
                모든 사용자가 볼 수 있습니다
              </p>
            </div>

            {/* 사용자와 관리자만 볼 수 있는 기능 */}
            {(userRole === 'user' || userRole === 'admin') && (
              <div className="bg-background p-4 rounded border border-blue-300">
                <h4 className="font-semibold mb-2 text-blue-700">👤 사용자 전용</h4>
                <p className="text-sm text-muted-foreground">
                  로그인한 사용자만 볼 수 있습니다
                </p>
              </div>
            )}

            {/* 관리자만 볼 수 있는 기능 */}
            {userRole === 'admin' && (
              <>
                <div className="bg-background p-4 rounded border border-red-300">
                  <h4 className="font-semibold mb-2 text-red-700">👑 관리자 전용</h4>
                  <p className="text-sm text-muted-foreground">
                    관리자만 접근 가능합니다
                  </p>
                </div>

                <div className="bg-background p-4 rounded border border-red-300">
                  <h4 className="font-semibold mb-2 text-red-700">⚙️ 시스템 설정</h4>
                  <p className="text-sm text-muted-foreground">
                    중요한 설정을 변경할 수 있습니다
                  </p>
                </div>
              </>
            )}

            {/* 게스트에게만 보이는 메시지 */}
            {userRole === 'guest' && (
              <div className="col-span-full bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border border-yellow-300">
                <p className="text-sm text-yellow-800 dark:text-yellow-300">
                  ⚠️ 제한된 기능만 사용 가능합니다. 더 많은 기능을 사용하려면 로그인하세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 핵심 코드 설명 */}
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

return (
  <div className={styles[userRole]}>
    {userRole}
  </div>
);`}</pre>
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

          <div>
            <h3 className="font-semibold mb-2">3. 다중 조건 (if/else if)</h3>
            <div className="code-block">
              <pre>{`if (role === 'admin') {
  return <AdminPanel />;
} else if (role === 'user') {
  return <UserPanel />;
} else {
  return <GuestPanel />;
}`}</pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">4. 복합 조건 (여러 역할 확인)</h3>
            <div className="code-block">
              <pre>{`{(role === 'admin' || role === 'user') && (
  <div>로그인한 사용자만 볼 수 있음</div>
)}`}</pre>
            </div>
          </div>

          <div className="info-box">
            <h3>⚡ 실전 팁</h3>
            <ul className="lesson-list">
              <li><strong>객체 사용</strong>: 스타일이나 설정이 여러 조건에 따라 바뀔 때 유용</li>
              <li><strong>switch 문</strong>: 3개 이상의 조건을 체크할 때 if/else보다 깔끔</li>
              <li><strong>조기 반환</strong>: 함수 내에서 조건에 따라 빨리 반환하면 코드가 간결해짐</li>
              <li><strong>컴포넌트 분리</strong>: 조건부 로직이 복잡하면 별도 컴포넌트로 분리하는 것이 좋음</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
