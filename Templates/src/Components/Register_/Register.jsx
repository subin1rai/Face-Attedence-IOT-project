import { useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
const Register = ({ showNav, setShowNav }) => {
  const [selectedImg, setSelectedImg] = useState(null);

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // const url = URL.createObjectURL(file);
      setSelectedImg(file);
    }
  };

  const handleThumbnailDelete = () => {
    setSelectedImg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data
    const formData = new FormData();
    formData.append("image", selectedImg);

    try {
      const response = await fetch("http://localhost:5000/uploadimage", {
        method: "POST",
        body: formData,
        // headers: {'Content-Type': 'multipart/form-data'}
      });

      console.log(response)

      // Handle response as needed
    } catch (error) {
      // Handle error
    }
  };

  return (
    
    <div
      className={`  bg-[#edebf0] min-w-[1100px] p-6 flex w-full h-full pt-[100px]  transition-all  duration-300 ${
        showNav ? "pl-56 " : ""
      }`}
    >
      <div className="pl-4 md:pl-16 px-10 w-[1000px] mx-auto">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl pt-2 mt-2 font-bold uppercase text-[#000000] ml-4  pb-6">
            Register Student
          </h2>
        </div>
        <div className=" p-4 bg-white h-[430px] w-[800px] rounded-lg">
          <div className="max-w-[600px] min-h-[320px] h-auto flex flex-col justify-center border-4 bg-[#edebf0]] mx-auto rounded-lg border-[#f3d1d6] border-dashed mt-8">
            <div className="flex items-center justify-center h-c flex-col border-dashed ">
              

              {selectedImg ? (
                
                <div className="  bg-white rounded-md">
                  <img

                    src={URL.createObjectURL(selectedImg)}
                    alt="Thumbnail Img"
                    style={{ width: "180px", height: "140px" }}
                  />
                  <hr className="my-2 w-[90%] mx-auto " />

                  <button
                    onClick={handleThumbnailDelete}
                    className="cursor-pointer font-bold mx-20 my-2"
                  >
                    <MdOutlineDeleteOutline size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-500 my-2">
                    Import Student Image Here
                  </h1>
                  <img
                    className="mx-auto h-12 w-12"
                    src="https://www.svgrepo.com/show/357902/image-upload.svg"
                    alt=""
                  />
                </>
              )}
            
              <label className="bg-[#c8eed7] px-2 py-1 my-5 rounded-md hover-bg-[#a0bce0]">
                Browse Student image
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleThumbnailUpload}
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between mx-20 my-1">
            <p className="text-xs  py-4">
              Include your name in the photo while uploading! For Ex: Subin
              Rai.jpg
            </p>
            <button className="w-[100px] bg-[#4B6DC9]  my-2 rounded-md" onClick={handleSubmit}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;


