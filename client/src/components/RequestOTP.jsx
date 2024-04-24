import {useContext} from 'react';
import {AuthContext} from '../context/auth';

export default function RequestOTP() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('useHome must be used within a AuthProvider');

  const {form, loading, handleChange, requestOTP} = context;

  return (
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

      <button
        onClick={requestOTP}
        disabled={loading}
        className={`px-5 py-2 bg-red-500 rounded-xl text-white hover:bg-red-600`}>
        {loading ? 'Sending OTP...' : 'Send OTP'}
      </button>
    </div>
  );
}
