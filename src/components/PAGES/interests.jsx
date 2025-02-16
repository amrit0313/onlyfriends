import { useEffect, useState } from "react";

const Interests = () => {
  const [interests, setInterests] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/v1/profile/interests",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error occurred: ${errorData.message}`);
      }
      const responseData = await response.json();
      console.log(responseData)
      setInterests(responseData);
    };
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {interests?.map((interest) => (
        <div>{interest}</div>
      ))}
    </>
  );
};

export default Interests;
