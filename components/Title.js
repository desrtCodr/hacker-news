import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default function Title({ url, title, id }) {
  return url ? (
    <a className='link' href={url}>
      {title}
    </a>
  ) : (
    <Link className='link' href={`/post?id=${id}`}>
      {title}
    </Link>
  );
}

Title.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
