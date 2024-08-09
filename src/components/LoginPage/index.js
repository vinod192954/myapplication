import {Component} from 'react'
import { Link } from 'react-router-dom'
import './index.css'


class LoginPage extends Component {
    state = {username:"", password:""}

    onChangeuserName =(event) =>{
        this.setState({username:event.target.value})
    }

    onchangePassword =(event)=>{
        this.setState({password:event.target.value})
    }

     
    render() {
        const {username,password} = this.state
    
        return (
            <div className="login-bg-container">
                <h3>Login Page</h3>
                <form className='form-section'>
                    <div className='user-section'>
                        <label htmlFor="user">Username</label>
                        <br />
                        <input type="text" required placeholder="username" id="user" value={username} onChange={this.onChangeuserName}/>
                    </div>
                    <div className='password-section'>
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input id="password" required type="password" placeholder="password" value={password} onChange={this.onchangePassword}/>
                    </div>
                    <button type="submit" >Login</button>
                    <p className='createac-para'>
                        New User? <Link to="/register"><button>Create Account</button></Link>
                    </p>
                </form>
            </div>
        )
    }
}

export default LoginPage



