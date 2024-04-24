import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useState} from 'react';

export default function Card({
  id,
  title,
  content,
  picture,
  visibility,
  name,
  profile,
  createdAt,
  updatedAt,
  email,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded((isExpanded) => !isExpanded);
  };

  const shortContent = content.split(' ').slice(0, 40).join(' ');

  let date = updatedAt ? updatedAt : createdAt;

  return (
    <div className="flex flex-col w-[calc(90vw)] md:w-[calc(80vw)] items-start rounded-lg border border-gray-300">
      <div className="relative picture ">
        <img
          src={picture}
          alt="property"
          className="object-cover rounded-t-lg w-[calc(90vw)] md:w-[calc(80vw)] h-[50vh]"
        />
        <span className="absolute text-sm text-white top-3 right-3 bg-green-600 px-2 rounded-[5vh]">
          {visibility ? 'Public' : 'Private'}
        </span>
      </div>

      <div className="details flex flex-col py-4 gap-2 px-5">
        <div className="price flex flex-row gap-2 items-center">
          <Link
            to={`/${id}`}
            className="rent text-red-500 hover:underline hover:cursor-pointer">
            {title}
          </Link>
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

      <div className="profile flex pl-5 flex-row w-full items-center justify-start py-4 border-t-[1.5px]">
        <div className="profile flex flex-row items-center gap-4">
          <img
            src={profile}
            alt="profile"
            className="w-14 h-14 object-cover rounded-full"
          />
          <div className="info flex flex-col">
            <Link
              to={`mailto:${email}`}
              className="name text-sm hover:underline hover:cursor-pointer">
              {name}
            </Link>
            <span className="text-xs text-gray-600 font-thin">
              {new Date(date).toDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
