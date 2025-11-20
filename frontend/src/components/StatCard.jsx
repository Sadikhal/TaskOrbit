

const StatCard = ({ type, value = 0 }) => {
  return (
    <div className="rounded-2xl odd:bg-[#0162ac] even:bg-[#5eb5b8] md:p-4 p-2 sm:p-3 flex-1 min-w-[130px] font-poppins">
      <h1 className="md:text-2xl text-xl text-lamaWhite font-roboto font-semibold">{value}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-100">{type}</h2>
    </div>
  );
};

export default StatCard;