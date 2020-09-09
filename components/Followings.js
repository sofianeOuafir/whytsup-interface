import { connect } from "react-redux";

import { startRemoveFollowing } from "../actions/followings";
import Assets from "./Assets";

const Followings = ({ followings, startRemoveFollowing }) => {
  return (
    <div>
      <h2>Followings</h2>
      <Assets
        assets={followings}
        onClick={startRemoveFollowing}
        buttonText="Unfollow"
      />
    </div>
  );
};

const mapStateToProps = ({ followings }) => {
  return {
    followings,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startRemoveFollowing: (assetId) => dispatch(startRemoveFollowing(assetId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Followings);
