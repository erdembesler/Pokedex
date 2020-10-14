import React from "react";
import { AppBar, Toolbar, TextField, Button } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import closedBall from "../../Assets/pokeball1.png";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    color: "#fff",
    backgroundColor: "#3f51b5",
    height: 70,
    minWidth: 300,
  },
  searchContainer: {
    marginLeft: "auto",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "2vh",
    paddingRight: "2vh",
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
    ["@media (max-width: 699px)"]: {
      width: "100px",
    },
  },
  navLinkDiv: {
    display: "flex",
    ["@media (max-width: 699px)"]: {
      display: "none",
    },
    marginRight: "auto",
  },

  buttonNav: {
    color: "white",
    marginRight: "1em",
  },
  buttonNavHighlight: {
    marginRight: "1em",
    color: "white",
    border: "solid",
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "white",
  },
  mobilLinkDiv: {
    display: "flex",
    ["@media (min-width: 700px)"]: {
      display: "none",
    },
    marginRight: "auto",
  },
  homeIcon: {
    width: 40,
    height: 40,
    cursor: "pointer",
    color: "white",
    marginRight: "1vh",
    textAlign: "center",
  },
  imageBall: {
    cursor: "pointer",
    width: 40,
    height: 40,
  },
}));

const ApplicationBar = (props) => {
  const classes = useStyles();

  let buttonMy = props.showMyPokemons
    ? classes.buttonNavHighlight
    : classes.buttonNav;
  let buttonAll = props.showMyPokemons
    ? classes.buttonNav
    : classes.buttonNavHighlight;

  if (props.pokemonView) {
    buttonAll = classes.buttonNav;
    buttonMy = classes.buttonNav;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div className={classes.mobilLinkDiv}>
            <Button>
              <HomeIcon
                onClick={() => props.history.push(`/`)}
                className={classes.homeIcon}
              />
            </Button>

            <Button>
              <img
                className={classes.imageBall}
                src={closedBall}
                onClick={() => props.history.push(`/mypokemons`)}
                alt={props.name}
              />
            </Button>
          </div>
          <div className={classes.navLinkDiv}>
            <Button
              className={buttonAll}
              onClick={() => props.history.push(`/`)}
            >
              ALL POKEMONS
            </Button>
            <Button
              className={buttonMy}
              onClick={() => props.history.push(`/mypokemons`)}
            >
              MY POKEMONS
            </Button>
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
    </>
  );
};

export default ApplicationBar;
