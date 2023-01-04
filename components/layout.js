import React from 'react';
import Navbar from './navbar';
import ThemeContext from '../contexts/ThemeContext';

export default function Layout({ children }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <div className={theme}>
      <div className='container'>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
