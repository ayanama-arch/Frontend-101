import style from "./Navigation.module.css";

const Navigation = () => {
  return (
    <div className={`${style.navigation} `}>
      <div className={`${style.logo}`}>
        <img src="/images/logo.png" alt="Logo" />
      </div>
      <ul className={`${style.nav_links}`}>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
          <a href="#explore">Explore</a>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
