const MenuItem = ({ icon: Icon, label, onSelect }) => (
  <button
    onClick={onSelect}
    className="flex items-center text-gray-1 hover:text-purple"
  >
    <Icon className="mr-2" />
    <span className="font-semibold hidden md:block">{label}</span>
  </button>
);

export default MenuItem;
