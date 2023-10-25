import { MainLayout, MessageBox, ContactList } from "../components";
import { useEffect, useState } from "react";
import { getCountrySpeaking } from "../utils/country-language";
import { useAuth } from "../contexts/AuthContext";
import userService from "../services/user";

const Message = () => {
  const { userData } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [partner, setPartner] = useState(null);

  const fetchData = async () => {
    const countrySpeaking = getCountrySpeaking(userData.language);
    const users = await userService.getUsers(
      { countries: countrySpeaking.join(",") },
      userData.token
    );
    setContacts(users);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div className="h-[490px] w-full flex space-x-4">
        <ContactList users={contacts} onSelect={setPartner} />
        <MessageBox user={userData} partner={partner} />
      </div>
    </MainLayout>
  );
};

export default Message;
