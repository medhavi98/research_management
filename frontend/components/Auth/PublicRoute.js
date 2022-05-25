import {
    Route,
    Navigate,
    Outlet
} from 'react-router-dom';
import { getUserSessionDetails } from '../../helpers/userSessionHandler';

const PublicRoute = ({ children, ...rest }) => {
    const { isLoggedIn } = getUserSessionDetails();
    return (
        isLoggedIn ? <Navigate to="/" /> : <Outlet />
    );
}

export default PublicRoute;