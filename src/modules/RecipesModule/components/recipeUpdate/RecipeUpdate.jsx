import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipesListHeader from '../../../SharedModule/components/recipesListHeader/RecipesListHeader';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FileUploader } from "react-drag-drop-files";
import { AuthContext } from '../../../../context/AuthContext';
import { ToastContext } from '../../../../context/ToastContext';

const RecipeUpdate = () => {
    const { getToastValue } = useContext(ToastContext)
    const { baseUrl, requestHeader } = useContext(AuthContext)
    const { id } = useParams();
    let { register, handleSubmit, setValue, formState: { errors } } = useForm()
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [recipeData, setrecipeData] = useState([])
    const [file, setFile] = useState(null);
    const [categorieList, setcategorieList] = useState([])
    const [tagList, settagList] = useState([])
    const [selectedCategory, setselectedCategory] = useState(null)
    const [selectedTag, setselectedTag] = useState(null)
    const [image, setImage] = useState(null);

    const navigate = useNavigate()



    const getRecipe = async () => {
        try {
            let response = await axios.get(
                `${baseUrl}/Recipe/${id}`,
                {
                    headers: requestHeader
                })
            setrecipeData(response.data)
            setselectedCategory(response.data.category[0])
            setselectedTag(response.data.tag)
            setImage(response.data.imagePath)
            console.log(recipeData);
        } catch (error) {
            getToastValue('error', error.response.data.message)
        }
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

    const appendToFormData = (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('price', data.price)
        formData.append('description', data.description)
        formData.append('categoriesIds', data.categoriesIds)
        formData.append('tagId', data.tagId)
        formData.append('recipeImage', file)
        return formData
    }


    const onSubmit = async (data) => {
        let recipeFormData = appendToFormData(data)
        try {
            // let imageResponse = ''
            // if (file === null) {
            //     imageResponse = await axios.get(
            //         `https://upskilling-egypt.com:3006/${recipeData.imagePath}`,
            //         { responseType: 'blob' }
            //     )
            // }
            // const imageBlob = await imageResponse.data
            // console.log(imageBlob);
            // console.log(recipeFormData);
            // const response = await axios.put(
            //     `${baseUrl}/Recipe/${recipeData.id}`, {
            //         recipeImage: imageBlob
            //     },
            //     {
            //         headers: requestHeader
            //     },
            //     )

            let responses = await axios.put(
                `${baseUrl}/Recipe/${id}`, recipeFormData,
                {
                    headers: requestHeader
                })
            getToastValue('success', 'Recipe Updated Success')
            navigate('/dashboard/recipes')
        } catch (error) {
            getToastValue('error', error.response.data.message)
        }
    }


    const handleCancle = () => {
        navigate('/dashboard/recipes')
    }
    const handleChange = (file) => {
        setFile(file);
    };
    useEffect(() => {
        getRecipe()
        getCategoryList()
        getTagList()
        handleChange()
    }, [])
    return (
        <>
            <RecipesListHeader />
            <div className='container-fluid p-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Recipe Name" {...register("name", {
                            required: "Recipe Name is required",
                        })} />
                    </div>
                    {setValue('name', recipeData.name)}
                    {errors.name && <p className='alert alert-danger'>{errors.name.message}</p>}

                    <select className="form-select mb-3" {...register("tagId", {
                        required: "Tag name is required",
                    })} >
                        <option selected value={selectedTag?.id}>{selectedTag?.name}</option>
                        {tagList.map((tag) =>
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        )}
                        {setValue('tagId', selectedTag?.id)}
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
                    {setValue('price', recipeData.price)}
                    {errors.price && <p className='alert alert-danger'>{errors.price.message}</p>}

                    <select className="form-select mb-3" {...register("categoriesIds", {
                        required: "Category name is required",
                    })} >
                        <option selected value={selectedCategory?.id}>{selectedCategory?.name}</option>
                        {categorieList.map((category) =>
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                    </select>
                    {setValue('categoriesIds', selectedCategory?.id)}
                    {errors.categoriesIds && <p className='alert alert-danger'>{errors.categoriesIds.message}</p>}

                    <div className="input-group mb-3">
                        <textarea className="form-control" placeholder="Description" {...register("description", {
                            required: "Recipe description is required",
                        })} />
                    </div>
                    {setValue('description', recipeData.description)}
                    {errors.description && <p className='alert alert-danger'>{errors.description.message}</p>}
                    <div className='text-center mb-3'>
                        <img src={`https://upskilling-egypt.com:3006/${image}`} alt="" width={'350px'} />
                    </div>
                    <div className='fileUploadBox mb-3'>
                        <FileUploader handleChange={handleChange} name="recipeImage" types={fileTypes}  {...register("recipeImage")} />
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-outline-success px-5 mx-4' onClick={handleCancle}>Cancle</button>
                        <button className='btn btn-success px-5'>Update</button>
                    </div>
                </form>
            </div>
        </>

    );
}

export default RecipeUpdate;
