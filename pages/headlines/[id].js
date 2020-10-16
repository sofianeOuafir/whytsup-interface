import Layout from "./../../components/Layout";
import { startGetHeadline } from "./../../actions/headlines";
import { wrapper } from "../../store/configureStore";
import Headline from "./../../components/Headline";
import { startSetAssets } from "./../../actions/assets";
import { startSetFollowings } from "./../../actions/followings";
import Paper from "@material-ui/core/Paper";

const HeadlinePage = ({ headline }) => {
  return (
    <Layout title={headline.title}>
      <Paper>
        <Headline headline={headline} />
      </Paper>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ params, req, store }) => {
    const cookie = req.headers.cookie
      ? { cookie: req.headers.cookie }
      : undefined;

    await store.dispatch(startSetAssets(cookie));
    await store.dispatch(startSetFollowings(cookie));
    const response = await startGetHeadline({ cookie, id: params.id });

    const headline = response.data;
    return {
      props: {
        headline,
      },
    };
  }
);

export default HeadlinePage;
