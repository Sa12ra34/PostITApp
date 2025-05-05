import {Navbar,Nav, NavItem, NavLink } from "reactstrap"; 
//import logo from './logo.png';
import logo from '../Images/logo.png';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../Features/UserSlice";

const Header = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const handlelogout= async()=>{
  dispatch(logout());
  await new Promise((resolve) => setTimeout(resolve, 100));

    navigate("/login"); 

};

  return (
    <Navbar className="Header">
    <Nav>
  <NavItem>
    <Link><img src={logo}></img></Link>
  </NavItem>
  <NavItem>
    <Link to="/home">Home</Link>
  </NavItem>
  <NavItem>
    <Link to="/Profile">Profile</Link>
  </NavItem>
  
  <NavItem>
    <Link onClick={handlelogout}>Logout</Link>
  </NavItem>
 
</Nav>
</Navbar>


  );
};

export default Header;