import {
  Container,
  createTheme,
  TableContainer,
  TextField,
  ThemeProvider,
  Typography,
  Paper,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useContext, useState, useEffect } from "react";
import { CoinList } from "../config/api";
import headerContext from "../contexts/headerContext";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousel";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const useStyles = makeStyles(() => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
    fontFamily: "Montserrat",
  },
  pagination : {
    "& .MuiPaginationItem-root": {
        color: "gold",
      },
  }
}));

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = useContext(headerContext);
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const navigate = useNavigate();


  useEffect(() => {
       // eslint-disable-next-line react-hooks/exhaustive-deps
       const fetchData = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
      };
    fetchData();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
    // return coins;
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Currency Prices By Market Cap
        </Typography>
        <TextField
          label="Search For Crypto Currency"
          variant="outlined"
          style={{ width: "100%", marginBottom: 22 }}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => {
                    return (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                    let profit = row.price_change_percentage_24h >= 0;
                  return (
                    <TableRow
                      onClick={() => {
                        navigate(`/coins/${row.id}`);
                      }}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          height="50"
                          alt={row.name}
                          style={{ marginBottom: "10px" }}
                        />

                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{ textTransform: "uppercase", fontSize: 22 }}
                          >
                            {row.symbol}
                          </span>
                          <span style={{color : "darkgray"}}>
                            {row.name}
                          </span>
                        </div>
                      </TableCell>

                       <TableCell
                       align="right"
                       >
                           {symbol}{" "}
                           {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell> 

                        <TableCell align="right">
                            <span
                            style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                              }}
                            >
                                {profit && "+"}
                                {row.price_change_percentage_24h.toFixed(2)}%
                            </span>
                        </TableCell>
                            <TableCell align="right">
                              {row.market_cap.toString().slice(0,-6)}
                            </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
                <Pagination 
                 count={(handleSearch().length / 10).toFixed(0)}
                 style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  classes = {{ul : classes.pagination}}
                  onChange={(_,value) =>{
                      setPage(value)
                      window.scroll({
                          left : 0,
                          top: 450,
                          behaviour : "smooth"
                      })
                  }}
                 />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
