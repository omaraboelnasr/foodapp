import Header from "../../../SharedModule/components/header/header";
import headerImage2 from '../../../../assets/images/header.png'
const RecipesList = () => {
    return (
        <div>
            <Header title={'Recipes Items'} description={'You can now add your items that any user can order it from the Application and you can edit'} imgUrl={headerImage2}/>
        </div>
    );
}

export default RecipesList;
