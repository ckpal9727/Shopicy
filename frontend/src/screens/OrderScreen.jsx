import React, { useEffect } from 'react'
import { Image, Card, Button, Row, Col, ListGroup } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { useGetOrderByIdQuery, usePayOrderMutation, useGetPayPalClientIdQuery ,useDeliverOrderMutation} from '../slices/orderApiSlice'
import Loader from '../component/Loader'
import Message from '../component/Message'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, isLoading, refetch, error } = useGetOrderByIdQuery(orderId)

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const[deliverOrder,{isLoading:loadingDeliver}]=useDeliverOrderMutation();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { data: paypal, isLoading: loadinPayPal, error: errorPayPal } = useGetPayPalClientIdQuery();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!errorPayPal && !loadinPayPal && paypal.clientId) {
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'USD'
                    }
                });
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
                if (order && !order.isPaid) {
                    if (!window.paypal) {
                        loadPayPalScript();
                    }
                }
            }
        }
    }, [order, paypal, paypalDispatch, loadinPayPal, errorPayPal])

    function onApprove(data,action) {
        return action.order.capture().then(async function (details){
            try {
                await payOrder({orderId,details});
                refetch();
                toast.success('PaymentSuccesFull')

            } catch (error) {
                toast.error(error?.data?.message)
            }
        })
     }
    async function onApproveTest() { 
        await payOrder({orderId,details:{payer:{}}});
        refetch();
        toast.success('PaymentSuccesFull')

    }
    function onError() { 
        toast.error(error.message)
    }
    function createOrder(data,action) { 
        return action.order.create({
            purchase_unit:[
                {
                    amount:{
                        value:order.totalPrice
                    }
                }
            ]
        }).then((orderId)=>{
            return orderId
        })
    }

    const deliverOrderHandler =async ()=>{
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Deliverd succesfully')
        } catch (error) {
            toast.error(error?.data?.message)
        }
    }

    return isLoading ? <Loader /> : error ? <Message variant='danger' /> : (
        <>
            <h1>Orders : {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping :</h2>
                            <p>
                                <strong>Name :</strong>{order.user.name}
                            </p>
                            <p>
                                <strong>Email :</strong>{order.user.email}
                            </p>
                            <p>
                                <strong>Address :</strong>{order.shippingAddress.address}
                                {order.shippingAddress.city} {' '}
                                {order.shippingAddress.postalCode}{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (<Message variant='success'>Delivered at {order.deliverAt}</Message>)
                                : (<Message variant='danger'>Not delivered</Message>)}

                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method:</h2>
                            <p>
                                <strong>Method :</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (<Message variant='success'>Paid On {order.paidAt}</Message>)
                                : (<Message variant='danger'>Not Paid</Message>)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} X ${item.price} : ${item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Item Price</Col>
                                    <Col>{order.itemsPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>{order.shippingPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Tax </Col>
                                    <Col>{order.taxPrice}</Col>
                                </Row>
                                <Row>
                                    <Col>Total </Col>
                                    <Col>{order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid &&
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {isPending ? <Loader />
                                        : (
                                            <div>
                                                <Button onClick={onApproveTest} style={{ marginBottom: '10px' }}>Test Pay buttons</Button>
                                                <div><PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError}></PayPalButtons></div>
                                            </div>
                                        )}
                                </ListGroup.Item>}
                            {loadingDeliver && <Loader/> }
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn-block' onClick={deliverOrderHandler}>Mark as Deliverd</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default OrderScreen