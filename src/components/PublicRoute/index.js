import { Route, Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = (props) => {
    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
        return <Redirect to="/taskmanager" />;
    }
    return <Route {...props} />;
};

export default PublicRoute;
