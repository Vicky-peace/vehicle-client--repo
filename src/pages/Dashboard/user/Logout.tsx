import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { logout } from "../../../sevices/slices/authSlice";
const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }
  return (
    <ListItem button onClick={handleLogout} className="hover:bg-gray-700">
            <ListItemIcon className="text-white">
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>
  )
}

export default Logout