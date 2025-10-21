'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/step1', label: 'Step1: 기본 폼' },
    { href: '/step2', label: 'Step2: 다중 입력 폼' },
    { href: '/step3', label: 'Step3: 커스텀 훅' },
    { href: '/step4', label: 'Step4: 파일 저장' },
    { href: '/step5', label: 'Step5: Validation' },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <h2 className="nav-title">React 폼 수업</h2>
        <ul className="nav-menu">
          {navItems.map((item) => (
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
      </div>
    </nav>
  );
}