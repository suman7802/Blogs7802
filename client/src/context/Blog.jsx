import axios from 'axios';
import url from '../config';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {createContext, useReducer, useEffect} from 'react';

const BlogContext = createContext();

const initialState = {
  skip: 0,
  blogPosts: [],
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_BLOG_POSTS':
      return {...state, blogPosts: action.payload, loading: false};
    case 'INCREMENT_SKIP':
      return {...state, skip: state.skip + 5};
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    default:
      throw new Error();
  }
}

function BlogProvider({children}) {
  const [{skip, blogPosts, loading}, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchBlogs = async () => {
    dispatch({type: 'SET_LOADING', payload: true});
    try {
      const response = await axios.get(`${url}/blogs?skip=${skip}`);
      dispatch({type: 'SET_BLOG_POSTS', payload: response.data});
      dispatch({type: 'INCREMENT_SKIP'});
    } catch (error) {
      console.error('Failed to fetch blogs', error);
      toast.error('Failed to fetch blogs');
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BlogContext.Provider value={{blogPosts, fetchBlogs, loading}}>
      {children}
    </BlogContext.Provider>
  );
}

BlogProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {BlogProvider, BlogContext};
