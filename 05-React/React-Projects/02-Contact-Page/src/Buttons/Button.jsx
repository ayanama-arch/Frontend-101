import style from "./Button.module.css";

const Button = ({ icon, text, primary, onClick }) => {
  return (
    <div className={`${style.button}`}>
      {primary ? (
        <div className={`${style.primary_btn}`}>
          <button onClick={onClick}>
            {icon} {text}
          </button>
        </div>
      ) : (
        <div className={`${style.secondary_btn}`}>
          <button>
            {icon} {text}
          </button>
        </div>
      )}
    </div>
  );
};

export default Button;
