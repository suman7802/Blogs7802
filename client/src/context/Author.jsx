import axios from 'axios';
import url from '../config';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {createContext, useReducer, useEffect} from 'react';

const AuthorContext = createContext();

const initialState = {
  name: null,
  profile: null,
  Blogs: [],
  totalBlogs: null,
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        name: action.payload.name,
        profile: action.payload.profile,
      };
    case 'SET_BLOGS':
      return {
        ...state,
        Blogs: action.payload.Blog,
        totalBlogs: action.payload.totalBlogs,
      };
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}
function AuthorProvider({children, id}) {
  const [{name, profile, Blogs, loading, totalBlogs}, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchProfile = async () => {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await axios.get(`${url}/profile/${id}`, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });

      dispatch({
        type: 'SET_USER',
        payload: {
          name: response.data.name,
          profile: response.data.profile,
        },
      });

      dispatch({
        type: 'SET_BLOGS',
        payload: {
          Blog: response.data.Blog,
          totalBlogs: response.data.totalBlogs,
        },
      });
    } catch (error) {
      console.error('Failed to fetch profile', error);
      toast.error('Failed to fetch profile');
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthorContext.Provider
      value={{name, profile, Blogs, loading, totalBlogs}}>
      {children}
    </AuthorContext.Provider>
  );
}

AuthorProvider.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};

export {AuthorProvider, AuthorContext};
