import {useState, useContext} from 'react';
import PropTypes from 'prop-types';
import {UserContext} from '../context/User';

export default function UpdateBlogForm({name, togglePOPUP}) {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error('useHome must be used within a ProfileProvider');

  const {loading, updateProfile} = context;
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedProfile, setUpdatedProfile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('name', updatedName);
    data.append('profile', updatedProfile);

    updateProfile(data);
  };

  return (
    <div className="absolute w-80 top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-gray-200 border border-gray-300 rounded-md">
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
            value={updatedName}
            placeholder="User Name"
            onChange={(e) => setUpdatedName(e.target.value)}
          />

          <input
            type="file"
            className="bg-transparent rounded-md px-1 outline-none"
            name="profile"
            id="profile"
            accept="image/*"
            capture="camera"
            onChange={(e) => setUpdatedProfile(e.target.files[0])}
          />

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
  name: PropTypes.string.isRequired,
  togglePOPUP: PropTypes.func.isRequired,
};
