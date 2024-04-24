import PropTypes from 'prop-types';

export default function CustomButton({text, count = '', onClick, active}) {
  return (
    <button
      onClick={onClick}
      className={`font-extralight whitespace-nowrap ${
        active ? 'bg-red-500' : 'bg-gray-400'
      } text-white py-2 px-3 rounded-[5vh] hover:bg-gray-500 transition-colors duration-200`}>
      {text}
      {count === '' ? '' : `(${count})`}
    </button>
  );
}

CustomButton.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  count: PropTypes.number,
  text: PropTypes.string.isRequired,
};
