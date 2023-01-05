import React, { use } from 'react';
import { fetchUser, fetchPosts } from './api/api';
import Loading from '../components/Loading';
import { formatDate } from './api/helpers';
import PostsList from '../components/PostsList';
import { useRouter } from 'next/router';

const initalState = {
  user: null,
  loadingUser: true,
  posts: null,
  loadingPosts: true,
  error: null,
};
function useReducer(state, action) {
  if (action.type === 'user-success') {
    return {
      ...state,
      loadingUser: false,
      user: action.user,
      error: null,
    };
  } else if (action.type === 'user-post-success') {
    return {
      ...state,
      posts: action.posts,
      loadingPosts: false,
      error: null,
    };
  } else if (action.type === 'error') {
    return {
      error: action.message,
      loadingPosts: false,
      loadingUser: false,
    };
  }
}

export default function User() {
  const [state, dispatch] = React.useReducer(useReducer, initalState);
  const router = useRouter();
  const id = router.query.id;

  React.useEffect(() => {
    fetchUser(id)
      .then((user) => {
        dispatch({
          type: 'user-success',
          user,
        });
        return fetchPosts(user.submitted.slice(0, 30));
      })
      .then((posts) => {
        dispatch({
          type: 'user-post-success',
          posts,
        });
      })
      .catch(({ message }) => {
        dispatch({
          type: 'error',
          message,
        });
      });
  }, [id]);

  const { user, posts, loadingUser, loadingPosts, error } = state;

  if (error) {
    return <p className='center-text error'>{error}</p>;
  }

  return (
    <React.Fragment>
      {loadingUser === true ? (
        <Loading text='Fetching User' />
      ) : (
        <React.Fragment>
          <h1 className='header'>{user.id}</h1>
          <div className='meta-info-light'>
            <span>
              joined <b>{formatDate(user.created)}</b>
            </span>
            <span>
              has <b>{user.karma.toLocaleString()}</b> karma
            </span>
          </div>
          <p dangerouslySetInnerHTML={{ __html: user.about }} />
        </React.Fragment>
      )}
      {loadingPosts === true ? (
        loadingUser === false && <Loading text='Fetching posts' />
      ) : (
        <React.Fragment>
          <h2>Posts</h2>
          <PostsList posts={posts} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
