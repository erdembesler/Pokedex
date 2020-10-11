import React from "react";
import { AppBar, Toolbar, TextField, Button } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
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
}));

const ApplicationBar = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.searchContainer}>
          <SearchIcon className={classes.searchIcon} />
          <TextField
            className={classes.searchInput}
            onChange={props.handleSearchChange}
            label="Pokemon"
            variant="standard"
          />
        </div>
        {props.showMyPokemons ? (
          <li>
            <NavLink to="/">All Pokemons</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/mypokemons">My Pokemons</NavLink>
          </li>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
