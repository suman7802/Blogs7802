import SimpleButton from './SimpleButtons';

const buttons = [
  {
    text: 'All Items',
    count: 26,
    active: true,
  },
  {
    text: 'City Living Chronicles',
    count: 12,
  },
  {
    text: 'Sports Venue Insider',
    count: 8,
  },
  {
    text: 'Meeting Space Matters',
    count: 6,
  },
  {
    text: 'Wheels & Wanderlust',
  },
  {
    text: 'Pets & Their People',
  },
];

export default function Listing() {
  return (
    <div className="browser flex flex-col text-center items-center gap-5 lg:gap-10 my-10">
      <h2 className="text-xl lg:text-4xl font-semibold">
        Browser From Top Categories
      </h2>

      <div className="divider flex flex-row gap-1">
        <div className="divider flex flex-row w-11 bg-red-500 h-1 rounded-md" />
        <div className="divider flex flex-row w-3 bg-red-500 h-1 rounded-md" />
      </div>

      <div className="buttons w-screen gap-3 flex flex-row overflow-x-auto lg:justify-center">
        {buttons.map((button, index) => (
          <SimpleButton
            key={index}
            text={button.text}
            count={button.count}
            active={button.active}
          />
        ))}
      </div>
    </div>
  );
}
