import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa6";

const SocialLink = ({ href, icon: Icon }) => (
  <a href={href}>
    <Icon className="mx-4 text-purple hover:scale-125 duration-200" size={25} />
  </a>
);

const Footer = () => (
  <div className="flex flex-col items-center w-full mt-48 py-10 font-semibold text-gray-1">
    <div className="flex">
      <SocialLink href="#" icon={FaFacebook} />
      <SocialLink href="#" icon={FaInstagram} />
      <SocialLink href="#" icon={FaTwitter} />
      <SocialLink href="#" icon={FaYoutube} />
    </div>
    <div className="mt-6">©LangBridge All rights reserved 2023.</div>
  </div>
);

export default Footer;
