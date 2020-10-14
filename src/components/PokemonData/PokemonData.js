import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import Colors from "../../constants/Colors";
import { Button } from "@material-ui/core";
import openBall from "../../Assets/pokeball2.png";
import closedBall from "../../Assets/pokeball1.png";
import { makeStyles } from "@material-ui/core/styles";

import { toFirstCharUppercase } from "../../Utils/constants";

const useStyles = makeStyles((theme) => ({
  catchButton: {
    width: "100%",
    border: "solid",
    borderWidth: 2,
    borderColor: "black",
    boxShadow: 5,
    marginBottom: 20,
  },
  ballImage: { width: 80, height: 80 },
}));

export default function PokemonData(props) {
  const classes = useStyles();

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={12} md={6} style={{ textAlign: "center" }}>
          <Card style={{ marginBottom: "3vh" }}>
            <Card.Header>
              <h5>{toFirstCharUppercase(props.name)}</h5>
              <img src={props.sprite} alt={props.name} />
            </Card.Header>
            <Card.Body>
              <h5>Abilities</h5>
              {props.abilities.map((ability, key) => (
                <div key={key}>
                  <span>{ability.ability.name}</span>
                </div>
              ))}
              <h5 style={{ marginTop: "2vh" }}>Types</h5>
              {props.types.map((type, key) => (
                <div key={key}>
                  <span
                    className="badge badge-pill mr-1"
                    style={{
                      backgroundColor: `#${Colors[type.type.name]}`,
                      color: "white",
                    }}
                  >
                    {type.type.name}
                  </span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={6} style={{ textAlign: "center" }}>
          <Card>
            <Card.Body>
              <h4>Base Stats</h4>
              {props.stats.map((stat, key) => (
                <div key={key} style={{ marginBottom: "1vh" }}>
                  <strong>{stat.stat.name}</strong>
                  <ProgressBar
                    now={stat.base_stat}
                    max={150}
                    label={stat.base_stat}
                  />
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div xs={12} md={9} style={{ marginTop: 30, textAlign: "center" }}>
        <Button className={classes.catchButton}>
          {
            <img
              className={classes.ballImage}
              src={props.isMyPokemon ? closedBall : openBall}
              onClick={props.onAddClick}
              alt={props.name}
            />
          }
        </Button>

        <div>{props.isMyPokemon ? "RELEASE YOUR POKEMON" : "CATCH IT!"} </div>
      </div>
    </Container>
  );
}
