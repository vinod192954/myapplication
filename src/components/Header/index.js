import { withRouter } from "react-router-dom"
import Cookies from "js-cookie";
import { BiLogOut } from "react-icons/bi";
import './index.css'

const Header = (props) => {
    const onLogoutUser=()=>{
        const {history} = props 
        Cookies.remove("jwt_token")
        history.replace("/")
    }

    return (
        <nav className="header-bg-container">
            <h1>TaskManager</h1>
            <button className="button-logout" onClick={onLogoutUser}>
            <BiLogOut color="white" size={25} />
        </button>
        </nav>
    )
}

export default withRouter(Header)
