import Button from "../Buttons/Button";
import style from "./ContactForm.module.css";
import { MdContactSupport } from "react-icons/md";
import { IoCall, IoHandLeft } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleForm(value) {
    switch (value.target.name) {
      case "name":
        setName(value.target.value);
        break;
      case "email":
        setEmail(value.target.value);
        break;
      case "message":
        setMessage(value.target.value);
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formInfo = {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    };
    console.log(formInfo);
  }
  return (
    <div className={`${style.contact_form} container`}>
      <div className={`${style.left_section}`}>
        <div className={`${style.form_section}`}>
          <div className={`${style.top_btn}`}>
            <Button
              icon={
                <MdContactSupport
                  style={{
                    fontSize: "2rem",
                    width: "10%",
                    width: "10%",
                  }}
                />
              }
              text="VIA SUPPORT CHAT"
            />
            <Button
              icon={<IoCall style={{ fontSize: "2rem", width: "10%" }} />}
              text={"VIA CALL"}
            />
          </div>
          <div className={`${style.email_btn}`}>
            <Button
              icon={<MdEmail style={{ fontSize: "2rem", width: "10%" }} />}
              text={"VIA EMAIL"}
              primary={true}
            />
          </div>
        </div>
        <div className={`${style.form_details}`}>
          <form onSubmit={handleSubmit}>
            <div className={`${style.form_control}`}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleForm}
              />
            </div>
            <div className={`${style.form_control}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleForm}
              />
            </div>
            <div className={`${style.form_control}`}>
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="10"
                value={message}
                onChange={handleForm}
              ></textarea>
            </div>
            <Button text={"SUBMIT"} />
          </form>
        </div>
      </div>
      <div className={`${style.form_image}`}>
        <img src="/images/service.svg" alt="" />
      </div>
    </div>
  );
};

export default ContactForm;
