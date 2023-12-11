import React from 'react'
import { useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa'
import { useGetProductsQuery, useCreateProductMutation, useDeleteProductMutation } from '../../slices/productApiSlice'
import Loader from '../../component/Loader'
import Message from '../../component/Message'
import { toast } from 'react-toastify'
import Paginate from '../../component/Paginate'
const ProductListScreen = () => {

    const pageNumber = useParams();
    const { data, isLoading, error, refetch } = useGetProductsQuery(pageNumber);
    const [createProduct, { data: product, isLoading: loadingCreate }] = useCreateProductMutation();


    //delete product mutaiton
    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure')) {
            try {
                await deleteProduct(id)
                refetch();
                toast.success('Product deleted succesfully')
            } catch (error) {
                toast.error(error?.data?.message)
            }
        }
    }
    const createProductHandler = async () => {
        if (window.confirm('Are you sure you want to create a new product')) {
            try {
                await createProduct();
                refetch();
                toast.success('Product created succesfully')
            } catch (error) {
                toast.error(error?.data?.message)
            }
        }
    }
    return (
        <>
            <Row className='align-item-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='btn-sm m-3 ' onClick={createProductHandler}> <FaEdit />Create Product</Button>
                </Col>

            </Row>
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message}</Message> : (
                <>
                    <Table stripped hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.products && data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}><Button className='btn-sm mx-2'><FaEdit /> </Button></LinkContainer>
                                        <Button className='btn-sm ' variant='danger' onClick={() => deleteHandler(product._id)}><FaTrash style={{ color: 'white' }} /></Button>
                                    </td>

                                </tr>

                            ))}
                        </tbody>
                    </Table>
                    <Paginate page={data.page} pages={data.pages} isAdmin={true} />
                </>
            )}
        </>
    )
}

export default ProductListScreen

