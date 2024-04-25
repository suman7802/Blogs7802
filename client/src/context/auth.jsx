import axios from 'axios';
import url from '../config';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import {createContext, useReducer} from 'react';

const AuthContext = createContext();

const initialState = {
  loading: false,
  form: {email: '', OTP: ''},
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_FORM':
      return {...state, form: {...state.form, ...action.payload}};
    default:
      throw new Error();
  }
}

function AuthProvider({children}) {
  const navigate = useNavigate();

  const [{form, loading}, dispatch] = useReducer(reducer, initialState);

  const handleChange = ({target: {name, value}}) => {
    dispatch({type: 'SET_FORM', payload: {[name]: value}});
  };

  const requestOTP = async (e) => {
    e.preventDefault();
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await axios.post(`${url}/auth/req-otp`, form);
      if (response.status === 200) {
        navigate('/auth/otp');
        toast.success('OTP sent');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to send OTP');
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  const submitOTP = async (e) => {
    e.preventDefault();
    dispatch({type: 'SET_LOADING', payload: true});

    try {
      const response = await axios.post(`${url}/auth/login`, form, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate('/user');
        toast.success('Logged in successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to log in');
    } finally {
      dispatch({type: 'SET_LOADING', payload: false});
    }
  };

  return (
    <AuthContext.Provider
      value={{form, loading, handleChange, requestOTP, submitOTP}}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {AuthProvider, AuthContext};
