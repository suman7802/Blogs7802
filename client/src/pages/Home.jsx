import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Blogs from '../components/Blogs';
import {BlogProvider} from '../context/Blog';
import Divider from '../components/Divider';
import {Routes, Route} from 'react-router-dom';
import CreateBlog from '../components/CreateBlog';

function Blog() {
  return (
    <>
      <Hero />
      <Divider />
      <Blogs />
      <Stats />
    </>
  );
}

export default function Home() {
  return (
    <>
      <BlogProvider>
        <Routes>
          <Route path="/*" element={<Blog />} />
          <Route path="/add" element={<CreateBlog />} />
        </Routes>
      </BlogProvider>
    </>
  );
}
