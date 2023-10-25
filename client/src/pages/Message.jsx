import { MainLayout, MessageBox, ContactList } from "../components";
import { useEffect, useState } from "react";
import { getCountrySpeaking } from "../utils/country-language";
import { useAuth } from "../contexts/AuthContext";
import userService from "../services/user";
import { useLocation } from "react-router-dom";

const Message = () => {
  const { userData } = useAuth();
  const { state } = useLocation();
  const [contacts, setContacts] = useState([]);
  const [partner, setPartner] = useState(null);

  const fetchData = async () => {
    const users = await userService.getUsersByDiscussion(userData.token);
    setContacts(users);
  };

  useEffect(() => {
    fetchData();

    if (state && state.id != userData.id) {
      setPartner(state);
    }
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
