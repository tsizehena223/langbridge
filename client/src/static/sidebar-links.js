import {
  RiHome2Line,
  RiInformationLine,
  RiMessage2Line,
  RiShoppingBag2Line,
  RiUser3Line,
  RiSettings2Line,
  RiSearch2Line,
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
    path: "/message",
    icon: RiMessage2Line,
    label: "Message",
  },
  {
    path: "/search",
    icon: RiSearch2Line,
    label: "Search",
  },
  {
    path: "/about",
    icon: RiInformationLine,
    label: "About",
  },
  {
    path: "/settings",
    icon: RiSettings2Line,
    label: "Settings",
  },
];

export default sidebarLinks;
