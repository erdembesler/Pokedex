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
import { toFirstCharUppercase } from "../../Utils/constants";
import openBall from "../../Assets/pokeball2.png";
import closedBall from "../../Assets/pokeball1.png";

const useStyles = makeStyles((theme) => ({
  cardMedia: {
    margin: "auto",
    width: "15vh",
    height: "15vh",
  },
  cardContent: {
    textAlign: "center",

    color: "white",
  },
  addButton: {
    textAlign: "center",
    marginTop: "1em",
    border: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
  grid: {
    marginBottom: "4vh",
  },
  card: { cursor: "pointer" },
  nameTypo: {
    marginBottom: "1em",
    fontSize: 20,
    backgroundColor: "#ffe664db",
    borderRadius: 2,
    color: "white",
  },
  ballImage: {
    width: 40,
    height: 40,
  },
}));

const PokemonCard = (props) => {
  const classes = useStyles();

  return (
    <Grid className={classes.grid} item xs={12} sm={4} key={props.pokemonId}>
      <Card
        className={classes.card}
        onClick={() => props.history.push(`/${props.id}`)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={props.sprite}
        ></CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.nameTypo}>
            {toFirstCharUppercase(props.name)}
          </Typography>
        </CardContent>
      </Card>
      {!props.showMyPokemons ? (
        <div style={{ textAlign: "center" }}>
          <Button className={classes.addButton}>
            {
              <img
                className={classes.ballImage}
                src={props.isMyPokemon ? closedBall : openBall}
                onClick={props.onAddClick}
                alt={props.name}
              />
            }
          </Button>
        </div>
      ) : null}
    </Grid>
  );
};

export default PokemonCard;
