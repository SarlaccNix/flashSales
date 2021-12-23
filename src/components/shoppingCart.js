import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import storeProducts from '../assets/products.json';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { AddProductQuantity, SubstractProductQuantity } from '../actions/cartActions';

import Product from './product'

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ShoppingCart() {
  const classes = useStyles();
  const {products, sub_total, discount, total} = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch({type: 'ADD_PRODUCT_TO_CART', payload: product});
  }

  const deleteFromCart = (product) => {
    dispatch({type: 'DELETE_PRODUCT_FROM_CART', payload: product.productId});
  }

  const handleAddProductQuantity = (product) => {
    dispatch({type: 'ADD_PRODUCT_QUANTITY', payload: product.productId})    
  }

  const handleSubstractProductQuantity = (product) => {
    dispatch({type: 'SUBSTRACT_PRODUCT_QUANTITY', payload: product.productId})
  }

  
  
  console.log("products", products);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Flash Sales!
          </Typography>
        </Toolbar>
      </AppBar>
     
      <main className={classes.content}>
        <Toolbar />
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={5}
        >
            {storeProducts.products.map(storeProduct => (
             <Grid item xs><Product product={storeProduct} handleAddProduct={addToCart}/></Grid>
            ))}
        </Grid>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='right'
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {products?.length > 0 ? products.map((product, index) => (
              <ListItem button key={index}>
                <ListItemIcon><LocalMallOutlinedIcon/> </ListItemIcon>
                <ListItemText primary={product.productName} />
                <IconButton onClick={()=>handleAddProductQuantity(product)}><AddCircleOutlineIcon/> </IconButton>
                <Typography >{product.quantity}</Typography>

                <IconButton onClick={()=>handleSubstractProductQuantity(product)}><RemoveCircleOutlineIcon/> </IconButton>


                <IconButton onClick={()=>deleteFromCart(product)}><HighlightOffOutlinedIcon/> </IconButton>

              </ListItem>
            ))
            :
            <ListItem button>
            <Typography variant="s1">Your Shopping Cart Is Empty!</Typography>
            </ListItem>
            }
          </List>
          <Divider />
          <List>
            <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="SubTotal = " secondary={`$${sub_total}`}/>
              </ListItem>
            <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Discount = " secondary={`$${discount}`}/>
              </ListItem>
            <ListItem button>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="Total = " secondary={`$${total}`}/>
              </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}