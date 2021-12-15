import React, { useState, useEffect } from "react";
import ProductDetails from "../sections/ProductDetails";
import ShopDetails from "../sections/ShopDetails";
import ProductDescription from "../sections/ProductDescription";
import ProductRating from "../sections/ProductRating";
import ProductSuggestion from "../sections/ProductSuggestion";
import fakeProducts from "~/common/faker/fakeProducts";
import { Box } from "@mui/material";
import ReviewsFromCustomer from "../sections/ReviewsFromCustomer";
import { useParams } from "react-router";
import axios from "axios";

const ProductPage = (props) => {
  const [productsSuggestion, setProductsSuggestion] = useState(fakeProducts);
  const [productDetails, setProductDetails] = useState({ title: "" });
  const [commentPictures, setCommentPictures] = useState();
  const [shopDetail, setShopDetails] = useState({});
  const [comments, setComments] = useState({});
  const [shopId, setShopId] = useState(0);
  const localhost = "http://localhost:8080/";
  const { id } = useParams();

  const onFavourite = (index) => {
    setProductsSuggestion((products) => {
      const target = products[index];
      target.favourite = !target.favourite;

      return [...products];
    });
  };

  const copyLink = () => {
    axios.get(`${localhost}product/shortlink/${id}`).then(({ data }) => {
      if (data.success) {
        navigator.clipboard.writeText(data.link);
        console.log(data.link);
      } else alert("Fail to fetch data :(");
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Product
    axios.get(`${localhost}product/${id}`).then(({ data }) => {
      if (data.success) {
        setProductDetails(data.product_details.product);
        setProductsSuggestion(data.product_details.product.suggest_products);
      } else alert("Fail to fetch data :(");
    });
    // Shop
    axios.get(`${localhost}product/${id}/shop`).then(({ data }) => {
      if (data.success) {
        setProductDetails(data.product_details.product);
        setShopId(data.shop_details.id);
        setShopDetails(data.shop_details);
      } else alert("Fail to fetch data :(");
    });
    // Comments
    axios.get(`${localhost}product/${id}/comments`).then(({ data }) => {
      if (data.success) {
        setCommentList(data.comments);
      } else alert("Fail to fetch data :(");
    });
    // Get comment pictures
    axios.get(`${localhost}product/1/comments/pictures`).then(({ data }) => {
      if (data.success) {
        setCommentPictures(data.pictures);
      } else alert("Fail to fetch data :(");
    });
  }, [id]);
  console.log(productDetails);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box maxWidth="1200px">
        <ReviewsFromCustomer />
        <ProductDetails productDetails={productDetails} copyLink={copyLink} />
        <ShopDetails shopId={shopId} />
        <ProductSuggestion
          suggestionItems={productsSuggestion}
          onFavourite={onFavourite}
        />
        <ProductDescription />
        <ProductRating />
      </Box>
    </Box>
  );
};

export default ProductPage;
