import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTrash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa'
import { useGetUsersQuery ,useDeleteUserMutation} from '../../slices/userApiSlice'
import Loader from '../../component/Loader'
import Message from '../../component/Message'
import { toast } from 'react-toastify'


const UserListScreen = () => {

    const { data: users, refetch,isLoading, error } = useGetUsersQuery();
    const [deleteUser,{isLoading:loadingDelete}]=useDeleteUserMutation();
    
    const deleteHandler = async (id) => {
       
        if (window.confirm("Are sure to delete user")) {
            try {
                await deleteUser(id);
                refetch();
                toast.success("User deleted succesfully");

            } catch (error) {
                toast.error(error)
            }
        }
    }

    return (
        <>
        <h1>Users</h1>
        {loadingDelete && <Loader/>}
            {isLoading ? <Loader /> : error ? <Message variant='danger'>{error?.data?.message}</Message> : (
                <Table stripped hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>Admin</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}></a>{user.email}</td>
                                <td>{user.isAdmin ? (<FaCheck style={{ color: 'green' }} />) : (<FaTimes style={{ color: 'red' }} />)}</td>

                                <td><LinkContainer to={`/admin/userlist/${user._id}/edit`}>
                                    <Button className='btn-sm' variant='light'><FaEdit /></Button >
                                </LinkContainer>
                                    <Button className='btn-sm' variant='danger' disabled={user.isAdmin} onClick={()=>deleteHandler(user._id)}><FaTrash style={{ color: 'white'}}/></Button ></td>
                            </tr>
                        ))}
                     
                    </tbody>
                </Table >
            )}

        </>
    )
}

export default UserListScreen;