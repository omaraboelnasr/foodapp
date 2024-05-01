import Header from "../../../SharedModule/components/header/header";
import headerImage2 from '../../../../assets/images/header.png'
import axios from "axios";
import { useEffect, useState } from "react";
import NoData from "../../../SharedModule/components/noData/NoData";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import DeleteData from "../../../SharedModule/components/deleteData/DeleteData";

const CategoriesList = () => {
    const [categorieList,setcategorieList]=useState([])
    const [show, setShow] = useState(false);
    const [categoryId , setcategoryId] = useState('')
    const [updatedCategory,setupdatedCategory] = useState('')
    const handleClose = () => {
      setupdatedCategory('')
      setShow(false)
    }
    const handleShow = () => setShow(true);
    const [mode,setMode] = useState('')
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) =>{
      setShowDelete(true);
      setcategoryId(id)
    } 
    let {register,handleSubmit,setValue,formState:{errors},reset}= useForm()

    const getCategoriesList = async ()=>{
      try{
        let response = await axios.get(
          'https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
          {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
          })
          setcategorieList(response.data.data)
          
      }catch(error){
        toast.error(error.response.data.message);
      }
    }
    
    const onSubmit = async (data)=>{
      if(mode==='add'){
        try{
          let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/',data,{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
          })
          toast.success('Category Add Success',{position: "top-center",})
          reset()
          handleClose()
          getCategoriesList()
      }catch(error){
          toast.error(error.response.data.message)
      }
      }else{
        try{
          let response = await axios.put(`https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,data,{
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
          })
          toast.success('Category Updated Success',{position: "top-center",})
          reset()
          handleClose()
          getCategoriesList()
          setupdatedCategory('')
      }catch(error){
          toast.error(error.response.data.message)
      }
      }
        
    }
    const handleDeleteCategory = async ()=>{
      try{
        let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${categoryId}`,{
          headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
        })
        toast.success('Category Deleted Success',{position: "top-center",})
        handleCloseDelete()
        getCategoriesList()
    }catch(error){
        toast.error(error.response.data.message)
    }
    }

    const handelAddCategory = ()=>{
      setMode('add')
      handleShow()
    }

    const handelUpdateCategory = (id,categoryName)=>{
      setupdatedCategory(categoryName)
      setValue(categoryName)
      setMode('update')
      setcategoryId(id)
      handleShow()
    }
    useEffect(()=>{
      getCategoriesList()
    },[updatedCategory,mode])
  return (
    <>
      <Header title={'Categories Item'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImage2} />
      <Modal show={show} onHide={()=>handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>{mode==='add'?'Add':'Update'} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Category Name" {...register("name" ,{
              required:"Category Name is required",
            })} />
            {mode==='update'?setValue('name',updatedCategory):''}
            </div>
            {errors.name && <p className='alert alert-danger'>{errors.name.message}</p>}
            <div className="d-flex justify-content-end">
              <button className='btn btn-success px-4' >{mode==='add'?'Save':'Update'}</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
        <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <DeleteData deleteItem = 'Category' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container-fluid">
        <div className="row justify-content-between mt-3">
          <div className="col-md-6 ms-2 ">
            <h4>Categories Table Details</h4>
            <p>You can check all details</p>
          </div>
          <div className="col-md-4 me-2">
            <button className="btn btn-success p-3 w-100" onClick={handelAddCategory}>Add New Category</button>
          </div>
        </div>
        {categorieList.length > 0?<table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Categorie Name</th>
              <th scope="col">Creation Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categorieList.map((item,index)=>
              <tr key={item.id}>
              <th scope="row">{index+1}</th>
              <td>{item.name}</td>
              <td>{item.creationDate}</td>
              <td>
                <i className="fa fa-edit text-warning mx-2" style={{ cursor: 'pointer' }} onClick={()=>handelUpdateCategory(item.id,item.name)} ></i>
                <i className="fa fa-trash text-danger" style={{ cursor: 'pointer' }}  onClick={()=>handleShowDelete(item.id)}></i>
              </td>
            </tr>)
            }
          </tbody>
        </table>:<NoData/>}
      </div>
    </>

  );
}

export default CategoriesList;
