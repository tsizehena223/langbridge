import { useContext, useEffect, useMemo, useState } from "react";
import ProfilePic from "./ProfilePic";
import { UserContext } from "../contexts/userContext";
import Avatar from "../assets/avatar.svg";
import { FaUser } from "react-icons/fa6";
import api from "../utils/api";
import config from "../config";
import { getCountrySpeaking } from "../utils/country-language";
import userListMock from "../mock/userList";

const Widgets = () => {
  const { token, language } = useContext(UserContext);
  const [userList, setUserList] = useState(userListMock);
  const countrySpeaking = useMemo(() => getCountrySpeaking(language));

  const fetchUsers = async () => {
    try {
      const res = await api.get(
        config.baseUrl,
        `/api/usersby?number=6&countries=${countrySpeaking.join(",")}`,
        { headers: { Authorization: token } }
      );
      setUserList(res.data);
    } catch (error) {
      // TODO
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="sticky top-[92px] w-1/3 h-full mt-6 mr-6 p-4 rounded-md text-gray-1 bg-light">
      <div className="ml-1 mb-4 flex items-center font-semibold">
        <FaUser className="mr-3" />
        <div>Meet people</div>
      </div>
      <div>
        {userList.map((user) => (
          <div key={user.id} className="mb-4 flex items-center">
            <ProfilePic key={user.id} img={Avatar} country={user.country} />
            <div className="ml-3 font-semibold">{user.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widgets;
