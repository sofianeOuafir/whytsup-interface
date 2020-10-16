import React from "react";
import axios from "axios";
import { withRouter } from "next/router";
import Link from "next/link";

import { wrapper } from "./../../../store/configureStore";
import { startCreateHeadline } from "./../../../actions/headlines";
import { startCreatePrice } from "./../../../actions/prices";

class CreateHealine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: "",
      priceValue: "",
      priceChange: "",
    };
  }

  onPriceValueChange = (e) => {
    const priceValue = e.target.value;
    this.setState(() => ({ priceValue }));
  };

  onPriceChangeChange = (e) => {
    const priceChange = e.target.value;
    this.setState(() => ({ priceChange }));
  };

  onAssetChange = (e) => {
    const asset = e.target.value;
    this.setState(() => ({ asset }));
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { asset, priceValue, priceChange } = this.state;
    const { router } = this.props;
    let headlineId;
    startCreateHeadline(asset)
      .then((response) => {
        headlineId = response.data.id;
        return startCreatePrice({
          assetId: asset,
          value: priceValue,
          change: priceChange,
        });
      })
      .then(() => {
        router.push(`/admin/headlines/${headlineId}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { asset, priceValue, priceChange } = this.state;
    const { assets } = this.props;
    return (
      <div>
        <Link href="/admin/headlines">
          <a>All Headlines</a>
        </Link>
        <h1>Create headline</h1>
        <form onSubmit={this.onSubmit}>
          <select onChange={this.onAssetChange} value={asset}>
            <option value>Select an Asset</option>
            {assets.map((asset, index) => {
              return (
                <option key={index} value={asset.id}>
                  {asset.code}
                </option>
              );
            })}
          </select>
          <input
            onChange={this.onPriceValueChange}
            value={priceValue}
            type="text"
            placeholder="Price value"
          />
          <input
            onChange={this.onPriceChangeChange}
            value={priceChange}
            type="text"
            placeholder="Price change"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req }) => {
    const cookie = req.headers.cookie
      ? { cookie: req.headers.cookie }
      : undefined;

    const response = await axios.get("http://localhost:3001/admin/assets", {
      headers: cookie,
    });
    const assets = response.data;
    return {
      props: {
        assets,
      },
    };
  }
);

export default withRouter(CreateHealine);
