import React, { useState, useEffect } from "react";
import { Typography, CircularProgress } from "@material-ui/core";
import axios from "axios";
import PokemonData from "../../components/PokemonData/PokemonData";
import ApplicationBar from "../../components/ApplicationBar/ApplicationBar";

const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const { history } = props;

  const [pokemon, setPokemon] = useState(undefined);

  const [myPokemons, setMyPokemons] = useState([]);

  const getArray = JSON.parse(localStorage.getItem("myPokemons") || "0");

  const [pokemonData, setPokemonData] = useState();

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
        JSON.stringify(pokemonData[props.pokemonId])
      );
    } else {
      localStorage.removeItem("pokeItem" + props.pokemonId);
    }
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const {
      name,
      // id,
      // species,
      // height,
      // weight,
      types,
      sprites,
      abilities,
      stats,
    } = pokemon;
    const { front_default } = sprites;
    return (
      <>
        <ApplicationBar pokemonView={true} history={history} />

        <PokemonData
          name={name}
          sprite={front_default}
          abilities={abilities}
          stats={stats}
          types={types}
          isMyPokemon={myPokemons.includes(pokemonId)}
          onAddClick={() => addToMyPokes({ pokemonId })}
        />
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon not found</Typography>}
    </>
  );
};

export default Pokemon;
