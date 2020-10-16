import { connect } from "react-redux";
import List from '@material-ui/core/List';

import Headline from "./../components/Headline";

const Headlines = ({ headlines }) => {
  return (
    <List>
      {headlines.map((headline, index) => {
        return <Headline key={index} headline={headline} />;
      })}
    </List>
  );
};

const mapStateToProps = ({ headlines }) => ({
  headlines,
});

export default connect(mapStateToProps)(Headlines);
