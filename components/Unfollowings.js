import { connect } from "react-redux";

import Assets from "../components/Assets";
import { startAddFollowing } from "../actions/followings";
import { withRouter } from "next/router";

const Unfollowings = ({
  unfollowings,
  startAddFollowing,
  loggedIn,
  router,
}) => {
  const redirectToLoginPage = () => {
    router.push("/login");
  };
  return (
    <div>
      <h3>
        Follow your favourite stocks and receive a daily email to know why they
        are up or down!
      </h3>
      <Assets
        assets={unfollowings}
        onClick={loggedIn ? startAddFollowing : redirectToLoginPage}
        buttonText="Follow"
      />
    </div>
  );
};

const mapStateToProps = ({ assets, auth }) => {
  return {
    unfollowings: assets,
    loggedIn: auth.loggedIn,
  };
};

const dispatchToProps = (dispatch) => {
  return {
    startAddFollowing: (assetId) => dispatch(startAddFollowing(assetId)),
  };
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(withRouter(Unfollowings));
