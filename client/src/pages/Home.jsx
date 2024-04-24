import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Blogs from '../components/Blogs';
import {BlogProvider} from '../context/Blog';
import Divider from '../components/Divider';

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <BlogProvider>
        <Blogs />
      </BlogProvider>
      <Stats />
    </>
  );
}
