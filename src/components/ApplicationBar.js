import React from "react";
import { AppBar, Toolbar, TextField, Button } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";
import ApplicationBarClasses from "./ApplicationBar.css";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    color: "#fff",
    backgroundColor: "#3f51b5",
  },
  searchContainer: {
    marginLeft: "auto",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "200px",
    margin: "5px",
  },
  navLinkDiv: {
    display: "flex",
    marginRight: "auto",
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
    marginRight: "1em",
    fontSize: "18px",
  },
  navLinkHighlight: {
    textDecoration: "none",
    color: "inherit",
    marginRight: "1em",
    fontSize: "20px",
  },
}));

const ApplicationBar = (props) => {
  const classes = useStyles();
  let navLinkMy = props.showMyPokemons
    ? classes.navLinkHighlight
    : classes.navLink;
  let navLinkAll = props.showMyPokemons
    ? classes.navLink
    : classes.navLinkHighlight;
  {
    if (props.pokemonView) {
      navLinkAll = classes.navLink;
      navLinkMy = classes.navLink;
    }
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.navLinkDiv}>
          <NavLink className={navLinkAll} to="/">
            <span>ALL POKEMONS</span>
          </NavLink>

          <NavLink className={navLinkMy} to="/mypokemons">
            MY POKEMONS
          </NavLink>
        </div>
        {!props.pokemonView ? (
          <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={props.handleSearchChange}
              label="Pokemon"
              variant="standard"
            />
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
