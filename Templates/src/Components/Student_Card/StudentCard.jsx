const StudentCard = (props) => {
  return (
    <div className="bg-[#fff] rounded-md mx-2">
      <img
        src={props.std_Img}
        alt="/"
        className="w-[80px] rounded-full mx-auto py-4"
      />
      <div className="ml-6 py-4">
        <h1 className="font-bold">{props.std_Name}</h1>
        <p className="py-1">{props.section}</p>
        <p className="text-xs">{props.contact}</p>
      </div>
    </div>
  );
};

export default StudentCard;
