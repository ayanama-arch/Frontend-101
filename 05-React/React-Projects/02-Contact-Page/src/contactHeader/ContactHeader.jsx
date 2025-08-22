import style from "./ContactHeader.module.css";

const ContactHeader = () => {
  return (
    <div className={`${style.contact_header} container`}>
      <h1>contact us</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem
        praesentium soluta et consequatur quibusdam vitae voluptatibus
        perferendis dolore sequi rem. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Quo facere laudantium odit, blanditiis aliquid enim!
      </p>
    </div>
  );
};

export default ContactHeader;
