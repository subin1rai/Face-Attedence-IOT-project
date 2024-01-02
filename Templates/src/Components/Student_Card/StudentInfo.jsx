import { FiSearch } from "react-icons/fi";
import StudentCard from "../Student_Card/StudentCard";
import StudentData from "../Student_Card/Student";
const StudentInfo = ({ showNav, setShowNav }) => {
  return (
    <div
      className={`  bg-[#edebf0] min-w-[800px] flex w-full h-full pt-[100px]  transition-all  duration-300 ${
        showNav ? "pl-56 " : ""
      }`}
    >
      <div className="pl-4 md:pl-16 px-10 w-[1000px] mx-auto">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl pt-2 mt-2 font-bold uppercase text-[#000000] ml-4  pb-6">
            Student
          </h2>
          <div className="flex">
            <input
              type="text"
              className="bg-white mx-4 max-w-[80px] text-xs py-2 px-4 rounded-md"
              placeholder="Section"
            />
            <div className="bg-white flex justify-center items-center rounded-md">
              <input type="text" className="ml-4 outline-none" />
              <FiSearch className="mx-2" />
            </div>
          </div>
        </div>
        <div className=" bg-[#edebf0]  rounded-lg   ml-4  pb-10 pt-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
          {StudentData.map((EntryTerm) => (
            <>
              <StudentCard
                id={EntryTerm.id}
                std_Name={EntryTerm.std_Name}
                contact={EntryTerm.contact}
                section={EntryTerm.section}
                std_Img={EntryTerm.std_Img}
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StudentInfo;
