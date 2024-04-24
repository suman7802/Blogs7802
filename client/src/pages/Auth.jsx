import RequestOTP from '../components/RequestOTP';
import SubmitOTP from '../components/SubmitOTP';
import authAnimation from '../assets/auth.svg';
import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from '../context/auth';

export default function Auth() {
  return (
    <div className="p-5 flex flex-col gap-5 lg:flex-row lg:h-[90vh] lg:items-center justify-around">
      <img src={authAnimation} alt="contact" className="lg:w-[50%]" />
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<RequestOTP />} />
          <Route path="/otp" element={<SubmitOTP />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}
