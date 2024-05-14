import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipesListHeader = () => {
    const navigate = useNavigate()
    const goToRecipes = ()=>{
        navigate('/dashboard/recipes')
    }
    return (
        <>
        <div className='container-fluid recipesHeader p-5 mt-3'>
            <div className="row justify-content-between align-items-center ">
                <div className="col-md-4">
                    <h2>Fill the <span className='text-success'>Recipes</span> !</h2>
                    <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                <button className='btn btn-success px-5 py-3 fs-5' onClick={goToRecipes}>All Recipes <i className="fa-solid fa-arrow-right ms-2"></i></button>
                </div>
            </div>
        </div>
        </>
    );
}

export default RecipesListHeader;
