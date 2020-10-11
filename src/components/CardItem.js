import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "../Utils/constants";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
}));

const PokemonCard = (props) => {
  const classes = useStyles();

  // console.log(pokemonData[`${pokemonId}`]);

  return (
    <Grid item xs={12} sm={4} key={props.pokemonId}>
      <Card onClick={() => props.history.push(`/${props.pokemonId}`)}>
        <CardMedia
          className={classes.cardMedia}
          image={props.sprite}
          style={{ width: "130px", height: "130px" }}
        ></CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography>{`${props.id}. ${toFirstCharUppercase(
            props.name
          )}`}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
