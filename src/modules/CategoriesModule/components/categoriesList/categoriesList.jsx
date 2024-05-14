import Header from "../../../SharedModule/components/header/header";
import headerImage2 from '../../../../assets/images/header.png'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NoData from "../../../SharedModule/components/noData/NoData";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import DeleteData from "../../../SharedModule/components/deleteData/DeleteData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { ToastContext } from "../../../../context/ToastContext";

const CategoriesList = () => {
  const {getToastValue}=useContext(ToastContext)
    const {loginData,baseUrl,requestHeader}=useContext(AuthContext)
    const [categorieList,setcategorieList]=useState([])
    const [show, setShow] = useState(false);
    const [categoryId , setcategoryId] = useState('')
    const [updatedCategory,setupdatedCategory] = useState('')
    const navigate = useNavigate()
    const handleClose = () => {
      setupdatedCategory('')
      setShow(false)
    }
    const handleShow = () => setShow(true);
    const [mode,setMode] = useState('')
    const [showDelete, setShowDelete] = useState(false);
    const [arrayOfPages, setarrayOfPages] = useState([])
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage , setcurrentPage]=useState(null)
    const [searchCtegoryName,setsearchCtegoryName]=useState('')
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (id) =>{
      setShowDelete(true);
      setcategoryId(id)
    } 
    let {register,handleSubmit,setValue,formState:{errors},reset}= useForm()

    const getCategoriesList = async (name, pageSize, pageNumber)=>{
      try{
        let response = await axios.get(
          `${baseUrl}/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
          {
            headers:requestHeader,
            params:{
              name
            }
          })
          setcategorieList(response.data.data)
          setarrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
          setTotalPages(response.data.totalNumberOfPages)
      }catch(error){
        getToastValue('error',error.response.data.message)
      }
    }
    
    const onSubmit = async (data)=>{
      if(mode==='add'){
        try{
          let response = await axios.post(`${baseUrl}/Category/`,data,{
            headers:requestHeader
          })
          getToastValue('success','Category Add Success')
          reset()
          handleClose()
          getCategoriesList('',10)
      }catch(error){
        getToastValue('error',error.response.data.message)
      }
      }else{
        try{
          let response = await axios.put(`${baseUrl}/Category/${categoryId}`,data,{
            headers:requestHeader
          })
          getToastValue('success','Category Updated Success')
          reset()
          handleClose()
          getCategoriesList('',10)
          setupdatedCategory('')
      }catch(error){
        getToastValue('error',error.response.data.message)
      }
      }
        
    }
    const handleDeleteCategory = async ()=>{
      try{
        let response = await axios.delete(`${baseUrl}/Category/${categoryId}`,{
          headers:requestHeader
        })
        getToastValue('success','Category Deleted Success')
        handleCloseDelete()
        getCategoriesList('',10)
    }catch(error){
        getToastValue('error',error.response.data.message)
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
    const handleSearchByName = (e) => {
      setsearchCtegoryName(e.target.value)
      getCategoriesList(e.target.value,10)
  }

  const handlePagination = (page)=>{
    setcurrentPage(page)
    getCategoriesList(searchCtegoryName, 10, page)
}

const handleNextPage = ()=>{
    if(currentPage < totalPages){
      getCategoriesList(searchCtegoryName, 10, currentPage+1)
        setcurrentPage(currentPage+1)
    }
}

const handlePrevPage = ()=>{
    if(currentPage != 1){
      getCategoriesList(searchCtegoryName, 10, currentPage-1)
        setcurrentPage(currentPage-1)
    }
}

    useEffect(()=>{
      if(loginData?.userGroup!=='SuperAdmin'){
        return navigate('/dashboard')
    }
      setcurrentPage(1)
      getCategoriesList('',10)
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
        <div className="row justify-content-center my-2">
                    <div className="col-md-12">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search by category name" aria-describedby="basic-addon1" onChange={handleSearchByName} />
                        </div>
                    </div>
                </div>
        {categorieList.length > 0?<><table className="table">
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
        </table>
        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className="page-item">
                                    <a className="page-link pointerClass" onClick={handlePrevPage} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                {arrayOfPages.map((pg)=><>
                                    <li className={`page-item ${currentPage==pg?'active':''}`}><a className="page-link pointerClass" onClick={()=>handlePagination(pg)}>{pg}</a></li>
                                </>
                                )}
                                <li className="page-item">
                                    <a className="page-link pointerClass" onClick={handleNextPage} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
        </>
        :<NoData/>}
      </div>
    </>

  );
}

export default CategoriesList;
