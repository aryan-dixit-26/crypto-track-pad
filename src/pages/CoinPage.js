import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import headerContext from "../contexts/headerContext";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import parse from 'html-react-parser';
import { numberWithCommas } from "../components/Banner/Carousel";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  sideBar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  heading : {
    fontWeight : "bold",
    marginBottom : 20,
    fontFamily : "Montserrat",
    textAlign : "center"
  },
  desc : {
    width : "100%",
    padding : 25,
    textAlign : "justify",
    paddingBottom : 15,
    paddingTop : 0,
    fontFamily : "Montserrat"
  },
  marketData : {
    alignSelf : "start",
    padding : 25,
    paddingTop : 10,
    width : "100%",
    [theme.breakpoints.down("md")] : {
      display : "flex",
      justifyContent : "space-around",
    },
    [theme.breakpoints.down("sm")] : {
      flexDirection : "column",
      alignItems : "center"
    }
    ,
    [theme.breakpoints.down("xs")] : {
      alignItems : "start"
    }
  }
}));

const CoinPage = () => {
  const { id } = useParams();
  const { currency , symbol } = useContext(headerContext);
  const [coin, setCoin] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(SingleCoin(id));
    console.log(data);
    setCoin(data);
  };

  useEffect(() => {
       // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchData();
  });

  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;
  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        <img
          src={coin.image.large}
          alt={coin.name}
          style={{ marginBottom: 20 }}
          height="200"
        />

        <Typography variant="h3" className={classes.heading}>{coin.name}</Typography>
        <Typography className={classes.desc}>{parse(coin.description.en.split(". ")[0])}</Typography>
        <div className={classes.marketData}>
          <span style={{display : "flex"}}>
            <Typography variant="h5" className={classes.heading}>
              Rank: 
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h4" style={{fontFamily : "Montserrat"}}>
              {coin.market_cap_rank}
            </Typography>
          </span>

          <span style={{display : "flex"}}>
            <Typography variant="h5" className={classes.heading}>
              Current Price: 
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h4" style={{fontFamily : "Montserrat"}}>
              {symbol}
              {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
            </Typography>
          </span>

          <span style={{display : "flex"}}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap: 
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h4" style={{fontFamily : "Montserrat"}}>
              {symbol}
              {numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}M
            </Typography>
          </span>

        </div>
      </div>

      <CoinInfo />
    </div>
  );
};

export default CoinPage;
