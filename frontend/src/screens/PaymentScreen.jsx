import React from 'react'
import { useState ,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import{Form,Button,Col} from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import CheckoutSteps from '../component/CheckoutSteps'
import {useSelector,useDispatch} from 'react-redux'
import { savePaymentMethod } from '../slices/cartSlice'
const PaymentScreen = () => {
    const [paymentMethod,setPaymentMethod]=useState('PayPal')
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const cart=useSelector((state)=>state.cart);
    const {shippingAddress}=cart

    const submitHandler =(e)=>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }

    useEffect(()=>{
        if(!shippingAddress){
            navigate('/shipping')
        }
    },[shippingAddress,navigate])
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group >
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check
                type='radio'
                label='PayPal or Credit card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen