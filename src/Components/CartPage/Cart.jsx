/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import CartProduct from './CartProduct/CartProduct';
import Product from '../SignleProduct/Product';

const Cart = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const product = useLoaderData();
    return (
        <div className='cart pt-5 mt-5'>
            <div className="container">
                <div className="cart-section w-100 pt-5">
                    <CartProduct product={product}></CartProduct>
                </div>
                <div className="related">
                    <h3 className='py-4 line'>Related Products</h3>
                    <div className="row row-cols-1 row-cols-lg-3 g-4 ">
                        {
                            // products.slice(0, 12).map(product => 
                            //      <Product key={product.id}
                            //       product={product}></Product>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;