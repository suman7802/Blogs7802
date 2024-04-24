import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Listing from '../components/Listing';
import Blogs from '../components/Blogs';

export default function Home() {
  return (
    <>
      <Hero />
      <Listing />
      <Blogs />
      <Stats />
    </>
  );
}
