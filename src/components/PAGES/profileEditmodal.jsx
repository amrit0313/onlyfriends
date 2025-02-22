import { useState } from "react";
import Modal from "../LAYOUT/modal";

const ProfileEditModal = ({ close }) => {
  const token = localStorage.getItem("access_token");
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [location, setLocation] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("profile_pic", profilePic);
    formData.append("gender", gender);
    formData.append("date_of_birth", dateOfBirth);
    formData.append("location", location);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/profile`,
        {
          method: "PUT",
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
      close;
    } catch (error) {
      console.log("Error:", error);
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
      className="absolute left-10 rounded-xl lg:left-[30%] shadow-2xl  shadow-slate-600 top-[15%] w-10/12 lg:w-6/12 h-auto z-[110]"
      onClose={close}
    >
      <div className="flex flex-col object-contain w-full rounded-xl bg-slate-100 text-slate-500">
        <h2 className="font-extrabold mt-10  m-auto">Update Your Profile:</h2>
        <div className="flex flex-col items-center font-bold">
          <div className="flex flex-col pt-10">
            <label className="pt-10 font-bold text-slate-600">
              Upload Profile pic here:
            </label>
            <input
              className="pb-10 w-56"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          {profilePic && (
            <img
              src={URL.createObjectURL(profilePic)}
              alt="Preview"
              width="200"
            />
          )}
          <div className="flex justify-around items-center mt-5">
            <div className="flex flex-col mr-5 md:mr-10">
              <label htmlFor="gender">Enter your gender</label>
              <select
                className="mb-5 px-2 py-2 border-2 border-slate-500 rounded-lg"
                name="Gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
            </div>
            <div className="flex flex-col items-center ">
              <label htmlFor="dob">Date Of Birth</label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="mb-5 px-2 py-2 border-2 border-slate-500 rounded-lg"
              />
            </div>
          </div>
          <textarea
            placeholder="Enter your bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-10/12 md:w-8/12 border-2 border-slate-500"
          />
          <input
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-10/12 md:w-8/12 py-2 border-2 border-slate-500 my-4"
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
