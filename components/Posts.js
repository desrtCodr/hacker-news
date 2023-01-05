import React from 'react';
import PropTypes from 'prop-types';
import { fetchMainPosts } from '../pages/api/api';
import Loading from './Loading';
import PostsList from './PostsList';

function postsReducer(state, action) {
  if (action.type === 'reset') {
    return {
      posts: null,
      error: null,
      loading: true,
    };
  } else if (action.type === 'success') {
    return {
      posts: action.posts,
      error: null,
      loading: false,
    };
  } else if (action.type === 'error') {
    return {
      error: action.message,
      loading: false,
    };
  } else {
    throw new Error('This action type is not supported.');
  }
}

export default function Posts({ type }) {
  const [state, dispatch] = React.useReducer(postsReducer, {
    posts: null,
    error: null,
    loading: true,
  });
  const handleFetch = () => dispatch({ type: 'reset' });

  React.useEffect(() => {
    handleFetch();

    fetchMainPosts(type)
      .then((posts) => {
        dispatch({
          type: 'success',
          posts,
        });
      })
      .catch(({ message }) => {
        dispatch({
          type: 'error',
          message,
        });
      });
  }, [type]);

  const { posts, error, loading } = state;

  if (loading === true) {
    return <Loading />;
  }
  if (error) {
    return <p className='center-text error'>{error.message}</p>;
  }
  return <PostsList posts={posts} />;
}

Posts.propTypes = {
  type: PropTypes.oneOf(['top', 'new']),
};
