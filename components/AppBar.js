import Link from "next/link";
import { connect } from "react-redux";

const AppBar = ({ userName, email, loggedIn }) => {
  return (
    <div>
      <Link href="/">
        <a>Ytsup</a>
      </Link>
      {!loggedIn ? (
        <Link href="/login">
          <a>Login</a>
        </Link>
      ) : (
        <Link href="/">
          <a>{userName}</a>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  const { userName, email, loggedIn } = auth;
  return {
    userName,
    email,
    loggedIn,
  };
};

export default connect(mapStateToProps)(AppBar);
