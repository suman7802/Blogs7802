import BlogCard from './Card';
import SimpleButton from './SimpleButtons';
import {useEffect, useState} from 'react';
import axios from 'axios';
import url from '../config';

export default function Blogs() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/blogs?skip=0`);
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col flex-wrap md:flex-row items-center justify-center gap-5">
        {blogPosts.map((blog, index) => (
          <BlogCard
            id={blog.id}
            key={index}
            title={blog.title}
            content={blog.content}
            picture={blog.picture}
            visibility={blog.private}
            name={blog.user.name}
            profile={blog.user.profile}
            createdAt={blog.createdAt}
            updatedAt={blog.updatedAt}
            email={blog.user.email}
          />
        ))}
      </div>
      <div className="lodeSection w-full flex items-center justify-center my-5">
        <SimpleButton text={'Lode More'} fev={false} />
      </div>
    </>
  );
}
