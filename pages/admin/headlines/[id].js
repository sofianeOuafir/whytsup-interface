import { withRouter } from "next/router";
import axios from "axios";

import { wrapper } from "./../../../store/configureStore";
import { startGetAdminHeadline } from "./../../../actions/headlines";

const AdminHeadline = ({ headline, router }) => {
  const { title, id: headlineId, news } = headline;
  return (
    <div>
      <button onClick={() => router.push("/admin/headlines")}>
        All headlines
      </button>
      <h1>{title}</h1>
      {news.map(({ title, id: newsId }, index) => {
        return (
          <div key={index}>
            <h2>{title}</h2>
            <button onClick={() => removeInfo({ newsId, headlineId })}>
              Remove
            </button>
          </div>
        );
      })}
      <button
        onClick={() =>
          router.push(`/admin/headlines/${headlineId}/news/create`)
        }
      >
        Add News
      </button>
    </div>
  );
};

const removeInfo = ({ headlineId, newsId }) => {
  axios.delete(
    `${process.env.BACKEND_URL}/admin/headlines/${headlineId}/news/${newsId}`,
    {
      withCredentials: true,
    }
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, params }) => {
    const cookie = req.headers.cookie
      ? { cookie: req.headers.cookie }
      : undefined;
    const id = params.id;
    const response = await startGetAdminHeadline({ cookie, id });
    const headline = response.data;
    return {
      props: {
        headline,
      },
    };
  }
);

export default withRouter(AdminHeadline);
