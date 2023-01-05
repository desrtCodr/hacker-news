import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { formatDate } from '../pages/api/helpers';
import ThemeContext from '../contexts/ThemeContext';

export default function PostMetaInfo({ by, time, id, descendants }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <div className={`meta-info-${theme}`}>
      <span>
        by <Link href={`/user?id=${by}`}>{by}</Link>
      </span>
      <span>on {formatDate(time)}</span>
      {typeof descendants === 'number' && (
        <span>
          with <Link href={`/post?id=${id}`}>{descendants}</Link>{' '}
          comments
        </span>
      )}
    </div>
  );
}

PostMetaInfo.propTypes = {
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  descendants: PropTypes.number,
};
