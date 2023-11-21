import { React } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Spinner } from 'react-bootstrap'
import Rating from '../component/Rating'

import { useGetProductDetailsQuery } from '../slices/productApiSlice'
import Message from '../component/Message'
const ProductScree = () => {
    const {id:productId}=useParams();
    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
    return (

        <>
        <Link className='btn btn-light my-3' to='/'>Go back</Link>
            {isLoading ? (<Spinner/>) : error ? (<Message variant='danger'>{error?.data.message || error.error}</Message>) : (<>
                <Row>
                    <Col md={5}>
                        <Image src={product.image} fluid />
                    </Col>
                    <Col md={4}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: ${product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col> Price: </Col>
                                        <Col><strong>${product.price}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col> Status: </Col>
                                        <Col><strong>{product.countInStock > 0 ? "In stock" : " Out of stocks"}</strong></Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button className='btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row></>)}

        </>
    )
}

export default ProductScree