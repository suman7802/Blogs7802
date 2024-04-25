import {useState, useContext} from 'react';
import {BlogContext} from '../context/Blog';

export default function CreateBlog() {
  const context = useContext(BlogContext);

  if (!context) throw new Error('useUser must be used within a BlogProvider');

  const {loading, addBlog} = context;

  const [title, setTitle] = useState('');
  const [picture, setPicture] = useState(null);
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.preventDefault();

    const data = new FormData();
    data.append('title', title);
    data.append('picture', picture);
    data.append('content', content);
    data.append('private', visibility);

    addBlog(data);
  };
  return (
    <>
      <div className="flex flex-col w-screen items-center px-3 py-10">
        <div className="w-full lg:w-2/3 mt-8 bg-gray-200 border border-gray-300 rounded-md shadow-lg">
          {loading ? (
            <span className="text-2xl font-semibold text-red-500 px-5">
              Adding...
            </span>
          ) : (
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit}
              className="m-10 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="bg-transparent border border-gray-400 rounded-md px-2 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Content"
                className="bg-transparent border border-gray-400 rounded-md px-2 outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <input
                type="file"
                className="bg-transparent rounded-md px-1 outline-none"
                name="picture"
                id="picture"
                accept="image/*"
                capture="camera"
                onChange={(e) => setPicture(e.target.files[0])}
              />

              <label className="w-fit">
                <input
                  type="checkbox"
                  checked={visibility}
                  onChange={(e) => setVisibility(e.target.checked)}
                />
                <span className="px-2">private</span>
              </label>

              <button
                type="submit"
                className="bg-red-500 rounded-md text-white py-1 hover:bg-red-600">
                Add
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
