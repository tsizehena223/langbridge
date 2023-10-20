import {
  RiHome2Line,
  RiInformationLine,
  RiMessage2Line,
  RiShoppingBag2Line,
  RiUser3Line,
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
  {
    path: "/search",
    icon: RiSearch2Line,
    label: "Search",
  },
];

export default sidebarLinks;
