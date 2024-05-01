import React from 'react';
import nodataimg from '../../../../assets/images/no-data.png'

const NoData = () => {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
            <img src={nodataimg} alt="" />
            <h3 className='mt-3'>No Data !</h3>
        </div>
    );
}

export default NoData;
