import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../SharedModule/components/header/header';
import headerImage2 from '../../../../assets/images/header.png'
import { toast } from 'react-toastify';
import axios from 'axios';
import NoData from '../../../SharedModule/components/noData/NoData';
import { AuthContext } from '../../../../context/AuthContext';
import { ToastContext } from '../../../../context/ToastContext';

const FavoriteList = () => {
    const {getToastValue}=useContext(ToastContext)
    const {loginData,baseUrl,requestHeader}=useContext(AuthContext)
    const navigate = useNavigate()
    const [favList, setFavList] = useState([])
    const getFavoriteList = async () => {
        try {
            let response = await axios.get(`${baseUrl}/userRecipe/`,
                {
                    headers: requestHeader
                }
            )
            setFavList(response.data.data)
        } catch (error) {
            getToastValue('error',error.response.data.message)
        }
    }

    const handleDeleteFav =async (id)=>{
        try {
            let response = await axios.delete(`${baseUrl}/userRecipe/${id}`,
                {
                    headers: requestHeader
                }
            )
            getToastValue('success','Recipe delete from favorite list')
            getFavoriteList()
        } catch (error) {
            getToastValue('error',error.response.data.message)
        }
    }

    useEffect(() => {
        if (loginData?.userGroup === 'SuperAdmin') {
            return navigate('/dashboard')
        }
        getFavoriteList()
    }, [])
    return (
        <>
            <Header title={'Favorite Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImage2} />
            <div className="container-fuid">
                <div className="row justify-content-center mt-5">
                    {favList.length > 0 ? (<>
                        {favList.map((item) => <>
                            <div className="col-md-3 my-3" key={item.id}>
                                <div className="card w-100 h-100">
                                    <div className='position-relative'>
                                    <i onClick={()=>handleDeleteFav(item.id)} className="fa-solid fa-heart position-absolute end-0 mx-3 my-2 favHeart"></i>
                                    <img src={`https://upskilling-egypt.com:3006/${item.recipe?.imagePath}`} className="card-img-top" alt="..." height='250px' />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.recipe.name}</h5>
                                        <p className="card-text">{item.recipe.description}</p>
                                        <p className="card-text">{item.recipe.price} $</p>
                                    </div>
                                </div>
                            </div>
                        </>
                        )}
                    </>) : (<NoData />)}
                </div>
            </div>
        </>
    );
}

export default FavoriteList;
