type Props = { value: number };

const Progressbar = ({ value }: Props) => {
  const ww = `${value}%`;
  return (
    <div className="w-full rounded-full bg-gray-200">
      <div
        className="rounded-l-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100"
        style={{ width: ww }}
      >
        {" "}
        {value}%
      </div>
    </div>
  );
};

export default Progressbar;
