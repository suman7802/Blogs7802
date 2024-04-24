export default function Divider() {
  return (
    <div className="browser flex flex-col text-center items-center gap-5 lg:gap-10 my-10">
      <h2 className="text-xl lg:text-4xl font-semibold">
        Browser From Top Categories
      </h2>
      <div className="divider flex flex-row gap-1">
        <div className="divider flex flex-row w-11 bg-red-500 h-1 rounded-md" />
        <div className="divider flex flex-row w-3 bg-red-500 h-1 rounded-md" />
      </div>
    </div>
  );
}
