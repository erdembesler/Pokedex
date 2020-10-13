import React, { useState, useEffect } from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import CardItem from "../components/CardItem";
import ApplicationBar from "../components/ApplicationBar";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const [pokemonData, setPokemonData] = useState();
  const [filter, setFilter] = useState("");
  const { history } = props;
  const [myPokemons, setMyPokemons] = useState([]);
  const getArray = JSON.parse(localStorage.getItem("myPokemons") || "0");
  const [showMyPokemons, setShowMyPokemons] = useState(false);

  useEffect(() => {
    if (getArray !== 0) {
      setMyPokemons([...getArray]);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=200`) // 200 pokemons limitation is set
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1, // ids starts from 1
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const addToMyPokes = (props) => {
    let array = myPokemons;
    let addArray = true;
    array.map((item, key) => {
      if (item === props.pokemonId) {
        array.splice(key, 1);
        addArray = false;
      }
    });
    if (addArray) {
      array.push(props.pokemonId);
    }
    setMyPokemons([...array]);

    localStorage.setItem("myPokemons", JSON.stringify(myPokemons));

    var storage = localStorage.getItem("pokeItem" + props.pokemonId || "0");

    if (storage == null) {
      localStorage.setItem(
        "pokeItem" + props.pokemonId,
        JSON.stringify(props.pokemonData[props.pokemonId])
      );
    } else {
      localStorage.removeItem("pokeItem" + props.pokemonId);
    }
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleMyPokemonsView = () => {
    setShowMyPokemons(!showMyPokemons);
  };

  const getCardItem = (pokemonId, history) => {
    // console.log(pokemonData[`${pokemonId}`]);
    const { id, name, sprite, types } = pokemonData[pokemonId];
    return (
      <>
        <CardItem
          pokemonId={pokemonId}
          id={id}
          name={name}
          types={types}
          sprite={sprite}
          history={history}
          onAddClick={() => addToMyPokes({ pokemonData, pokemonId })}
          isMyPokemon={myPokemons.includes(pokemonId)}
          showMyPokemons={false}
        />

        {/* {myPokemons.includes(pokemonId) ? (
          <img
            src={closedBall}
            onClick={() => addToMyPokes({ pokemonData, pokemonId })}
            width={20}
            height={20}
          />
        ) : (
          <img
            src={openBall}
            onClick={() => addToMyPokes({ pokemonData, pokemonId })}
            width={20}
            height={20}
          />
        )} */}
        {/* {myPokemons.includes(pokemonId) ? (
          <IoIosAddCircle
            onClick={() => addToMyPokes({ pokemonData, pokemonId })}
          />
        ) : (
          <IoIosAddCircleOutline
            onClick={() => addToMyPokes({ pokemonData, pokemonId })}
          />
        )} */}
      </>
    );
  };
  return (
    <>
      {
        <ApplicationBar
          handleSearchChange={handleSearchChange}
          onClickMyPokemons={handleMyPokemonsView}
          showMyPokemons={false}
        />
      }
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getCardItem(pokemonId, history)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
