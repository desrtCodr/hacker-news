import React from 'react';
import '../styles/globals.css';
import ThemeContext from '../contexts/ThemeContext';
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme((theme) => {
      return theme === 'light' ? 'dark' : 'light';
    });
  };
  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );
  return (
    <ThemeContext.Provider value={value}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContext.Provider>
  );
}
