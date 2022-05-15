import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles ({
    button: {
      border: "1px solid gold",
      borderRadius: "5px",
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor : "pointer",
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
      
    },
  });



const SelectButton = ({ children, selected, onClick }) => {
 
  
    const styles = {
        backgroundColor: selected ? "gold" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
    }

      const classes = useStyles();
      return (
    <div onClick={onClick} className={classes.button} style={styles}>
      {children}
    </div>
  );
};

export default SelectButton;
