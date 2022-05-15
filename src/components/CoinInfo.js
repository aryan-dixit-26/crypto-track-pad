import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import headerContext from "../contexts/headerContext";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      widht: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));
const CoinInfo = () => {
  const { id } = useParams();
  const [days, setDays] = useState(1);
  const [historicData, setHistoricData] = useState([]);

  const { currency } = useContext(headerContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(HistoricalChart(id, days, currency));
      console.log(data.prices);
      setHistoricData(data.prices);
    };
    fetchData();
    // eslint-disable-next-line
  }, [days]);

  const darkTheme = createTheme(() => ({
    primary: {
      main: {
        backgroundColor: "#fff",
      },
    },
    type: "dark",
  }));

  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{
              color: "gold",
            }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 0
                      ? `${date.getHours() - 12} : ${date.getMinutes()} AM`
                      : `${date.getHours()} : ${date.getMinutes()}PM`;

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (past ${days} days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                width: "100%",
                marginTop: 20,
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {
                    setDays(day.value);
                  }}
                  selected={days === day.value}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
