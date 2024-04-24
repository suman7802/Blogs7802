import RequestOTP from '../components/RequestOTP';
import SubmitOTP from '../components/SubmitOTP';

import {Routes, Route} from 'react-router-dom';
import {AuthProvider} from '../context/Auth';

export default function Auth() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<RequestOTP />} />
          <Route path="/otp" element={<SubmitOTP />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
