const Hero = () => {
  return (
    <>
      <div className="hero-section">
        <div className="hero-text">
          <h1>
            Your Feet Deserve <br /> the best
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque
            esse eius aliquam ipsum. Quis labore cupiditate pariatur, reiciendis
            blanditiis vero?
          </p>
          <div className="hero-text-btn">
            <button className="red">Shop Now</button>
            <button>Category</button>
          </div>
          <div className="hero-text-icons">
            <p>Also Available On</p>
            <img src="images/amazon.png" alt="amazon" />
            <img src="images/flipkart.png" alt="flipkart" />
          </div>
        </div>
        <div className="hero-image">
          <img src="images/shoe_image.png" alt="Shoe" />
        </div>
      </div>
    </>
  );
};

export default Hero;
