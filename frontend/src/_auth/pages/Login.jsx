import { Box } from "@mui/system";
import React, { Fragment, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CButton from "../../common/components/CButton";
import Avatar from "@mui/material/Avatar";
import GoogleLogo from "../assets/google-icon.png";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useForm, useInput } from "../../common/hooks";

const LoginPage = () => {
  const classes = useStyles();
  const router = useHistory();
  const phone = useInput("");
  const password = useInput("");
  const form = useForm({ phone, password });

  useEffect(() => {
    document.body.style.backgroundColor = "#f3f4f5";
    return () => (document.body.style.backgroundColor = "white");
  }, []);

  return (
    <Fragment>
      <Box className={classes.container}>
        <Box className={classes.bigbox}>
          <Box className={classes.header}>Sign In</Box>
          <Box className={classes.textFieldBox}>
            <TextField
              id="phoneNumber"
              placeholder="Phone Number"
              variant="outlined"
              sx={{ borderRadius: "10px" }}
              fullWidth
              autoComplete="off"
              {...phone}
            />
          </Box>
          <Box className={classes.textFieldBox}>
            <TextField
              id="password"
              placeholder="Password"
              variant="outlined"
              type="password"
              sx={{ borderRadius: "10px" }}
              fullWidth
              autoComplete="off"
              {...password}
            />
          </Box>
          <Box className={classes.button}>
            <CButton
              title="Sign In"
              width="500px"
              height="50px"
              onClick={() => {
                router.push("/home");
              }}
            ></CButton>
          </Box>
          <Box className={classes.text}>Forgot your password?</Box>
          <Box className={classes.divider}>OR</Box>
          <Button
            variant="contained"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              borderBlockColor: "gray",
              color: "black",
              width: "500px",
              marginBottom: "35px",
              padding: "8px",
              textTransform: "capitalize",
            }}
            startIcon={<Avatar src={GoogleLogo} />}
          >
            Sign in With Google
          </Button>
          <Box className={classes.condition2}>
            Does not have any account yet?{"\u00A0"}
            <Link to="/register">
              <span className={classes.textOrange2}>Sign Up</span>
            </Link>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};
const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  bigbox: {
    width: "60%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    display: "flex",
    justifyContent: "center",
    fontSize: "35px",
    fontWeight: 600,
    padding: "7% 0%",
  },
  textFieldBox: {
    backgroundColor: "white",
    borderRadius: "10px",
    [`& fieldset`]: {
      borderRadius: "10px",
    },
    display: "flex",
    justifyContent: "center",
    width: "500px",
    marginBottom: "40px",
  },
  button: {
    marginBottom: "20px",
    marginTop: "15px",
  },
  textOrange2: {
    color: "#FD6637",
  },
  text: {
    color: "#A0A3BD",
    display: "flex",
    justifyContent: "flex-end",
    width: "500px",
  },
  condition2: {
    margin: "20px 0",
  },
  divider: {
    color: "#A0A3BD",
    margin: "40px 0px",
  },
});

export default LoginPage;