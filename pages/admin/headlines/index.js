import { withRouter } from "next/router";

import { wrapper } from "./../../../store/configureStore";
import { startGetAdminHeadlines } from "./../../../actions/headlines";

const AdminHeadlines = ({ router, headlines }) => {
  return (
    <div>
      <h1>Headlines</h1>
      <button onClick={() => router.push("/admin/headlines/create")}>
        New Headline
      </button>
      {headlines.map((headline, index) => {
        const { title, id } = headline;
        return (
          <div key={index}>
            <p>{title}</p>
            <button onClick={() => router.push(`/admin/headlines/${id}`)}>
              View
            </button>
          </div>
        );
      })}
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req }) => {
    const cookie = req.headers.cookie
      ? { cookie: req.headers.cookie }
      : undefined;
    const response = await startGetAdminHeadlines(cookie);
    const headlines = response.data;
    return {
      props: {
        headlines,
      },
    };
  }
);

export default withRouter(AdminHeadlines);
