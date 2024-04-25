import {useState} from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import {UserContext} from '../context/User';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function CardUser({
  id,
  title,
  content,
  picture,
  visibility,
  createdAt,
  updatedAt,
}) {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error('useHome must be used within a ProfileProvider');

  const {deleteBlog, updateBlog} = context;

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  const shortContent = content.split(' ').slice(0, 40).join(' ');

  let date = updatedAt ? updatedAt : createdAt;

  return (
    <div className="flex flex-col w-[calc(90vw)] md:w-[calc(80vw)] rounded-lg border border-gray-300">
      <div className="relative picture ">
        <img
          src={picture}
          alt="property"
          className="object-cover rounded-t-lg w-[calc(90vw)] md:w-[calc(80vw)] h-[50vh]"
        />
        <span className="absolute text-sm text-white top-3 right-3 bg-green-600 px-2 rounded-[5vh]">
          {visibility ? 'Private' : 'Public'}
        </span>

        <span className="absolute text-sm text-white top-11 right-3 bg-blue-500 px-2 rounded-[5vh]">
          edit
        </span>
        <FontAwesomeIcon
          icon={faTrash}
          className="h-5 absolute text-sm text-red-300 top-20 right-3 px-2 hover:cursor-pointer active:text-red-600"
          onClick={() => deleteBlog(id)}
        />
      </div>

      <div className="details flex flex-col py-4 gap-2 px-5 w-full text-center bg-gray-100">
        <div className="price flex flex-row gap-2 items-baseline justify-center w-full">
          <span className="rent text-red-500 ">{title}</span>
          <span className="text-xs text-gray-600 font-thin">
            {new Date(date).toDateString()}
          </span>
        </div>

        <div
          className={`text-base flex flex-row items-center gap-2 justify-around`}>
          {isExpanded ? content : shortContent}
        </div>
        <span
          onClick={() => toggleDescription(!isExpanded)}
          className="text-blue-500 text-base text-center">
          {isExpanded ? 'Show less' : 'Show more'}
        </span>
      </div>
    </div>
  );
}

CardUser.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};
