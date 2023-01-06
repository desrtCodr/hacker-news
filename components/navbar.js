import React from 'react';
import Link from 'next/link';
import ThemeContext from '../contexts/ThemeContext';
import { useRouter } from 'next/router';

export default function Nav() {
  const router = useRouter();
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <Link
            href='/'
            className={
              router.pathname === '/' ? 'nav-link active' : 'nav-link'
            }
          >
            Top
          </Link>
        </li>
        <li>
          <Link
            href='/new'
            className={
              router.pathname === '/new'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            New
          </Link>
        </li>
      </ul>
      <button
        style={{ fontSize: 30 }}
        className='btn-clear'
        onClick={toggleTheme}
      >
        {theme === 'light' ? '🔦' : '💡'}
      </button>
    </nav>
  );
}
