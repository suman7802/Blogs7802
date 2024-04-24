import axios from 'axios';
import url from '../config';
import {toast} from 'react-toastify';
import {useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function SubmitOTP() {
  const navigate = useNavigate();

  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({email: '', OTP: ''});

  const handleChange = ({target: {name, value}}) => {
    setForm({...form, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${url}/auth/login`, form, {
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });
      if (response.status === 200) {
        navigate('/dashboard');
        toast.success('Logged in successfully');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 lg:w-[35%]`}>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={handleChange}
        className={`px-5 py-2 text-gray-500 outline-none border border-red-500 rounded-xl`}
      />
      <input
        type="text"
        id="OTP"
        name="OTP"
        placeholder="OTP"
        required
        value={form.OTP}
        onChange={handleChange}
        className={`px-5 py-2 text-gray-500 outline-none border border-red-500 rounded-xl`}
      />

      <button
        type="submit"
        disabled={loading}
        className={`px-5 py-2 bg-red-500 rounded-xl text-white hover:bg-red-600`}>
        {loading ? 'Logging in...' : 'Log in'}
      </button>
    </form>
  );
}
