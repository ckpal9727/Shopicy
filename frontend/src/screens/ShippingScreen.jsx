import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../component/FormContainer'
import {saveShippingAddress} from '../slices/cartSlice'
import CheckoutSteps from '../component/CheckoutSteps'

const ShippingScreen = () => {
    
    //extracting cart from state
    const cart=useSelector((state)=>state.cart)
    const {shippingAddress}=cart;

    const [address, setAddress] = useState(shippingAddress?.address||'');
    const [city, setCity] = useState(shippingAddress?.city||'');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode||'');
    const [country, setCountry] = useState(shippingAddress?.country||'');

    const dispatch=useDispatch();
    const navigate=useNavigate();


    const submitHandler =(e)=>{
        e.preventDefault();
        console.log(address ,":",city,":",postalCode,":",country)
        dispatch(saveShippingAddress({address,city,postalCode,country}))
        navigate('/payment');
    }
    return (
        <FormContainer>
            <h1>Shipping</h1>
            <CheckoutSteps step1 step2/>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address' className='my-2'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control onChange={(e)=>setAddress(e.target.value)} type='text' placeholder='Enter address' value={address}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city' className='my-2'>
                    <Form.Label>City</Form.Label>
                    <Form.Control onChange={(e)=>setCity(e.target.value)} type='text' placeholder='Enter city' value={city}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode' className='my-2'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control onChange={(e)=>setPostalCode(e.target.value)} type='text' placeholder='Enter postalCode' value={postalCode}></Form.Control>
                </Form.Group>
                <Form.Group controlId='country' className='my-2'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control onChange={(e)=>setCountry(e.target.value)} type='text' placeholder='Enter country' value={country}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='mt-3'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen