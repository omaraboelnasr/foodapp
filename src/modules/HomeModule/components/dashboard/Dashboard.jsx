import Header from "../../../SharedModule/components/header/header";
import headerImage1 from '../../../../assets/images/home-avatar.svg'

const Dashboard = () => {
    return (
        <div>
            <Header title={'Welcome Upskilling !'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} imgUrl={headerImage1}/>
        </div>
    );
}

export default Dashboard;
