import React from "react";
import axios from "axios";
import { withRouter } from "next/router";

class CreateHealine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      website: "",
    };
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };

  onWebsiteChange = (e) => {
    const website = e.target.value;
    this.setState(() => ({ website }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { website, name } = this.state;
    const { router } = this.props;
    axios
      .post(
        `${process.env.BACKEND_URL}/admin/authors`,
        { website, name },
        { withCredentials: true }
      )
      .then(() => {
        router.back();
      });
  };

  render() {
    const { name, website } = this.state;
    const { router } = this.props;
    return (
      <div>
        <button onClick={() => router.back()}>Back</button>
        <h1>Create Author</h1>
        <form onSubmit={this.onSubmit}>
          <input
            onChange={this.onNameChange}
            value={name}
            type="text"
            placeholder="Name"
          />
          <input
            onChange={this.onWebsiteChange}
            value={website}
            type="text"
            placeholder="Website"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(CreateHealine);
