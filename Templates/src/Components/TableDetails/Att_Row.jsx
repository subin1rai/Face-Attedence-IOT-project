const Att_Row = (props) => {
  return (
    <div className="flex justify-around pt-6">
      <h1>{props.sn}</h1>
      <h1>{props.name}</h1>
      <h1>{props.date.currTime}</h1>
      <h1>{props.time.currentDate}</h1>
      <h1>{props.status}</h1>
    </div>
  );
};

export default Att_Row;
