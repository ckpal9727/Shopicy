import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import { useParams,useNavigate } from 'react-router-dom'


const SearchBox = () => {
    const navigate=useNavigate();
    const {keyword:urlKeyword}=useParams();
    const [keyword,setKeyword]=useState('');

    const submitHandler =async (e)=>
    {
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/search/${keyword}`);
            setKeyword('')
        }else{
            navigate(`/`);
        }
    }
  return (
    <Form onClick={submitHandler}>
        <Form.Control
         type='text'
         onChange={(e)=>setKeyword(e.target.value)}
         value={keyword}
         placeholder='Search Product'
         className='mr-sm-2 ml-sm-5'
         ></Form.Control>
         <Button type='submit' variant='outline-light' className='p-2 mx-2'>Search</Button>

    </Form>
  )
}

export default SearchBox