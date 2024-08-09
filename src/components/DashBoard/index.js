import './index.css'
import ViewDashBoard from '../ViewDashBoard'

const DashBoard = () => {
    return (
        <div className='dashboard'>
            <div className='img-name-role-bg-container'>
                <div>
                    <img className='profile-img' alt="profile" src='https://res.cloudinary.com/dndswwhrh/image/upload/v1723040812/user-profile-icon-free-vector_kcjvtx.jpg'/>
                </div> 
                <div className='name-role-section'>
                    <p>Name: Ajay</p>
                    <p>Role: Member</p>
                </div>
            </div> 
            <ViewDashBoard/>             
        </div>
    )
}
export default DashBoard
