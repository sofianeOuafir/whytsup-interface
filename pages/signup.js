import { connect } from "react-redux";
import React from "react";
import { withRouter } from "next/router";

import { startSignUp } from "./../actions/auth";
import AppBar from "./../components/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  }

  onUserNameChange = (e) => {
    e.preventDefault();
    const userName = e.target.value;
    this.setState(() => ({ userName }));
  };

  onEmailChange = (e) => {
    e.preventDefault();
    const email = e.target.value;
    this.setState(() => ({ email }));
  };

  onPasswordChange = (e) => {
    e.preventDefault();
    const password = e.target.value;
    this.setState(() => ({ password }));
  };

  onPasswordConfirmationChange = (e) => {
    e.preventDefault();
    const passwordConfirmation = e.target.value;
    this.setState(() => ({ passwordConfirmation }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { startSignUp, router } = this.props;
    const { userName, email, password, passwordConfirmation } = this.state;

    startSignUp({ userName, email, password, passwordConfirmation })
      .then(() => {
        router.push("/");
      })
      .catch((e) => console.log(e.response.data));
  };

  render() {
    const { userName, email, password, passwordConfirmation } = this.state;
    return (
      <div>
        <AppBar />
        <Container
          maxWidth="sm"
          style={{ textAlign: "center", marginTop: "100px" }}
        >
          <Paper>
            <form onSubmit={this.onSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    onChange={this.onUserNameChange}
                    value={userName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    onChange={this.onEmailChange}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password"
                    variant="outlined"
                    onChange={this.onPasswordChange}
                    value={password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    label="Password Confirmation"
                    variant="outlined"
                    onChange={this.onPasswordConfirmationChange}
                    value={passwordConfirmation}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Sign Up
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </div>
    );
  }
}

const mapDipatchToProps = (dispatch) => ({
  startSignUp: ({ userName, email, password, passwordConfirmation }) =>
    dispatch(startSignUp({ userName, email, password, passwordConfirmation })),
});

export default connect(null, mapDipatchToProps)(withRouter(SignUp));
