const MenuItem = ({ icon: Icon, label, onSelect }) => (
  <button
    onClick={onSelect}
    className="flex items-center text-gray-1 hover:text-purple"
  >
    <Icon size={20} />
    <span className="ml-3 font-semibold text-md">{label}</span>
  </button>
);

export default MenuItem;
