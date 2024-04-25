import BlogCard from './Card';
import {useContext} from 'react';
import SimpleButton from './SimpleButtons';
import {BlogContext} from '../context/Blog';

export default function Blogs() {
  const context = useContext(BlogContext);

  if (context === undefined)
    throw new Error('useHome must be used within a BlogProvider');

  const {blogPosts, fetchBlogs, loading} = context;

  return (
    <>
      <div className="flex flex-col flex-wrap md:flex-row items-center justify-center gap-5">
        {(blogPosts || []).map((blog, index) => (
          <BlogCard
            id={blog?.user?.id}
            key={index}
            title={blog.title}
            content={blog.content}
            picture={blog.picture}
            visibility={blog.private}
            name={blog.user.name}
            profile={blog.user.profile}
            createdAt={blog.createdAt}
            updatedAt={blog.updatedAt}
          />
        ))}
      </div>
      <div className="lodeSection w-full flex items-center justify-center my-5">
        <SimpleButton
          onClick={fetchBlogs}
          text={'Lode More'}
          active={loading}
        />
      </div>
    </>
  );
}
