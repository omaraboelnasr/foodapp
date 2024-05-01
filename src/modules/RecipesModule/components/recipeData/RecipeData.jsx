import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RecipesListHeader from '../../../SharedModule/components/recipesListHeader/RecipesListHeader';

const RecipeData = () => {
    let { register, handleSubmit, formState: { errors } } = useForm()
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const [categorieList, setcategorieList] = useState([])
    const [tagList, settagList] = useState([])
    const navigate = useNavigate()
    const handleChange = (file) => {
        setFile(file);
    };
    const getCategoryList = async () => {
        try {
            let response = await axios.get(
                'https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1',
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            setcategorieList(response.data.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const getTagList = async () => {
        try {
            let response = await axios.get(
                'https://upskilling-egypt.com:3006/api/v1/tag/',
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
                settagList(response.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const appendToFormData = (data)=>{
        const formData = new FormData()
        formData.append('name',data.name)
        formData.append('price',data.price)
        formData.append('description',data.description)
        formData.append('categoriesIds',data.categoriesIds)
        formData.append('tagId',data.tagId)
        formData.append('recipeImage',file)
        return formData
    }
    const onSubmit = async (data) => {
        let recipeFormData = appendToFormData(data)
        try {
            let response = await axios.post(
                'https://upskilling-egypt.com:3006/api/v1/Recipe',recipeFormData,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                })
            toast.success('Recipe Add Success',{position: "top-center",})
            setcategorieList(response.data.data)
            navigate('/dashboard/recipes')
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleCancle = ()=>{
        navigate('/dashboard/recipes')
    }
    useEffect(() => {
        getCategoryList()
        getTagList()
    }, [])
    return (
        <>
            <RecipesListHeader/>
            <div className='container-fluid p-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Recipe Name" {...register("name", {
                            required: "Recipe Name is required",
                        })} />
                    </div>
                    {errors.name && <p className='alert alert-danger'>{errors.name.message}</p>}
                    
                    <select className="form-select mb-3" {...register("tagId", {
                            required: "Tag name is required",
                        })} >
                        <option selected disabled>Select Tag</option>
                        {tagList.map((tag) => 
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        )}
                    </select>
                    {errors.tagId && <p className='alert alert-danger'>{errors.tagId.message}</p>}
                    
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Recipe Price" {...register("price", {
                            required: "Recipe Price is required",
                            pattern: {
                                value: /^\d+$/g,
                                message: 'Invalid Price'
                            }
                        })} />
                        <span className="input-group-text">EGP</span>
                    </div>
                    {errors.price && <p className='alert alert-danger'>{errors.price.message}</p>}

                    <select className="form-select mb-3" {...register("categoriesIds", {
                            required: "Category name is required",
                        })} >
                        <option selected disabled>Select Category</option>
                        {categorieList.map((category) => 
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                    </select>
                    {errors.categoriesIds && <p className='alert alert-danger'>{errors.categoriesIds.message}</p>}

                    <div className="input-group mb-3">
                        <textarea className="form-control" placeholder="Description" {...register("description", {
                            required: "Recipe description is required",
                        })} />
                    </div>
                    {errors.description && <p className='alert alert-danger'>{errors.description.message}</p>}
                    <div className='fileUploadBox mb-3'>
                        <FileUploader handleChange={handleChange} name="recipeImage" types={fileTypes} {...register("recipeImage")} />
                    </div>
                    <div className='d-flex justify-content-end'>
                    <button className='btn btn-outline-success px-5 mx-4'onClick={handleCancle}>Cancle</button>
                    <button className='btn btn-success px-5'>Save</button>
                    </div>
                    
                </form>
            </div>
        </>
    );
}

export default RecipeData;
