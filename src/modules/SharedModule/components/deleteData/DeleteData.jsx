import deleteImg from '../../../../assets/images/delete-model.svg'

const DeleteData = ({deleteItem}) => {
    return (
        <>
        <div className='text-center'>
        <img src={deleteImg} alt="" />
            <h5 className='mt-3'>Delete this {deleteItem}</h5>
            <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>
            
        </>
    );
}

export default DeleteData;
