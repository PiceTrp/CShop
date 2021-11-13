import React, { useEffect } from "react";
import TabsController from "../components/HistoryBase/TabsController";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import TopProfile from "../components/TopProfile";
import Search from "~/common/components/NavbarBase/ContentBase/Search";
import orders from "../components/HistoryBase/fakeOrder";

const HistoryPage = () => {
  const classes = useStyles();
  useEffect(() => {
    document.body.style.backgroundColor = "#f3f4f5";
    return () => (document.body.style.backgroundColor = "white");
  }, []);

  return (
    <>
      <TopProfile />
      <Box className={classes.body}>
        <Box className={classes.container}>
          <Box className={classes.header}>
            <Box
              style={{
                margin: "26px 70px 0px 70px",
              }}
            >
              <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
                Order History
              </Typography>
              <Box sx={{ padding: "38px 0px 26px 0px" }}>
                <Search
                  showButton={false}
                  placeholder="Search for order number , product name"
                />
              </Box>
            </Box>
          </Box>
          <TabsController orders={orders} />
        </Box>
      </Box>
    </>
  );
};
const useStyles = makeStyles({
  body: {
    display: "flex",
    justifyContent: "center",
    padding: "72px 0px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "90%",
  },
  header: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: "20px 20px 0px 0px",
  },
});

export default HistoryPage;
