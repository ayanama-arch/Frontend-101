// import { Outlet } from "react-router-dom";
import ProfileClass from "./ProfileClass";
import XYZ from "./Profile";

const About = () => {
  return (
    <div>
      <h1>About us Page</h1>
      <p>This is the about us page</p>
      <ProfileClass name={"Ayan"} />
      <XYZ />
    </div>
  );
};

export default About;
