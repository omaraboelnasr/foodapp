import Header from "../../../SharedModule/components/header/header";
import headerImage2 from '../../../../assets/images/header.png'
import NoData from "../../../SharedModule/components/noData/NoData";
import NoImgData from '../../../../assets/images/no-data.png'
import Modal from 'react-bootstrap/Modal';

import axios from "axios";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import DeleteData from "../../../SharedModule/components/deleteData/DeleteData";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { ToastContext } from "../../../../context/ToastContext";

const RecipesList = () => {
    const { getToastValue } = useContext(ToastContext)
    const { loginData, baseUrl, requestHeader } = useContext(AuthContext)
    const [recipesList, setrecipesList] = useState([])
    const [recipeId, setrecipeId] = useState('')
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [showFavorite, setShowFavorite] = useState(false);
    const handleCloseFavorite = () => setShowFavorite(false);
    const handleShowFavorite = () => setShowFavorite(true);
    const navigate = useNavigate()
    const [categorieList, setcategorieList] = useState([])
    const [tagList, settagList] = useState([])
    const [recipeName, setrecipeName] = useState('')
    const [recipeTagId, setrecipeTagId] = useState('')
    const [recipeCategoryId, setrecipeCategoryId] = useState('')
    const [arrayOfPages, setarrayOfPages] = useState([])
    const [totalPages, setTotalPages] = useState(null)
    const [currentPage, setcurrentPage] = useState(null)
    const [recipeFromID, setRecipeFromID] = useState(null)
    const getRecipes = async (name, tagId, categoryId, pageSize, pageNumber) => {
        try {
            let response = await axios.get(`${baseUrl}/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
                {
                    params: {
                        name,
                        tagId,
                        categoryId,
                    }
                },
                {
                    headers: requestHeader
                }
            )
            setrecipesList(response.data.data)
            setarrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_, i) => i + 1))
            setTotalPages(response.data.totalNumberOfPages)
        } catch (error) {
            getToastValue('error', error.response.data.message)
        }
    }
    const clickDropDown = (id) => {
        setrecipeId(id)
    }
    const handleDeleteRecipes = async () => {
        try {
            let response = await axios.delete(`${baseUrl}/Recipe/${recipeId}`,
                {
                    headers: requestHeader
                }
            )
            getToastValue('success', 'Delete Recipe success')
            handleCloseDelete()
            getRecipes('', '', '', 10, 1)
        } catch (error) {
            getToastValue('error', error.response.data.message)
        }
    }

    const getRecipeById = async (id) => {
        try {
            let response = await axios.get(
                `${baseUrl}/Recipe/${id}`,
                {
                    headers: requestHeader
                })
            setRecipeFromID(response.data)
        } catch (error) {
            getToastValue('error', error.response.data.message)
        }
    }

    const goToRecipeData = () => {
        navigate('/dashboard/recipeData')
    }

    const handleEditRecipe = (id) => {
        navigate(`/dashboard/updateRecipe/${id}`)
    }

    const getCategoryList = async () => {
        try {
            let response = await axios.get(
                `${baseUrl}/Category/?pageSize=10&pageNumber=1`,
                {
                    headers: requestHeader
                })
            setcategorieList(response.data.data)
        } catch (error) {
            getToastValue('error', error.response.data.message)
        }
    }

    const getTagList = async () => {
        try {
            let response = await axios.get(
                `${baseUrl}/tag/`,
                {
                    headers: requestHeader
                })
            settagList(response.data)
        } catch (error) {
            getToastValue('error', error.response.data.message)
        }
    }
    const handleSearchByName = (e) => {
        setrecipeName(e.target.value)
        getRecipes(e.target.value, recipeTagId, recipeCategoryId, 10)
    }

    const handleSearchByTagId = (e) => {
        setrecipeTagId(e.target.value)
        getRecipes(recipeName, e.target.value, recipeCategoryId, 10)
    }

    const handleSearchByCategoryId = (e) => {
        setrecipeCategoryId(e.target.value)
        getRecipes(recipeName, recipeTagId, e.target.value, 10)
    }

    const handlePagination = (page) => {
        setcurrentPage(page)
        getRecipes(recipeName, recipeTagId, recipeCategoryId, 10, page)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            getRecipes(recipeName, recipeTagId, recipeCategoryId, 10, currentPage + 1)
            setcurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage != 1) {
            getRecipes(recipeName, recipeTagId, recipeCategoryId, 10, currentPage - 1)
            setcurrentPage(currentPage - 1)
        }
    }
    const handleOpenFavorite = (id) => {
        handleShowFavorite()
        setrecipeId(id)
        getRecipeById(id)

    }
    const handleAddToFav = async () => {
        try {
            let response = await axios.post(
                `${baseUrl}/userRecipe/`,
                { recipeId },
                {
                    headers: requestHeader,
                }
            )
            getToastValue('success', 'Recipe add to your Favorite')
            handleCloseFavorite()
        } catch (error) {
            getToastValue('error', error.response.data.message)
        }
    }
    useEffect(() => {
        getRecipes('', '', '', 10, 1)
        setcurrentPage(1)
        getCategoryList()
        getTagList()
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
            <Modal show={showFavorite} onHide={handleCloseFavorite}>
                <Modal.Header closeButton>
                    <Modal.Title>Recipe Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img src={`https://upskilling-egypt.com:3006/${recipeFromID?.imagePath}`} width='400px' />
                    </div>
                    <div className="d-flex mt-3">
                        <h5>Name </h5>
                        <p className="ms-2">{recipeFromID?.name}</p>
                    </div>
                    <div className="d-flex">
                        <h5>Description </h5>
                        <p className="ms-2">{recipeFromID?.description}</p>
                    </div>
                    <div className="d-flex">
                        <h5>Price </h5>
                        <p className="ms-2">{recipeFromID?.price} $</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAddToFav}>
                        Add To Favorite
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="container-fluid">
                <div className="row justify-content-between mt-3">
                    <div className="col-md-6 ms-2 ">
                        <h4>Recipe Table Details</h4>
                        <p>You can check all details</p>
                    </div>
                    {loginData?.userGroup === 'SuperAdmin' ?
                        <div className="col-md-4 me-2">
                            <button className="btn btn-success p-3 w-100" onClick={goToRecipeData} >Add New Recipe</button>
                        </div> :
                        ''}

                </div>
                <div className="row justify-content-center my-2">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search by recipe name" aria-describedby="basic-addon1" onChange={handleSearchByName} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" aria-label="Default select example" onChange={handleSearchByTagId}>
                            <option selected>All Tag</option>
                            {tagList.map((tag) =>
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select" aria-label="Default select example" onChange={handleSearchByCategoryId}>
                            <option selected>All Category</option>
                            {categorieList.map((category) =>
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                        </select>
                    </div>
                </div>
                {recipesList.length > 0 ?
                    <><table className="table align-middle">
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
                            {recipesList.map((item) =>
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.imagePath ? <img src={`https://upskilling-egypt.com:3006/${item.imagePath}`} alt="" width={'100px'} /> : <img src={NoImgData} width={'50px'} />}</td>
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
                                    <td>{item.tag.name}</td>
                                    <td>{item.category[0]?.name}</td>
                                    {loginData?.userGroup === 'SuperAdmin' ?
                                        <td className="align-top">
                                            <div className="dropdown" onClick={() => clickDropDown(item.id)}>
                                                <button className="recipesBtn fs-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    ...
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li><a className="dropdown-item pointerClass" onClick={() => handleEditRecipe(item.id)} ><i className="fa-regular fa-pen-to-square text-success me-1"></i> Edit</a></li>
                                                    <li><a className="dropdown-item pointerClass" onClick={handleShowDelete}><i className="fa-regular fa-trash-can text-success me-1"></i> Delete</a></li>
                                                </ul>
                                            </div>
                                        </td> : (
                                            <td>
                                                <a className="dropdown-item pointerClass" onClick={() => handleOpenFavorite(item.id)} ><i className="fa-regular fa-eye text-success me-1"></i> View</a>
                                            </td>
                                        )}
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

export default RecipesList;
