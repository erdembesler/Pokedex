import React from "react";
import Pokedex from "./containers/Pokedex";
import MyPokemons from "./containers/MyPokemons";
import Pokemon from "./containers/Pokemon";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
    <Route
      exact
      path="/:pokemonId"
      render={(props) => <Pokemon {...props} />}
    />
    <Route path="/MyPokemons" />
  </Switch>
);

export default App;
