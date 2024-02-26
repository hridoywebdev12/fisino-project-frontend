import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { WebController } from '../../ParentContext/Context';
import { useQuery } from '@tanstack/react-query';

const Orders = () => {


    const { userInfo } = useContext(WebController)

    // const [orders,setOrders]= useState([])
    // useEffect(()=>{
    //     fetch(`http://localhost:3000/orders?email=${userInfo.email}`)
    //     .then(res=>res.json())
    //     .then(data => setOrders(data))
    // },[userInfo?.email])

    const { data: orders = [], refetch } = useQuery({
        queryKey: ["orders", userInfo?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:3000/orders?email=${userInfo.email}`)
            const data = await res.json()
            return data
        }
    })

    const handleDeleteOrder = (order) => {
        const agree = window.confirm(`are you want to Cancel ${order.productName}`)
        if (agree) {
            fetch(`http://localhost:3000/orders/${order._id}`,
                { method: "DELETE" })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success(`Your ${order.productName}is Deleted Successfully`)
                        refetch()
                    }
                })
        }
    }


    return (
        <div className='my-5 py-5 container'>
            <h1>Your Placed Orders {orders.length}</h1>

            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Serial</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Price</th>
                        <th scope="col">Number</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        orders.map((order, i) =>
                            <tr key={order._id}>
                                <th scope="row">{i + 1}</th>
                                <td>{order.customer}</td>
                                <td>{order.email}</td>
                                <td>{order.price}</td>
                                <td>{order.phone}</td>
                                <td>
                                    <button onClick={() => handleDeleteOrder(order)} className='btn btn-sm btn-outline-danger'>Delete</button>
                                </td>
                            </tr>)
                    }

                </tbody>
            </table>

        </div>
    );
};

export default Orders;