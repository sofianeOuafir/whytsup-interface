import Headlines from "./../components/Headlines";
import Layout from "./../components/Layout";
import { startSetAssets } from "./../actions/assets";
import { startSetFollowings } from "./../actions/followings";
import { startSetHeadlines } from "./../actions/headlines";
import { wrapper } from "../store/configureStore";
import Paper from "@material-ui/core/Paper";

const Home = () => {
  return (
    <Layout title="WhyitsUpp">
      <Paper>
        <Headlines />
      </Paper>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    const cookie = req.headers.cookie
      ? { cookie: req.headers.cookie }
      : undefined;

    await store.dispatch(startSetAssets(cookie));
    await store.dispatch(startSetFollowings(cookie));
    await store.dispatch(startSetHeadlines(cookie));
  }
);

export default Home;
