import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../Utils/constants";
import openBall from "../Assets/pokeball2.png";
import closedBall from "../Assets/pokeball1.png";
import CardItemClasses from "./CardItem.css";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",

    color: "white",
  },
  addButton: {
    textAlign: "center",
    marginTop: "1em",
  },
  grid: {
    marginBottom: "2em",
  },
  card: {},
}));

const PokemonCard = (props) => {
  const classes = useStyles();

  // console.log(pokemonData[`${pokemonId}`]);

  return (
    <Grid className={classes.grid} item xs={12} sm={4} key={props.pokemonId}>
      <Card
        className={"hover"}
        onClick={() => props.history.push(`/${props.id}`)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={props.sprite}
          style={{ width: "130px", height: "130px" }}
        ></CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography
            style={{
              marginBottom: "1em",
              fontSize: 20,
              backgroundColor: "#ffe664db",
              //   border: "solid",
              //   borderWidth: 1,
              //   borderColor: "#2D5A9D",
              borderRadius: 2,
              color: "white",
            }}
          >
            {toFirstCharUppercase(props.name)}
          </Typography>
        </CardContent>
      </Card>
      {!props.showMyPokemons ? (
        <div className={classes.addButton}>
          {
            <img
              src={props.isMyPokemon ? closedBall : openBall}
              onClick={props.onAddClick}
              width={40}
              height={40}
            />
          }
        </div>
      ) : null}
    </Grid>
  );
};

export default PokemonCard;
