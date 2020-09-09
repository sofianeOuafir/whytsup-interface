import { connect } from "react-redux";

import Assets from "../components/Assets";
import { startAddFollowing } from "../actions/followings";

const Unfollowings = ({ unfollowings, startAddFollowing }) => {
  return (
    <Assets
      assets={unfollowings}
      onClick={startAddFollowing}
      buttonText="Follow"
    />
  );
};

const mapStateToProps = ({ assets }) => {
  return {
    unfollowings: assets,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    startAddFollowing: (assetId) => dispatch(startAddFollowing(assetId)),
  };
};

export default connect(mapStateToProps, dispatchToProps)(Unfollowings);
