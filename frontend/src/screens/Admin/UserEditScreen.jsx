import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../slices/userApiSlice'
import FormContainer from '../../component/FormContainer'
import Loader from '../../component/Loader'
import Message from '../../component/Message'

const UserEditScreen = () => {
    const { id: userId } = useParams();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);


    const [updateUSer, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUSer({ userId, name, email, isAdmin })
            refetch();
            toast.success("User Updated");
            navigate('/admin/userlist')
        } catch (error) {
            toast.error(error)
        }


    }




    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go back</Link>
            <FormContainer>
                <h1>Edit User</h1>
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
                        <Form.Group className='my-2' controlId='email' >
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group className='my-2' controlId='isAdmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></Form.Check>
                        </Form.Group>



                        <Button className='my-2' variant='primary' type='submit'>Update</Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}

export default UserEditScreen