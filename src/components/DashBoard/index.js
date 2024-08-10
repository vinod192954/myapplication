import { Component } from 'react'
import Cookies from "js-cookie"
import {jwtDecode} from 'jwt-decode';

import './index.css'
import ViewDashBoard from '../ViewDashBoard'

class DashBoard extends Component{
    state = {name:'',role:''}
    componentDidMount(){
        this.getProfileDetails()
    }

    getProfileDetails=async()=>{
       const jwtToken = Cookies.get("jwt_token") 
       const decodeToken = jwtDecode(jwtToken)
       const userId = decodeToken.id 
       const url = `https://taskmanagerbackend-ei4s.onrender.com/users/${userId}` 
       const options ={method:"GET"}
       const response = await fetch(url,options) 
       const data = await response.json()
      const {username,role} = data 
      this.setState({name:username,role:role})
    }

    render(){
        const {name,role} = this.state
        return (
            <div className='dashboard'>
                <div className='img-name-role-bg-container'>
                    <div>
                        <img className='profile-img' alt="profile" src='https://res.cloudinary.com/dndswwhrh/image/upload/v1723040812/user-profile-icon-free-vector_kcjvtx.jpg'/>
                    </div> 
                    <div className='name-role-section'>
                        <p>{`Name: ${name}`}</p>
                        <p>{`Role: ${role}`}</p>
                    </div>
                </div> 
                <ViewDashBoard/>             
            </div>
        )
    }
}

export default DashBoard
