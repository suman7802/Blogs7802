import {Routes, Route} from 'react-router-dom';
import {AuthorProvider} from '../context/Author';
import Author from '../components/Author';
import {useParams} from 'react-router-dom';

export default function Authors() {
  const {id} = useParams();

  return (
    <>
      <AuthorProvider id={id}>
        <Routes>
          <Route path="/*" element={<Author />} />
        </Routes>
      </AuthorProvider>
    </>
  );
}
