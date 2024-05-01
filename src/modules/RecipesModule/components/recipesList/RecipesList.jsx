import Header from "../../../SharedModule/components/header/header";
import headerImage2 from '../../../../assets/images/header.png'
import NoData from "../../../SharedModule/components/noData/NoData";
import NoImgData from '../../../../assets/images/no-data.png'
import Modal from 'react-bootstrap/Modal';

import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import DeleteData from "../../../SharedModule/components/deleteData/DeleteData";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RecipesList = () => {
    const [recipesList, setrecipesList] = useState([])
    const [recipeId, setrecipeId] = useState('')
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const navigate =useNavigate()

    const getRecipes = async () => {
        try {
            let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=10&pageNumber=1',
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            )
            setrecipesList(response.data.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    const clickDropDown = (id) => {
        setrecipeId(id)
    }
    const handleDeleteRecipes = async () => {
        try {
            let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                }
            )
            toast.success('Delete Recipe success', { position: "top-center", })
            handleCloseDelete()
            getRecipes()
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const goToRecipeData = ()=>{
        navigate('/dashboard/recipeData')
    }
    useEffect(() => {
        getRecipes()
    }, [])
    return (
        <>
            <Header title={'Recipes Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImage2} />
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteData deleteItem='Recipe' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDeleteRecipes}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="container-fluid">
                <div className="row justify-content-between mt-3">
                    <div className="col-md-6 ms-2 ">
                        <h4>Recipe Table Details</h4>
                        <p>You can check all details</p>
                    </div>
                    <div className="col-md-4 me-2">
                        <button className="btn btn-success p-3 w-100" onClick={goToRecipeData} >Add New Recipe</button>
                    </div>
                </div>
                {recipesList.length > 0 ? <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Image</th>
                            <th scope="col">Price</th>
                            <th scope="col">Description</th>
                            <th scope="col">Tag</th>
                            <th scope="col">Category</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipesList.map((item, index) =>
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.imagePath ? <img src={`https://upskilling-egypt.com:3006/${item.imagePath}`} alt="" width={'100px'} /> : <img src={NoImgData} width={'50px'}  />}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>{item.tag.name}</td>
                                <td>{item.category[0]?.name}</td>
                                <td className="align-top">
                                    <div className="dropdown" onClick={() => clickDropDown(item.id)}>
                                        <button className="recipesBtn fs-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            ...
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item pointerClass" ><i className="fa-regular fa-eye text-success me-1"></i> View</a></li>
                                            <li><a className="dropdown-item pointerClass" ><i className="fa-regular fa-pen-to-square text-success me-1"></i> Edit</a></li>
                                            <li><a className="dropdown-item pointerClass" onClick={handleShowDelete}><i className="fa-regular fa-trash-can text-success me-1"></i> Delete</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table> : <NoData />}
            </div>
        </>
    );
}

export default RecipesList;
