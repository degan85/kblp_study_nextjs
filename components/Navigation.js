'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState({
    form: true,
    rendering: true
  });

  const toggleGroup = (groupName) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const navGroups = [
    {
      id: 'form',
      title: '📝 Form 수업',
      items: [
        { href: '/step1', label: 'Step 1: 기본 폼' },
        { href: '/step2', label: 'Step 2: 다중 입력 폼' },
        { href: '/step3', label: 'Step 3: 커스텀 훅' },
        { href: '/step4', label: 'Step 4: 파일 저장' },
        { href: '/step5', label: 'Step 5: Validation' },
      ]
    },
    {
      id: 'rendering',
      title: '🎨 렌더링',
      items: [
        { href: '/render1', label: 'Render 1: 기본 조건부' },
        { href: '/render2', label: 'Render 2: 복잡한 조건부' },
        { href: '/render3', label: 'Render 3: 기본 리스트' },
        { href: '/render4', label: 'Render 4: 동적 리스트' },
        { href: '/render5', label: 'Render 5: Todo App' },
      ]
    }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <h2 className="nav-title">React 학습</h2>

        {/* 홈 링크 */}
        <div className="nav-home">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            🏠 홈
          </Link>
        </div>

        {/* 그룹화된 메뉴 */}
        {navGroups.map((group) => (
          <div key={group.id} className="nav-group">
            <button
              className="nav-group-title"
              onClick={() => toggleGroup(group.id)}
            >
              {group.title}
              <span className={`nav-arrow ${openGroups[group.id] ? 'open' : ''}`}>
                ▼
              </span>
            </button>

            {openGroups[group.id] && (
              <ul className="nav-menu">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
