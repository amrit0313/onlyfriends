import { useState } from "react";
import Modal from "../LAYOUT/modal";
const ProfileEditModal = ({ close }) => {
  const token = localStorage.getItem("access_token");
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("profile_Pic", profilePic);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/profile`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error:", errorData);
        throw new Error("Error");
      }
      const responseData = await response.json();
      console.log("response", responseData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  return (
    <Modal
      className=" absolute left-10  rounded-xl lg:left-[30%]  shadow-2xl shadow-slate-800 top-[35%] w-10/12 lg:w-6/12 h-auto  z-[110] "
      onClose={close}
    >
      <div className="flex flex-col  items-center justify-center object-contain w-full rounded-xl  bg-white">
        <h2 className="font-extrabold mt-10 text-slate-800 ">
          Update Your Profile:
        </h2>
        <div className="flex flex-col  items-center font-bold">
          <input
            className="p-10 "
            type="file"
            accept="image/"
            onChange={handleImageChange}
            placeholder="choode profile pic"
          />
          {profilePic && <img src={profilePic} alt="Preview" width="200" />}

          <textarea
            placeholder="Enter your bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="  w-10/12 border-2 border-black "
          />
          <button
            className="px-10 py-3 bg-slate-800 text-white font-extrabold rounded-lg my-10 shadow-md shadow-slate-600"
            onClick={handleUpload}
          >
            Upload Profile
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;
