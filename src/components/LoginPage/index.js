import {Component} from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import './index.css'


class LoginPage extends Component {
    state = {username:"", password:"",error_message:""}

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
        const {username,password,error_message} = this.state
        event.preventDefault()
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
        const response = await fetch(url,options)
       const data = await response.json()
       if (response.ok===true){
            const {jwtToken} = data 
            this.onLogToDashboard(jwtToken)
       }
       else{
            this.setState({error_message:"user Details not existed"})
       }
    }
     
    render() {
        const {username,password,error_message} = this.state
    
        return (
            <div className="login-bg-container">
                <h3>Login page</h3>
                <form className='form-section' onSubmit={this.onSubmitUserDetails}>
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
                    <p className='error-message'>{error_message}</p>
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



