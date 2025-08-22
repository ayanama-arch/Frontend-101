import { useState } from "react";

const Section = ({ title, description, isVisible, setIsVisible }) => {
  //   const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="border-class">
      <h2>{title}</h2>
      {isVisible && <p>{description}</p>}
      {isVisible ? (
        <button
          onClick={() => {
            setIsVisible(false);
          }}
        >
          Hide
        </button>
      ) : (
        <button
          onClick={() => {
            setIsVisible(true);
          }}
        >
          Show
        </button>
      )}
    </div>
  );
};

const VisibleSection = (bool, title, setSectionConfig) => {
  if (bool) {
    setSectionConfig(title);
  } else {
    setSectionConfig("");
  }
};

const Instamart = () => {
  const [sectionConfig, setSectionConfig] = useState("");
  return (
    <div>
      <Section
        title={"About Instamart"}
        description={
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as "
        }
        isVisible={sectionConfig == "about"}
        setIsVisible={(bool) => VisibleSection(bool, "about", setSectionConfig)}
      />
      <Section
        title={"Careers"}
        description={
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as "
        }
        isVisible={sectionConfig == "careers"}
        setIsVisible={(bool) =>
          VisibleSection(bool, "careers", setSectionConfig)
        }
      />
      <Section
        title={"Employee"}
        description={
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here content here making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as "
        }
        isVisible={sectionConfig == "employee"}
        setIsVisible={(bool) =>
          VisibleSection(bool, "employee", setSectionConfig)
        }
      />
    </div>
  );
};

export default Instamart;
