import { withRouter } from "next/router";
import React from "react";
import axios from "axios";
import Link from "next/link";

import { wrapper } from "./../../../../../store/configureStore";

class AdminCreateNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      link: "",
      authorId: "",
    };
  }

  onAuthorChange = (e) => {
    const authorId = e.target.value;
    this.setState(() => ({ authorId }));
  };

  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };

  onLinkChange = (e) => {
    const link = e.target.value;
    this.setState(() => ({ link }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { authorId, title, description, link } = this.state;
    const { headline } = this.props;
    const { id: headlineId } = headline;
    const news = {
      author_id: authorId,
      title,
      description,
      link,
    };
    axios
      .post(`http://localhost:3001/admin/headlines/${headlineId}/news`, news, {
        withCredentials: true,
      })
      .then(() => {
        const { router } = this.props;
        router.push(`/admin/headlines/${headlineId}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { authors, headline } = this.props;
    const { title: headlineTitle } = headline;
    const { authorId, title, description, link } = this.state;
    return (
      <div>
        <Link href="/admin/headlines">
          <a>All Headlines</a>
        </Link>
        <h1>{headlineTitle}</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={this.onTitleChange}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={this.onDescriptionChange}
          />
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={this.onLinkChange}
          />
          <select onChange={this.onAuthorChange} value={authorId}>
            <option value>Select an Author</option>
            {authors.map((author, index) => {
              return (
                <option key={index} value={author.id}>
                  {author.name}
                </option>
              );
            })}
          </select>
          <button>Create</button>
        </form>
        <Link href="/admin/authors/create"><a>Create Author</a></Link>
      </div>
    );
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, params }) => {
    const cookie = req.headers.cookie
      ? { cookie: req.headers.cookie }
      : undefined;
    const { id: headlineId } = params;
    const headlineResponse = await axios.get(
      `http://localhost:3001/admin/headlines/${headlineId}`,
      {
        headers: cookie,
      }
    );
    const authorResponse = await axios.get(
      "http://localhost:3001/admin/authors",
      {
        headers: cookie,
      }
    );
    const authors = authorResponse.data;
    const headline = headlineResponse.data;

    return {
      props: {
        headline,
        authors,
      },
    };
  }
);

export default withRouter(AdminCreateNews);
