const Navbar = ({loginData}) => {
        // console.log(loginData);
    return (
        <div>
            <h1>Navbar <span>{loginData?.userName}</span></h1>
        </div>
    );
}

export default Navbar;
