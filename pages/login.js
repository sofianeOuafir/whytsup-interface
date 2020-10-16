import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import AppBar from "../components/AppBar";
import { startLogin } from "./../actions/auth";
import { connect } from "react-redux";
import Link from "next/link";
import { withRouter } from "next/router";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
    const { startLogin, router } = this.props;
    startLogin({ email, password })
      .then(() => {
        router.push("/");
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Fragment>
        <AppBar />
        <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "100px" }}>
          <Paper>
            <form onSubmit={this.onSubmit}>
              <Grid container spacing={3}>
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
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link href="/signup">
                    <Button color="primary">Sign Up</Button>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: ({ email, password }) =>
    dispatch(startLogin({ email, password })),
});

export default connect(null, mapDispatchToProps)(withRouter(LoginPage));
