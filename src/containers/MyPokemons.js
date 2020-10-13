import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";
import CardItem from "../components/CardItem";
import ApplicationBar from "../components/ApplicationBar";
// import { IoIosAddCircleOutline, IoIosAddCircle } from "react-icons/io";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
}));

const MyPokemons = (props) => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();
  const [filter, setFilter] = useState("");
  const { history } = props;
  const [showMyPokemons, setShowMyPokemons] = useState(false);
  const [myPokemons, setMyPokemons] = useState([]);
  const getArray = JSON.parse(localStorage.getItem("myPokemons") || "0");

  useEffect(() => {
    if (getArray !== 0) {
      setMyPokemons([...getArray]);
    }
  }, []);

  for (var i = 0; i < getArray.length; i++) {
    let x = getArray[i];
    myPokemons[i] = JSON.parse(localStorage.getItem("pokeItem" + [x]) || "");
  }

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleMyPokemonsView = () => {
    setShowMyPokemons(!showMyPokemons);
  };

  const getCardItem = (pokemonId, history) => {
    // console.log(pokemonData[`${pokemonId}`]);
    const { id, name, sprite } = myPokemons[pokemonId];
    return (
      <>
        <CardItem
          pokemonId={pokemonId}
          id={id}
          name={name}
          sprite={sprite}
          history={history}
          showMyPokemons={true}
        />
      </>
    );
  };
  return (
    <>
      {
        <ApplicationBar
          handleSearchChange={handleSearchChange}
          onClickMyPokemons={handleMyPokemonsView}
          showMyPokemons={true}
        />
      }
      {myPokemons ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(myPokemons).map(
            (pokemonId) =>
              myPokemons[pokemonId].name.includes(filter) &&
              getCardItem(pokemonId, history)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default MyPokemons;
