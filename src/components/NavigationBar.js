import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {logoutUser} from "../services/index";
import {
    faCalendar,
    faPlusSquare,
    faSignInAlt,
    faSignOutAlt,
    faTasks,
    faUserPlus,
    faUsers
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../assets/css/Style.css';
const NavigationBar = () => {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsers();
    },[]);

    function getUsers() {
        fetch("http://localhost:8080/user/users").then(
            (result) => {
                result.json().then((resp)=> {
                    console.warn(resp);
                    setUsers(resp);
                    setRole(resp[1].role.name)
                    
                })
            }
            )
        }
        

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(logoutUser())
    }

    const guestLinks = (
        <>
            <div className={"mr-auto"}></div>
            <Nav className={"navbar-right"}>
                <Link to={"login"} className="nav-link" style={{color: "white"}}><FontAwesomeIcon icon={faSignInAlt}/> Zaloguj się!</Link>
            </Nav>
        </>
    );

    const userLinks = (
        <>
            <Nav className={"mr-auto"}>
                <Link to={"/add"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faPlusSquare}/> Dodaj Task</Link>
                <Link to={"list"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faTasks}/> Lista Tasków</Link>
                <Link to={"users"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faUsers}/> Lista Użytkowników</Link>
            </Nav>
            <Nav className={"navbar-right"}>
                <Link to={"register"} style={{color: "white"}} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Zarejestruj użytkownika!</Link>
                <Link to={"logout"} style={{color: "white"}} className="nav-link" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt}/> Wyloguj się!</Link>
            </Nav>
        </>
    );

    const admin = role;
    console.log(admin);

    return (
        <div>
            <Navbar bg="info" style={{opacity:"0.8"}} variant="dark">
                <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand text-white">
                    <FontAwesomeIcon icon={faCalendar}/> System pracy zdalnej
                </Link>
                {auth.isLoggedIn ? userLinks : guestLinks}
                {/* {role.name ? "ADMIN" : "USER"} */}
            </Navbar>
        </div>
    );
}

export default NavigationBar;
