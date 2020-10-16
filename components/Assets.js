import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

const Assets = ({ assets, onClick, buttonText }) => {
  return (
    <List component="nav" aria-label="secondary mailbox folders">
      {assets.map(({ id, name, code }, index) => (
        <ListItem key={index}>
          <ListItemText primary={`${code}`} secondary={`${name}`} />
          <Button variant="contained" color={buttonText == "Follow" ? "primary" : "secondary"} onClick={() => onClick(id)}>
            {buttonText}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default Assets;
