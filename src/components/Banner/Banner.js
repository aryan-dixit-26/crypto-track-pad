import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    background: "url(./banner.jpg)",
  },
  bannerContent: {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    padding: "25",
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
}));

const Banner = (props) => {
  const classes = useStyles(props);
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Track Pad
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get Latest updates on which coin is dominating the markets.
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
