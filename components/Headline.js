import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Headline = ({ headline }) => {
  const classes = useStyles();
  const { news, title, id } = headline;
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={<h3>{title}</h3>} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {news.map((info, index) => {
            const { title, link, author } = info;
            return (
              <a href={link} target="_blank" key={index}>
                <ListItem button className={classes.nested}>
                  <ListItemText primary={title} secondary={author.name} />
                </ListItem>
              </a>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
};

export default Headline;
