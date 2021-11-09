import classes from "./Button.module.css";

const Button = ({ children, type, onClick, className }) => {
  return (
    <button
      className={`${className} ${classes.button}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
