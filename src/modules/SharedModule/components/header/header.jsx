
const Header = ({title,description,imgUrl}) => {
    return (
        <>
        <div className="container-fluid ">
            <div className="headerContainer ">
                <div className="row align-items-center mx-5 p-5">
                <div className="col-md-8">
                    <div className="header-content">
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="headerImg text-center">
                        <img src={imgUrl} alt="" className="img-fluid"/>
                    </div>
                </div>
            </div>
            </div> 
        </div>
        
        </>
    );
}

export default Header;
