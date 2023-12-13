import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../component/Product'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsQuery } from '../slices/productApiSlice'
import ProductCarousel from '../component/ProductCarousel'
import Message from '../component/Message'
import Loader from '../component/Loader'
import Paginate from '../component/Paginate'



const HomeScreen = () => {
  const {pageNumber,keyword}=useParams();
  
  const { data, isLoading, error } = useGetProductsQuery({pageNumber,keyword});
  //console.log(error)
  
  return (
    <>
    {!keyword ?  <ProductCarousel/>: <Link to='/' className='btn btn-light mb-4'>Go Back</Link>}
      {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message}</Message>) : (<>
      
      <h1>Latest Products</h1>
        <Row>
          {data.products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate page={data.page} pages={data.pages} keyword={keyword ? keyword :''} />
        </>)}
    </>
  )
}

export default HomeScreen