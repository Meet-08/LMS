type props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  component: string;
  imageSrc: string;
};

const NavbarButton = ({ onClick, component, imageSrc }: props) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-2 font-medium bg-transparent rounded-md hover:cursor-pointer flex items-center space-x-2"
    >
      <img src={imageSrc} alt={component} />
      <span>{component}</span>
    </button>
  );
};
export default NavbarButton;
