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
import React, { useContext, useState, useEffect } from "react";
import { CoinList } from "../config/api";
import headerContext from "../contexts/headerContext";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const useStyles = makeStyles(()=>({
    row : {
        backgroundColor : "#16171a",
        cursor : "pointer",
        "&:hover" : {
            backgroundColor : "#131111"
        },
        fontFamily : "Montserrat",
    }
}))

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { currency, symbol } = useContext(headerContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    console.log(data);
    setCoins(() => data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter((coin)=>{
        coin.name.toLowerCase().includes(search) || 
        coin.symbol.toLowerCase().includes(search) 
    })
  }

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
            setSearch((prev) => e.target.value);
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
                        align={ head === "Coin" ? "" : "right"}
                      >
                        {head}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>

                  {
                      handleSearch().map((row) =>{


                        return (

                            <TableRow 
                            onClick={()=>{navigate(`/coins/${row.id}`)}}
                            className={classes.row}
                            key={row.name}
                            >

                            </TableRow>




                        )



                      })
                  }
                
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
