import React from 'react';
import Link from 'next/link';
import ThemeContext from '../contexts/ThemeContext';

const activeStyle = {
  color: 'rgb(187, 46, 31)',
};

export default function Nav() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <nav className='row space-between'>
      <ul className='row nav'>
        <li>
          <Link
            href='/'
            activeStyle={activeStyle}
            className='nav-link'
          >
            Top
          </Link>
        </li>
        <li>
          <Link
            href='/new'
            activeStyle={activeStyle}
            className='nav-link'
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
