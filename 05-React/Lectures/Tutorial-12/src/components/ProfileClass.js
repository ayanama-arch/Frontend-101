import React from "react";
import UserContext from "../../utils/UserContext";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.num = 0;
    this.state = {
      count: this.num,
      count2: 0,
    };
    // console.log("Hello1");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    console.log("hello2");
    return (
      <div>
        <h1>Profile Class Based Component</h1>
        <h2>Name: {this.props.name}</h2>
        <UserContext.Consumer>
          {({ user }) => (
            <h3>
              {user.name} - {user.email}
            </h3>
          )}
        </UserContext.Consumer>
        <button
          onClick={() => {
            this.num++;
            this.setState({
              count: this.num,
            });
          }}
        >
          Button: {this.state.count}
        </button>
      </div>
    );
  }
}

export default Profile;
