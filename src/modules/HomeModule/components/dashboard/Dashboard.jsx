import Header from "../../../SharedModule/components/header/header";
import headerImage1 from '../../../../assets/images/home-avatar.svg'
import RecipesListHeader from "../../../SharedModule/components/recipesListHeader/RecipesListHeader";

const Dashboard = () => {
    return (
        <div>
            <Header title={'Welcome Upskilling !'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} imgUrl={headerImage1}/>
            <RecipesListHeader/>
        </div>
    );
}

export default Dashboard;
