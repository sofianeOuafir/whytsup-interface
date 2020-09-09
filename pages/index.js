import Head from "next/head";
import { connect } from "react-redux";

import AppBar from "./../components/AppBar";
import Followings from "./../components/Followings";
import SearchBar from "./../components/SearchBar";
import Unfollowings from "./../components/Unfollowings";
import { startSetAssets } from "./../actions/assets";
import { startSetFollowings } from "./../actions/followings";
import { wrapper } from "../store/configureStore";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Ytsup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <AppBar />
      </div>
      <div>
        <Followings />
      </div>
      <div>
        <h1>
          Follow your favourite stocks and receive a daily email to know why
          they are up or down!
        </h1>
        <SearchBar />
        <div>
          <Unfollowings />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req }) => {
    const cookie = req.headers.cookie
      ? { cookie: req.headers.cookie }
      : undefined;

    await store.dispatch(startSetAssets(cookie));
    await store.dispatch(startSetFollowings(cookie));
  }
);

const mapStateToProps = ({ assets }) => ({
  assets,
});

export default connect(mapStateToProps)(Home);
