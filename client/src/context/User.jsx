import axios from 'axios';
import url from '../config';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {createContext, useReducer, useEffect} from 'react';

const UserContext = createContext();

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

    case 'DELETE_BLOG':
      return {
        ...state,
        Blogs: state.Blogs.filter((blog) => blog._id !== action.payload),
        totalBlogs: state.totalBlogs - 1,
      };

    case 'UPDATE_BLOG':
      return {
        ...state,
        Blogs: state.Blogs.map((blog) => {
          if (blog._id === action.payload._id)
            return {...blog, ...action.payload};
          return blog;
        }),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function UserProvider({children}) {
  const [{name, profile, Blogs, loading, totalBlogs}, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchProfile = async () => {
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await axios.get(`${url}/profile`, {
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

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${url}/blog/${id}`, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });

      dispatch({type: 'DELETE_BLOG', payload: id});
    } catch (error) {
      console.error('Failed to delete blog', error);
      toast.error('Failed to delete blog');
    }
  };

  const updateBlog = async (id, data) => {
    try {
      const response = await axios.put(`${url}/blog/${id}`, data, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });

      dispatch({type: 'UPDATE_BLOG', payload: response.data});
    } catch (error) {
      console.error('Failed to update blog', error);
      toast.error('Failed to update blog');
    }
  }

  return (
    <UserContext.Provider value={{name, profile, Blogs, loading, totalBlogs}}>
      {children}
    </UserContext.Provider>
  );``
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {UserProvider, UserContext};
