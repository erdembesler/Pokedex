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

  //get my pokemons
  useEffect(() => {
    if (getArray !== 0) {
      setMyPokemons([...getArray]);
    }
  }, []);

  //get data of pokemons
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
            (pokemonId, key) =>
              myPokemons[pokemonId].name.includes(filter) && (
                <CardItem
                  key={pokemonId}
                  pokemonId={pokemonId}
                  id={myPokemons[pokemonId].id}
                  name={myPokemons[pokemonId].name}
                  sprite={myPokemons[pokemonId].sprite}
                  history={history}
                  showMyPokemons={true}
                />
              )
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default MyPokemons;
