import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Blogs from '../components/Blogs';
import {BlogProvider} from '../context/Blog';

export default function Home() {
  return (
    <>
      <Hero />
      <BlogProvider>
        <Blogs />
      </BlogProvider>
      <Stats />
    </>
  );
}
