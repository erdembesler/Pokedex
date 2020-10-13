import React, { useState, useEffect } from "react";
import { Typography, CircularProgress } from "@material-ui/core";
import axios from "axios";
import PokemonData from "../components/PokemonData";
import ApplicationBar from "../components/ApplicationBar";

const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;

  const [pokemon, setPokemon] = useState(undefined);

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
      id,
      name,
      species,
      height,
      weight,
      types,
      sprites,
      abilities,
      stats,
    } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <ApplicationBar pokemonView={true} />

        <PokemonData
          name={name}
          sprite={front_default}
          abilities={abilities}
          stats={stats}
          types={types}
          // isMyPokemon={checkIfMyPoke}
          // onAddClick={}
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
