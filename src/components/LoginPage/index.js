import {Component} from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import './index.css'


class LoginPage extends Component {
    state = {username:"", password:"",error:""}

    onChangeuserName =(event) =>{
        this.setState({username:event.target.value})
    }

    onchangePassword =(event)=>{
        this.setState({password:event.target.value})
    }

    onLogToDashboard=(jwtToken)=>{
        Cookies.set("jwt_token",jwtToken) 
        const {history} = this.props 
        history.replace("/taskmanager")
    }

    onSubmitUserDetails=async(event)=>{
        event.preventDefault()
        const {username,password} = this.state
        const url ="https://taskmanagerbackend-ei4s.onrender.com/login" 
        const userDetails={
            username,
            password,
        }
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }
        try {
            const response = await fetch(url, options);
            const data = await response.json();
            if (response.ok) {
              const { jwtToken } = data;
              this.onLogToDashboard(jwtToken);
            } else {
              this.setState({ error: 'User details not correct' });
            }
          } catch (error) {
            this.setState({ error: 'User details does not exist' });
          }
    }
     
    render() {
        const {username,password,error} = this.state
    
        return (
            <div className="login-bg-container">
                <h3>Login Here</h3>
                <form className='form-container' onSubmit={this.onSubmitUserDetails}>
                    <div className='username-container'>
                        <label className='username' htmlFor="user">Username</label>
                        <br/>
                        <input type="text"
                         required placeholder="Enter Username"
                        id="user"
                        value={username}
                         onChange={this.onChangeuserName}/>
                    </div>
                    <div className='password-section'>
                        <label htmlFor="password" >Password</label>
                        <br/>
                        <input id="password" required type="password" placeholder="Enter password" value={password} onChange={this.onchangePassword}/>
                    </div>
                    <p className='error-message' >{error}</p>
                    <div className='btn-section'>
                    <button type="submit" className='login-btn' >Login</button>
                    </div>
                    
                    <p className='createac-para'>
                        <span className='create-new'>New User?</span><Link to="/register"><button className='create-acc-btn'>Create Account</button></Link>
                    </p>
                </form>
            </div>
        )
    }
}

export default LoginPage



