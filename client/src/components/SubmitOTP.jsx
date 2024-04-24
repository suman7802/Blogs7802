import {useContext} from 'react';
import {AuthContext} from '../context/Auth';
import authAnimation from '../assets/auth.svg';

export default function SubmitOTP() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('useHome must be used within a AuthProvider');

  const {form, loading, handleChange, submitOTP} = context;

  return (
    <div className="p-5 flex flex-col gap-5 lg:flex-row lg:h-[90vh] lg:items-center justify-around">
      <img src={authAnimation} alt="contact" className="lg:w-[50%]" />

      <div className={`flex flex-col gap-2 lg:w-[35%]`}>
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
          disabled={loading}
          onClick={submitOTP}
          className={`px-5 py-2 bg-red-500 rounded-xl text-white hover:bg-red-600`}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </div>
    </div>
  );
}
