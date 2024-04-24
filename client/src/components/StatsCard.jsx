import PropTypes from 'prop-types';

export default function StatsCard({count, text}) {
  return (
    <div className="card flex flex-col items-center justify-center gap-4 w-72 p-12 rounded-2xl text-white  bg-gray-900">
      <span className="text-7xl">{count}+</span>
      <span>{text}</span>
    </div>
  );
}

StatsCard.propTypes = {
  text: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
