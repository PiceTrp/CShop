import { FavoriteRounded as FavoriteRoundedIcon, FavoriteBorderRounded as FavoriteBorderRoundedIcon } from "@mui/icons-material";
import { CardContent, Typography, IconButton, Box, CardActions } from "@mui/material";

const contentStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "space-between",
  padding: '15px 5px 10px 5px',
};

const actionStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 0 0 5px",
};

const titleStyle = {
  flex: 1,
  height: 48,

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2, /* number of lines to show */
  WebkitBoxOrient: 'vertical',
};

const ProductContent = ({
  product,
  onFavourite
}) => {
  return (
    <>
      <CardContent
        sx={contentStyle}>
        <Typography gutterBottom fontWeight="bold" component="span" sx={titleStyle}>{product.title}</Typography>
        <Typography gutterBottom fontWeight="bold" component="span" sx={{ marginLeft: 2 }}>{product.price} B.</Typography>
      </CardContent >

      <CardActions sx={actionStyle}>
        <Typography variant="caption" fontSize=".65rem" color="#A0A3BD">
          {product.status}
        </Typography>

        <IconButton
          onClick={(e) => onFavourite(e, product.id)}
          size="small"
          sx={{ fontWeight: "bold" }}
        >
          {product.favourite
            ? <FavoriteRoundedIcon sx={{ color: "#FD6637" }} fontSize="inherit" />
            : <FavoriteBorderRoundedIcon sx={{ color: "#323232" }} fontSize="inherit" />
          }
        </IconButton>
      </CardActions>
    </>
  );
};

export default ProductContent;
