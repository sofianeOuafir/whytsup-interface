import React from "react";
import AppBar from "../components/AppBar";
import { startLogin } from "./../actions/auth";
import { connect } from "react-redux";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { startLogin } = this.props;
    startLogin({ email, password });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <AppBar />
        <form onSubmit={this.onSubmit}>
          <input type="text" onChange={this.onEmailChange} value={email} />
          <input
            type="password"
            onChange={this.onPasswordChange}
            value={password}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: ({ email, password }) =>
    dispatch(startLogin({ email, password })),
});

export default connect(null, mapDispatchToProps)(LoginPage);
