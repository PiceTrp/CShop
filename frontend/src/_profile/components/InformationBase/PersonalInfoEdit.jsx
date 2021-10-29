import { Grid, Typography, TextField, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {
  years,
  months,
  days,
  genders,
} from "../../../common/constants/register";

const PersonalInfoEdit = ({ editInfo, seteditInfo = () => {} }) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.container}>
        <Typography
          sx={{ fontSize: "24px", fontWeight: "600", marginBottom: "50px" }}
        >
          Personal Information
        </Typography>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Name</Typography>
          </Grid>
          <Box
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="firstname"
              variant="outlined"
              placeholder="Firstname"
              sx={{ width: "48%" }}
              value={editInfo.first_name}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  first_name: e.target.value,
                });
              }}
            />
            <TextField
              id="lastname"
              variant="outlined"
              placeholder="Lastname"
              sx={{ width: "48%" }}
              value={editInfo.last_name}
              onChange={(e) => {
                seteditInfo({
                  ...editInfo,
                  last_name: e.target.value,
                });
              }}
            />
          </Box>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Gender</Typography>
          </Grid>
          <TextField
            id="gender"
            variant="outlined"
            select
            sx={{ width: "13.5%" }}
            value={editInfo.gender}
            onChange={(e) => {
              seteditInfo({ ...editInfo, gender: e.target.value });
            }}
          >
            {genders.map((gender) => (
              <MenuItem key={gender.id} value={gender.value}>
                {gender.label}
              </MenuItem>
            ))}
            kuyjiw
          </TextField>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={4}>
            <Typography sx={infoTitle}>Birthdate</Typography>
          </Grid>
          <Box className={classes.birthdateSelect}>
            <Box className={classes.textFieldBox} style={dateTextField}>
              <TextField
                id="day"
                variant="outlined"
                sx={textField}
                select
                value={editInfo.day}
                onChange={(e) => {
                  seteditInfo({ ...editInfo, day: e.target.value });
                }}
              >
                {days.map((day) => (
                  <MenuItem key={day} value={day}>
                    {day}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.textFieldBox} style={dateTextField}>
              <TextField
                id="month"
                variant="outlined"
                sx={textField}
                select
                value={editInfo.month}
                onChange={(e) => {
                  seteditInfo({ ...editInfo, month: e.target.value });
                }}
              >
                {months.map((month) => (
                  <MenuItem key={month.id} value={month.id}>
                    {month.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box className={classes.textFieldBox} style={dateTextField}>
              <TextField
                id="year"
                variant="outlined"
                sx={textField}
                select
                value={editInfo.year}
                onChange={(e) => {
                  seteditInfo({ ...editInfo, year: e.target.value });
                }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

const useStyles = makeStyles({
  container: {
    fontSize: "24px",
    fontWeight: "500",
  },
  grid: {
    marginBottom: "45px",
  },
  birthdateSelect: {
    display: "flex",
    width: "60%",
  },
});
const infoTitle = {
  fontSize: "24px",
  fontWeight: "500",
  color: "#FD6637",
};
const textField = {
  borderRadius: "10px",
  width: "90%",
};
const dateTextField = {
  width: "25%",
};
export default PersonalInfoEdit;