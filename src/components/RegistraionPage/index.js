import { Component } from 'react'
import './index.css'

import { Link } from 'react-router-dom'

class RegistraionPage extends Component{
    state = {username:'',password:'',email:'',role:'',errorMessage:""}

    onChangeUserName=(event)=>{
        this.setState({username:event.target.value})
    }

    onChangePassword=(event)=>{
        
        this.setState({password:event.target.value})
    }

    onChangeEmail=(event)=>{
        
        this.setState({email:event.target.value})
    }
    onChangeOptions=(event)=>{
        console.log(event.target.value)
        this.setState({role:event.target.value})
    }
    onSubmitRegisterDetails=async(event)=>{
        const {username,password,email,role}  = this.state
        event.preventDefault()
        const url="https://taskmanagerbackend-ei4s.onrender.com/register"
        const userDetails={
            username,
            password,
            email,
            role,
        }
        const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userDetails),
        }
        const response = await fetch(url,options)
        if (response.ok===true){
            this.setState({errorMessage:"successfully registered"})
        }
        else{
            this.setState({errorMessage:"user already registered"})
        }
    }

    render(){
        const {username,password,email,role,errorMessage}  = this.state
        
        return (
            <div className="register-container">
                <h3>Register Here</h3>
                <form className='registration-form' onSubmit={this.onSubmitRegisterDetails}>
                    <div className='user-section-container'>
                        <label htmlFor="user">Username</label>
                        <br/>
                        <input type="text" 
                        onChange={this.onChangeUserName} 
                        value={username}
                        required 
                        placeholder="Username" 
                        id="user"/>
                    </div>
                    <div className='password-section-container'>
                        <label htmlFor="password">Password</label>
                        <br/>
                        <input type="password" 
                        value={password}
                        onChange={this.onChangePassword}
                         required placeholder="Password" 
                         id="password"/>
                    </div>
                    <div className='email-section-container'>
                        <label htmlFor="email">Email</label>
                        <br/>
                        <input type="email" 
                        required
                        value={email}
                         onChange={this.onChangeEmail} 
                        placeholder="Email" 
                        id="email"/>
                    </div>
                    <div className='role-section-container'>
                        <label htmlFor="role">Role</label>
                        <br/>
                        <select id="role" value={role} onChange={this.onChangeOptions} required>
                            <option value="">Select Role</option>  {/* Optional default value */}
                            <option value="Admin">Admin</option>
                            <option value="Member">Member</option>
                        </select>

                    </div>
                    <button type="submit" className='submit-btn'>Register</button>
                </form>
                <p>{errorMessage}</p>
                <Link to="/">
                    <button className='login-here-button'>Click to Login Here</button>
                </Link>
            </div>
        )
    }
}



export default RegistraionPage
