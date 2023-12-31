import { GiHamburgerMenu } from "react-icons/gi";
import { MdAddBox } from "react-icons/md";
import Attendence_Date from "../Components/TableDetails/Attendence_Data";
import Att_Row from "../Components/TableDetails/Att_Row";

const Home = ({ showNav, setShowNav }) => {
  return (
    <div
      className={`  bg-[#edebf0] min-w-[850px] flex w-full h-full  pt-[120px]  transition-all  duration-300 ${
        showNav ? "pl-56 " : ""
      }`}
    >
      <div className="pl-4 md:pl-16 px-10 w-[1000px] mx-auto">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl pt-2 mt-2 font-bold uppercase text-[#000000] lg:ml-12 ml-4  pb-6">
            Student Attendence
          </h2>
          <button className="w-[110px] rounded-md flex items-center text-white font-bold bg-[#4B6DC9] py-1 mr-[100px] md:mr-4">
            <MdAddBox className="mx-4" size={30} />
            ADD
          </button>
        </div>
        <div className=" bg-white rounded-lg h-auto  ml-4  py-10">
          <div className="grid grid-flow-row col-span-5">
            <div className="flex justify-between mx-8 border-b-2">
              <h1>S.N</h1>
              <h1>Name</h1>
              <h1>Date</h1>
              <h1>Time</h1>
              <h1>Status</h1>
            </div>

            
            {/* Attendence ko table ma vako record Ya maping gareko xa */}
            {Attendence_Date.map((A_data, index) => (
              <>
                <Att_Row
                  id={A_data.id}
                  sn={index + 1}
                  name={A_data.name}
                  date={A_data.date}
                  time={A_data.time}
                  status={A_data.status}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
