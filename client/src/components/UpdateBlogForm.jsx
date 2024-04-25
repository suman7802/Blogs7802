import {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {UserContext} from '../context/User';

export default function UpdateBlogForm({
  id,
  title,
  content,
  visibility,
  onUpdate,
  togglePOPUP,
}) {
  const context = useContext(UserContext);

  if (!context) throw new Error('useUser must be used within a UserProvider');

  const {loading} = context;

  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedPicture, setUpdatedPicture] = useState(null);
  const [updatedContent, setUpdatedContent] = useState(content);
  const [updatedVisibility, setUpdatedVisibility] = useState(visibility);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.preventDefault();

    const data = new FormData();
    data.append('title', updatedTitle);
    data.append('content', updatedContent);
    data.append('picture', updatedPicture);
    data.append('private', updatedVisibility);

    onUpdate(id, data);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-200 border border-gray-300 rounded-md shadow-lg">
      {loading ? (
        <span className="text-2xl font-semibold text-red-500 px-5">
          Updating...
        </span>
      ) : (
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="m-10 flex flex-col gap-4">
          <input
            type="text"
            className="bg-transparent border border-gray-400 rounded-md px-2 outline-none"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <textarea
            className="bg-transparent border border-gray-400 rounded-md px-2 outline-none"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />

          <input
            type="file"
            className="bg-transparent rounded-md px-1 outline-none"
            name="picture"
            id="picture"
            accept="image/*"
            capture="camera"
            onChange={(e) => setUpdatedPicture(e.target.files[0])}
          />

          <label className="w-fit">
            <input
              type="checkbox"
              checked={updatedVisibility}
              onChange={(e) => setUpdatedVisibility(e.target.checked)}
            />
            <span className="px-2">private</span>
          </label>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="bg-red-500 rounded-md text-white py-1 hover:bg-red-600">
              Update
            </button>
            <button
              type="button"
              className="bg-red-500 rounded-md text-white py-1 hover:bg-red-600"
              onClick={togglePOPUP}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

UpdateBlogForm.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  togglePOPUP: PropTypes.func.isRequired,
};
