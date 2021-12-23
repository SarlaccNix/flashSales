import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Milk from "../assets/GenericMilk.jpg";
import Bread from "../assets/GenericBread.jpg";
import Bananas from "../assets/GenericBananas.jpg";
import Apple from "../assets/GenericApple.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    minWidth: 250,
    height: 340,
  },
  media: {
    height: 140,
    paddingTop: "56.25%"
  },
  priceText: {
      flex: 1,
      justifyContent: "flex-end",
  }
});

export default function Product(props) {
  const classes = useStyles();
  const { productName, productId, price, salePrice, description } =
    props.product;
  const cartProducts = useSelector(state => state.cart.products);

    const dispatch = useDispatch();

    const addToCart = (product) => {
      if(cartProducts?.find(item => item.productId === product.productId)){
      dispatch ({type: 'ADD_PRODUCT_QUANTITY', payload: product.productId});
      }
      else{
        dispatch({type: 'ADD_PRODUCT_TO_CART', payload: product});
      }
    }

  const productImage = () => {
    switch (productId) {
      case 1:
        return Milk;
      case 2:
        return Bread;
      case 3:
        return Bananas;
      case 4:
        return Apple;
    }
  };

  const image = productImage();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title={productName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {productName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <div className={classes.priceText}>
          <Typography  variant="body1" color="textPrimary" component="h3">
            {price}
          </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={()=>addToCart(props.product)} size="small" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
