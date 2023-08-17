import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(
          "http://localhost:3001/api/users/d4738165-26e1-42f2-809f-78f96a4cd55c/profile"
        );
        console.log(result);
        setProfile(result.data);
        const base64 = Buffer.from(result.data.profilePhoto.data).toString(
          "base64"
        );
        setProfilePic(base64);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadImageHandler = async (e) => {
    e.preventDefault();
    console.log(selectedFile);
    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await axios.patch(
        `http://localhost:3001/api/users/d4738165-26e1-42f2-809f-78f96a4cd55c/profile`,
        formData
      );
      const base64 = Buffer.from(response.data.profilePhoto.data).toString(
        "base64"
      );
      setProfilePic(base64);
      console.log("image uploaded success");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(profile);
  console.log(profilePic);

  return (
    <div>
      <div>
        <img src={`data:image/jpeg;base64,${profilePic}`} alt="profile" />
        <h1>bio</h1>
        <p>{profile ? profile.bio : ""}</p>
      </div>
      <div>
        <div></div>
        <label>Change image</label>
        <input type="file" name="image" onChange={handleFileChange} />
        <button type="button" onClick={uploadImageHandler}>
          upload
        </button>
      </div>
    </div>
  );
};

export default Profile;
