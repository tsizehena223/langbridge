import {
  RiHome2Line,
  RiInformationLine,
  RiMessage2Line,
  RiNewspaperLine,
  RiShoppingBag2Line,
  RiUser3Line,
} from "react-icons/ri";

const sidebarLinks = [
  {
    path: "/",
    icon: RiHome2Line,
    label: "Home",
  },
  {
    path: "/profile",
    icon: RiUser3Line,
    label: "Profile",
  },
  {
    path: "/notifications",
    icon: RiInformationLine,
    label: "Notifications",
  },
  {
    path: "/chat",
    icon: RiMessage2Line,
    label: "Message",
  },
  {
    path: "/shop",
    icon: RiShoppingBag2Line,
    label: "Shop",
  },
];

export default sidebarLinks;
