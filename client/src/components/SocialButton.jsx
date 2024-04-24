import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function SocialButton({icon, url}) {
  return (
    <Link
      to={url}
      className={`background relative bg-red-500 h-7 w-7 rounded-full`}>
      <FontAwesomeIcon
        icon={icon}
        className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white text-sm`}
      />
    </Link>
  );
}

SocialButton.propTypes = {
  icon: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
};
