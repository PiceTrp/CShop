import Card from "@mui/material/Card";
import ProductMedia from "./ProductCardBase/ProductMedia";
import ProductContent from "./ProductCardBase/ProductContent";
import { noop } from "../utils";
import { useHistory } from "react-router";

const cardStyle = {
  width: "100%",
  padding: "8px",
  margin: "0 auto",

  borderRadius: "15px",
  border: "none",
  transition: "all ease 0.125s",

  "&:hover": {
    transform: "scale(1.02)",
  },
};

const productTemplate = {
  title: "fake product",
  image: "https://via.placeholder.com/410x360",
  price: 0,
  favourite: false,
};

const ProductCard = (props) => {
  const router = useHistory();
  const {
    product = productTemplate,
    to = "/product/1",
    onFavourite = noop,
    status = undefined,
    addToCart = false,
  } = props;
  const handleClick = () => {
    router.push(`/product/${product.id}`);
  };
  return (
    <Card variant="outlined" sx={cardStyle} onClick={handleClick}>
      <ProductMedia
        image={
          product.product_picture?.length > 0
            ? product.product_picture[0].path
            : null
        }
        title={product.title}
      />
      <ProductContent
        product={product}
        status={status}
        statusProps={props}
        addToCart={addToCart}
        onFavourite={onFavourite}
      />
    </Card>
  );
};

export default ProductCard;
