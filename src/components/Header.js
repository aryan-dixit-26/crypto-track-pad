import {
  AppBar,
  Container,
  createTheme,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import headerContext from "../contexts/headerContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency , setCurrency } = useContext(headerContext);
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              CryptoTrackPad{" "}
            </Typography>

            <Select
              style={{ width: 100, height: 40, marginRight: 15 }}
              variant="outlined"
              value={currency}
              onChange={(e) => (setCurrency(e.target.value))}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
