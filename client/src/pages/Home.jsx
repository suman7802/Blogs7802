import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Listing from '../components/Listing';
import Blogs from '../components/Blogs';
import {BlogProvider} from '../context/Blog';

export default function Home() {
  return (
    <>
      <Hero />
      <Listing />
      <BlogProvider>
        <Blogs />
      </BlogProvider>
      <Stats />
    </>
  );
}
