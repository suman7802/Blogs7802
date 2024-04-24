import {useContext} from 'react';
import CardPrivate from './CardAuthor';
import {AuthorContext} from '../context/Author';

export default function Author() {
  const context = useContext(AuthorContext);

  if (context === undefined)
    throw new Error('useHome must be used within a ProfileProvider');

  const {name, profile, totalBlogs, Blogs} = context;

  return (
    <div className="profile flex flex-col w-screen items-center py-10 gap-10">
      <div className="profile flex flex-col items-center gap-4">
        <img
          src={profile}
          alt="profile"
          className="w-64 h-64 object-cover rounded-full"
        />
        <div className="info flex flex-col items-center">
          <span className="name text-3xl font-semibold text-gray-500">
            {name}
          </span>
          <span className="text-xl text-gray-500">
            {totalBlogs} {totalBlogs > 1 ? 'Blogs' : 'Blog'}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-wrap md:flex-row items-center justify-center gap-5 ]">
        {Blogs.map((blog, index) => (
          <CardPrivate
            key={index}
            title={blog.title}
            content={blog.content}
            picture={blog.picture}
            visibility={blog.private}
            createdAt={blog.createdAt}
            updatedAt={blog.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
