import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import AppBar from "./../components/AppBar";
import Followings from "./../components/Followings";
import Unfollowings from "./../components/Unfollowings";

const Layout = ({ title, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>

      <AppBar />

      <Container maxWidth="m">
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Unfollowings />
          </Grid>
          <Grid item xs={6}>
            <div style={{ marginTop: "10px" }}>{children}</div>
          </Grid>
          <Grid item xs={3}>
            <Followings />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Layout;
