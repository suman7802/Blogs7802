import {Routes, Route} from 'react-router-dom';
import {ProfileProvider} from '../context/profile';
import UserProfile from '../components/UserProfile';
import {useParams} from 'react-router-dom';

export default function Profile() {
  const {id} = useParams();

  return (
    <>
      <ProfileProvider id={id}>
        <Routes>
          <Route path="/*" element={<UserProfile />} />
        </Routes>
      </ProfileProvider>
    </>
  );
}
