import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import { useGetOrdersQuery } from '../../slices/orderApiSlice'
import Loader from '../../component/Loader'
import Message from '../../component/Message'


const OrderListScreen = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message}</Message> : (
        <Table stripped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>{order.isPaid ? (order.paidAt.substring(0, 10)) : (<FaTimes style={{ color: 'red' }} />)}</td>
                <td>{order.isDelivered ? (order.deliverAt.substring(0, 10)) : (<FaTimes style={{ color: 'red' }} />)}</td>
                <td><LinkContainer to={`/order/${order._id}`}>
                                    <Button className='btn-sm' variant='light'>Details</Button ></LinkContainer></td>
              </tr>
            ))}
        </tbody>
        </Table >
      )}

    </>
  )
}

export default OrderListScreen