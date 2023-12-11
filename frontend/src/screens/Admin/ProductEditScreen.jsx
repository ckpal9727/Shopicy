import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useUpdateProductMutation, useGetProductDetailsQuery, useUploadProductImageMutation } from '../../slices/productApiSlice'
import FormContainer from '../../component/FormContainer'
import Loader from '../../component/Loader'
import Message from '../../component/Message'

const ProductEditScreen = () => {
    const { id: productId } = useParams();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [countInStock, setCountInStock] = useState('');

    //Image upload 

    const [uploadImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    

    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);


    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            setName(product.name)
            setPrice(product.price)
            setCategory(product.category)
            setImage(product.image)
            setBrand(product.brand)
            setDescription(product.description)
            setCountInStock(product.countInStock)

        }
    }, [product])

    const submitHandler = async (e) => {
        e.preventDefault();
        const updatedProduct = {
            productId,
            name,
            price,
            category,
            brand,
            image,
            description,
            countInStock
        };
        const result = await updateProduct(updatedProduct)
        if (result.error) {
            toast.error(result.error)
            console.log(result.error)
        } else {
            toast.success("Product Updated");
            navigate('/admin/productlist')
        }

    }

  

    const uploadFileHandler = async (e) => {
       const formData=new  FormData();
       formData.append('image',e.target.files[0]);
       try {
        const res =await uploadImage(formData).unwrap();
        toast.success("Image Uploaded");
        setImage(res.image);
       } catch (error) {
        toast.error(error)
       }
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go back</Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message}</Message> : (

                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='my-2' controlId='price' >
                            <Form.Label>price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='my-2' controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='category'
                                placeholder='Enter category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='my-2' controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Name'
                                value={image}
                                onChange={(e) => setImage(e.target.value)} />
                            <Form.Control type='file' label='choose file' onChange={uploadFileHandler}>

                            </Form.Control>
                        </Form.Group>
                        {loadingUpload && <Loader/>}
                        <Form.Group className='my-2' controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter brand'
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='my-2' controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='my-2' controlId='countInStock'>
                            <Form.Label>CountInStock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter countInStock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)} />
                        </Form.Group>
                        <Button className='my-2' variant='primary' type='submit'>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}

export default ProductEditScreen