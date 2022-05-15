import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TrendingCoins } from "../../config/api";
import headerContext from "../../contexts/headerContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => ({
  Carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  CarouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();
  const { currency, symbol } = useContext(headerContext);


  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coins/${coin?.id}`} className={classes.CarouselItem}>
        <img src={coin.image} height={80} style={{ marginBottom: 10 }}  alt={coin.name}/>
        <span>
          {coin.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin.price_change_percentage_24h.toFixed(2)}%
          </span>
        </span>
        <span style={{fontSize : 22, fontWeight : 500}}>
            {symbol}{numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchTrendingCoins = async () => {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(() => data);
    };
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    612: {
      items: 4,
    },
  };

  return (
    <div className={classes.Carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        animationDuration={1500}
        autoPlayInterval={1000}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
