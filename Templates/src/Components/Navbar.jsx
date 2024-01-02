import iic from "../Assets/image 1.png";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ showNav, setShowNav }) => {
  return (
    <div
      className={`fixed w-full py-2 h-[90px] bg-[#FFFFFF] transition-all duration-300 ${
        showNav ? "pl-[200px] " : ""
      }`}
    >
      <div className="grid grid-flow-col items-center  max-w-[1000px] lg:gap-40 md:gap-10  pl-16">
        <div>
          <GiHamburgerMenu
            className="h-10 w-8 text-gray-400 cursor-pointer "
            onClick={() => setShowNav(!showNav)}
          />
        </div>
        <div>
          <img className="w-[130px]" src={iic} alt="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
