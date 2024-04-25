import StatsCard from './StatsCard';

const stats = [
  {
    count: 5000,
    text: 'Total Listing in the System',
  },
  {
    count: 1000,
    text: 'Active Listening',
  },
  {
    count: 3500,
    text: 'Loved Blogs',
  },
  {
    count: 800,
    text: 'Total Shared',
  },
];

export default function Stats() {
  return (
    <div className="bg-gray-300 p-4 rounded-xl flex flex-col md:w-full md:flex-row md:justify-around items-center justify-center">
      <div className="text text-center px-5 md:text-left">
        <span className="text-4xl">Insides and Performance Metrics</span>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start md:overflow-x-scroll my-5 gap-5">
        {(stats || []).map((property, index) => (
          <StatsCard key={index} count={property.count} text={property.text} />
        ))}
      </div>
    </div>
  );
}
