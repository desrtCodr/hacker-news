import React from 'react';
import { fetchItem, fetchComments } from './api/api';
import Loading from '../components/Loading';
import PostMetaInfo from '../components/PostMetaInfo';
import Title from '../components/Title';
import Comment from '../components/Comment';
import { useRouter } from 'next/router';

const initalState = {
  post: null,
  loadingPost: true,
  comments: null,
  loadingComments: true,
  error: null,
};

function postReducer(state, action) {
  if (action.type === 'post-success') {
    return {
      ...state,
      loadingPost: false,
      post: action.post,
    };
  } else if (action.type === 'comment-success') {
    return {
      ...state,
      loadingComments: false,
      comments: action.comments,
    };
  } else if (action.type === 'error') {
    return {
      ...state,
      loadingPost: false,
      loadingComments: false,
      error: action.message,
    };
  } else {
    throw new Error('This action type is not supported');
  }
}

export default function Post() {
  const [state, dispatch] = React.useReducer(
    postReducer,
    initalState
  );
  const router = useRouter();
  const id = router.query.id;

  React.useEffect(() => {
    fetchItem(id)
      .then((post) => {
        console.log(post);
        dispatch({
          type: 'post-success',
          post,
        });
        return fetchComments(post.kids || []);
      })
      .then((comments) => {
        dispatch({
          type: 'comment-success',
          comments,
        });
      })
      .catch(({ message }) => {
        dispatch({
          type: 'error',
          message,
        });
      });
  }, [id]);
  const { post, loadingPost, comments, loadingComments, error } =
    state;
  if (error) {
    return <p className='center-text error'>{error}</p>;
  }
  return (
    <React.Fragment>
      {loadingPost === true ? (
        <Loading text='Fetching post' />
      ) : (
        <React.Fragment>
          <h1 className='header'>
            <Title url={post.url} title={post.title} id={post.id} />
          </h1>
          <PostMetaInfo
            by={post.by}
            time={post.time}
            id={post.id}
            descendants={post.descendants}
          />
          <p dangerouslySetInnerHTML={{ __html: post.text }} />
        </React.Fragment>
      )}
      {loadingComments === true ? (
        loadingPost === false && <Loading text='Fetching comments' />
      ) : (
        <React.Fragment>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
