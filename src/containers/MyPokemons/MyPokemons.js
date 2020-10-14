import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardItem from "../../components/CardItem/CardItem";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";

const useStyles = makeStyles((theme) => ({
  pokemonContainer: {
    paddingTop: "2vh",
    paddingLeft: "5vh",
    paddingRight: "5vh",
  },
}));

const MyPokemons = (props) => {
  const classes = useStyles();
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
          history={history}
        />
      }
      {myPokemons ? (
        <Grid container spacing={2} className={classes.pokemonContainer}>
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
