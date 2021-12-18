import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TopSeller from "./components/TopSeller";
import Card from "@mui/material/Card";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import StarIcon from "@mui/icons-material/Star";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Indicator from "./components/Indicator";
import { Chart } from "./components/TableContent/Chart";

import config from "~/common/constants";
import axios from "axios";
import { useParams } from "react-router-dom";

const SellerDashboard = () => {

const shopid = useParams();

const [productcard, setProduct] = useState();
const [followerscard, setFollowers] = useState();
const [ratingcard, setRating] = useState();
const [salescard, setSales] = useState();

  const getCard = async () =>{
    const pd = await axios.get(`${config.SERVER_URL}/sellerconsole/${shopid.id}/cardToProduct`)
    const fl = await axios.get(`${config.SERVER_URL}/sellerconsole/${shopid.id}/cardToFollows`)
    const rt = await axios.get(`${config.SERVER_URL}/sellerconsole/${shopid.id}/cardToRating`)
    const sl = await axios.get(`${config.SERVER_URL}/sellerconsole/${shopid.id}/cardToSales`)
    console.log(`${pd},${fl},${rt},${sl}`)
    setProduct(pd)
    setFollowers(fl)
    setRating(rt)
    setSales(sl)
  }


  const indicatorData = [
    {
      id: 0,
      value: "34.7",
      name: "Product",
      color: "#FEF3F1",
      fontColor: "#FD8A75",
      icon: ShoppingCartIcon,
    },
    {
      id: 1,
      value: "34.7",
      name: "Followers",
      color: "#FCF6DE",
      fontColor: "#EAC52E",
      icon: PeopleAltIcon,
    },
    {
      id: 2,
      value: "34.7",
      name: "Rating",
      color: "#E1F4F8",
      fontColor: "#42B8D4",
      icon: StarIcon,
    },
    {
      id: 3,
      value: "34.7",
      name: "Sales",
      color: "#E0F8F2",
      fontColor: "#43D5AE",
      icon: MonetizationOnIcon,
    },
  ];
  return (
    <Box>
      <TopSeller />
      <Box
        sx={{
          alignContent: "center",
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {indicatorData.map((indicator) => (
          <Indicator
            value={indicator.value}
            name={indicator.name}
            color={indicator.color}
            fontColor={indicator.fontColor}
            icon={indicator.icon}
            key={indicator.id}
          />
        ))}
      </Box>
      <Chart/>
    </Box>
  );
};

export default SellerDashboard;
