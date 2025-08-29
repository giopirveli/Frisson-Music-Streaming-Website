export default interface ButtonProps {
  icon?: string;
  onClick?: () => void | Promise<void>;
  width: string | number;
  height: string | number;
  text: string;

}
