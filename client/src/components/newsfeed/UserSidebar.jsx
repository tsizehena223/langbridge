import { useState } from "react";
import Avatar from "../../assets/avatar.svg";
import { RiUserSearchFill } from "react-icons/ri";

const UserSidebar = () => {
  const [userList, setUserList] = useState([]);

  // const fetchUsers = async () => {
  //   try {
  //     const res = await api.get(
  //       config.baseUrl,
  //       `/api/usersby?number=6&countries=${countrySpeaking.join(",")}`,
  //       { headers: { Authorization: token } }
  //     );
  //     setUserList(res.data);
  //   } catch (error) {
  //     // TODO
  //   }
  // };
  //
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  return (
    <div
      className="sticky top-20 
      w-1/3 h-full ml-4 p-4
      rounded-md text-gray-1 bg-light"
    >
      <div className="ml-1 mb-4 flex items-center font-semibold">
        <RiUserSearchFill size={20} className="mr-3" />
        <div>Meet people</div>
      </div>
      <div>
        {/* {userList.map((user) => ( */}
        {/*   <div key={user.id} className="mb-4 flex items-center"> */}
        {/*     <ProfilePic key={user.id} img={Avatar} country={user.country} /> */}
        {/*     <div className="ml-3 font-semibold">{user.name}</div> */}
        {/*   </div> */}
        {/* ))} */}
      </div>
    </div>
  );
};

export default UserSidebar;
