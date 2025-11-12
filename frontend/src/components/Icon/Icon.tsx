import { MouseEventHandler } from "react";
import { FiHome, FiUser, FiSettings } from "react-icons/fi"; // Import icons

// Only allow these specific icon names
type Name = "home" | "user" | "settings";

type Props = {
  name: Name; // Icon name to render
  onClick?: MouseEventHandler<HTMLDivElement>; // Optional click handler
};

// Map icon names to actual components
const icons = {
  home: FiHome,
  user: FiUser,
  settings: FiSettings,
};

export default function Icon({ name, onClick }: Props) {
  const IconComponent = icons[name]; // Get the matching icon

  // If no matching icon found, throw error
  if (!IconComponent) {
    throw new Error(`Icon "${name}" does not exist.`);
  }

  return (
    <div onClick={onClick}>
      {" "}
      {/* Pass click function from parent if needed */}
      <IconComponent />
    </div>
  );
}
