const Navigation = () => {
  return (
    <>
      <nav>
        <div className="nav-logo">
          <img src="images/brand_logo.png" alt="" />
        </div>
        <div className="nav-links">
          <a href="#menu">Menu</a>
          <a href="#location">Location</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="login">
          <button>Login</button>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
