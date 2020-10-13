import React from "react";
import Pokedex from "./containers/Pokedex/Pokedex";
import MyPokemons from "./containers/MyPokemons/MyPokemons";
import Pokemon from "./containers/Pokemon/Pokemon";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
    <Route path="/mypokemons" component={MyPokemons} />
    <Route
      exact
      path="/:pokemonId"
      render={(props) => <Pokemon {...props} />}
    />
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
  </Switch>
);

export default App;
