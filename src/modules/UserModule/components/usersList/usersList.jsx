import Header from "../../../SharedModule/components/header/header";
import headerImage2 from '../../../../assets/images/header.png'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import NoData from "../../../SharedModule/components/noData/NoData";
import { Button, Modal } from "react-bootstrap";
import DeleteData from "../../../SharedModule/components/deleteData/DeleteData";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { ToastContext } from "../../../../context/ToastContext";

const UsersList = () => {
    const {getToastValue}=useContext(ToastContext)
    const {loginData,baseUrl,requestHeader}=useContext(AuthContext)
    const navigate = useNavigate()
    const [userList, setUserList] = useState([])
    const [arrayOfPages, setarrayOfPages] = useState([])
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage , setcurrentPage]=useState(null)
    const [filterdUserName,setfilterdUserName] = useState('')
    const [filterdUserRole,setfilterdUserRole] = useState(null)
    const [userId,setUserId]=useState(null)
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const getUserList = async (userName,groups, pageSize, pageNumber) => {
        try {
            let response = await axios.get(
                `${baseUrl}/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
                {
                    headers: requestHeader,
                    params: {
                        userName,
                        groups
                    }
                })
            setUserList(response.data.data)
            setarrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
            setTotalPages(response.data.totalNumberOfPages)
        } catch (error) {
            getToastValue('error',error.response.data.message)
        }
    }
    const deleteUser= async(id)=>{
        try {
            let response = await axios.delete(
                `${baseUrl}/Users/${id}`,
                {
                    headers: requestHeader,
                })
                getToastValue('success','Delete User success')
                getUserList('','', 25, 1)
        } catch (error) {
            getToastValue('error',error.response.data.message)
        }
    }
    const handleSearchByUserName = (e)=>{
        setfilterdUserName(e.target.value)
        getUserList(e.target.value,filterdUserRole,25,currentPage)
    }

    const handleSearchByUserRole = (e)=>{
        setfilterdUserRole(e.target.value)
        getUserList(filterdUserName,e.target.value,25,currentPage)
    }
    const handleShowDeleteUser = (id)=>{
        handleShowDelete()
        setUserId(id)
    }
    const handleDeleteUser = ()=>{
        deleteUser(userId)
        handleCloseDelete()
    }
    const handlePagination = (page)=>{
        setcurrentPage(page)
        getUserList(filterdUserName,filterdUserRole, 25, page)
    }
    
    const handleNextPage = ()=>{
        if(currentPage < totalPages){
            getUserList(filterdUserName,filterdUserRole, 25, currentPage+1)
            setcurrentPage(currentPage+1)
        }
    }
    
    const handlePrevPage = ()=>{
        if(currentPage != 1){
            getUserList(filterdUserName,filterdUserRole, 25, currentPage-1)
            setcurrentPage(currentPage-1)
        }
    }
    useEffect(() => {
        if(loginData?.userGroup!=='SuperAdmin'){
            return navigate('/dashboard')
        }
        setcurrentPage(1)
        getUserList('','', 25, 1)
    }, [])

        return (
        <>
            <Header title={'Users List'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImage2} />
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteData deleteItem='User' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteUser}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="container-fluid">
                <div className="row justify-content-between mt-3">
                    <div className="col-md-6 ms-2 ">
                        <h4>Users Table Details</h4>
                        <p>You can check all details</p>
                    </div>
                </div>
                <div className="row justify-content-center my-2">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search by user name" aria-describedby="basic-addon1" onChange={handleSearchByUserName} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" aria-label="Default select example" onChange={handleSearchByUserRole}>
                            <option value={''} selected>All User Role</option>
                            <option value={1}>Admin</option>
                            <option value={2}>User</option>
                        </select>
                    </div>
                </div>
                {userList.length > 0 ? <><table className="table">
                    <thead>
                        <tr>
                            <th scope="col">User Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Country</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">User Role</th>
                            <th scope="col" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((item) =>
                            <tr key={item.id}>
                                <td>{item.userName}</td>
                                <td>{item.email}</td>
                                <td>{item.country}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.group.name}</td>
                                <td className="text-center">
                                    <i className="fa fa-trash text-danger" style={{ cursor: 'pointer' }} onClick={()=>handleShowDeleteUser(item.id)}></i>
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
                            {arrayOfPages.map((pg) => <>
                                <li className={`page-item ${currentPage == pg ? 'active' : ''}`}><a className="page-link pointerClass" onClick={() => handlePagination(pg)}>{pg}</a></li>
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
                    : <NoData />}
            </div>
        </>
    );

}

export default UsersList;
