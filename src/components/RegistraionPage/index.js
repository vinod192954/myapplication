import './index.css'
import { Link } from 'react-router-dom'

const RegistraionPage = () => {
    return (
        <div className="register-bg-container">
            <h3>Register Here</h3>
            <form className='form-section'>
                <div className='user-section'>
                    <label htmlFor="user">Username</label>
                    <input type="text" required placeholder="Username" id="user"/>
                </div>
                <div className='user-section'>
                    <label htmlFor="password">Password</label>
                    <input type="password" required placeholder="Password" id="password"/>
                </div>
                <div className='user-section'>
                    <label htmlFor="email">Email</label>
                    <input type="email" required placeholder="Email" id="email"/>
                </div>
                <div className='user-section'>
                    <label htmlFor="role">Role</label>
                    <select id="role" required>
                        <option>Admin</option>
                        <option>Member</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            <Link to="/">
                <button className='login-here-button'>Click to Login Here</button>
            </Link>
        </div>
    )
}

export default RegistraionPage
