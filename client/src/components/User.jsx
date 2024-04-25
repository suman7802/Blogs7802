import {useContext, useState} from 'react';
import CardUser from './CardUser';
import {UserContext} from '../context/User';
import UpdateBlogForm from './UpdateProfile';

export default function User() {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error('useHome must be used within a ProfileProvider');

  const {name, profile, totalBlogs, Blogs} = context;
  const [isEditing, setIsEditing] = useState(false);

  const togglePOPUP = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  return (
    <div className="relative">
      {isEditing && <UpdateBlogForm name={name} togglePOPUP={togglePOPUP} />}
      <div className="profile flex flex-col w-screen items-center py-10 gap-10">
        <div className="profile relative flex flex-col items-center gap-4">
          <img
            src={profile}
            alt="profile"
            className="w-64 h-64 object-cover rounded-full"
          />
          <span
            onClick={togglePOPUP}
            className="absolute hover:cursor-pointer text-sm text-white top-11 right-3 bg-blue-500 px-2 rounded-[5vh]">
            edit
          </span>
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
          {(Blogs || []).map((blog, index) => (
            <CardUser
              key={index}
              id={blog.id}
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
    </div>
  );
}
