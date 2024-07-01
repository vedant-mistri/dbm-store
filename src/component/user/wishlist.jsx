import React from 'react';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import { useSelector, useDispatch } from 'react-redux';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { removeFromWishlist } from '../../redux/wishlist/wishlistSlice';
import { CURRENCIES_SYMBOL } from '../currency/currency';

const Wishlist = ({ onClose }) => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const {currency , exchangeRates} = useSelector((state) => state.currency);
    const currencySymbol = CURRENCIES_SYMBOL[currency]
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (index) => {
        dispatch(removeFromWishlist(index));
    };

    return (
        <Box sx={{ width: { xs: 250, md: 350 }, p: 3 }}>
            <Grid container alignItems="center" justifyContent="space-between" mb={3}>
                <NavigateBeforeRoundedIcon
                    fontSize="large"
                    cursor="pointer"
                    onClick={onClose}
                />
                <Typography fontWeight={600}>Wishlist</Typography>
            </Grid>
            {wishlistItems?.map((item, index) => (
                <>
                    <Grid
                        key={index}
                        container
                        sx={{ borderRadius: '15px' }}
                        p={2}
                        my={5}
                        boxShadow="0 0 10px #eee"
                        justifyContent="space-between"
                    >
                        <Grid item xs={12} md={3} sx={{ borderRadius: '15px', backgroundColor: '#FBF5EC', textAlign: 'center' }}>
                            <img width={60} height={60} src={item.product?.image} alt="Product" />
                        </Grid>
                        <Grid item xs={12} md={8} container direction="column" justifyContent="space-between">
                            <Typography>{item.product?.name}</Typography>
                            <Grid container justifyContent='space-between' alignItems='center'>
                                <Grid container item xs={8} justifyContent='space-between'>
                                    <Typography sx={{ color: '#818181de' }}>Price</Typography>
                                    <Typography noWrap>
                                        {currencySymbol}{(item.product?.rates.reduce((min, rate) => Math.min(min, rate.price), Infinity) * exchangeRates).toFixed(2)}-{currencySymbol}{(item.product?.rates.reduce((max, rate) => Math.max(max, rate.price), -Infinity) * exchangeRates).toFixed(2)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} textAlign='end'>
                                    <Checkbox
                                        onChange={() => handleRemoveFromWishlist(index)}
                                        icon={<FavoriteBorder />}
                                        checkedIcon={<Favorite />}
                                        checked={item.isInWishlist}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>

            ))}
        </Box>
    );
}

export default Wishlist;
