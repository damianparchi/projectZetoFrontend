import React from "react";
import { useSelector} from "react-redux";
import authToken from "../utils/authToken";
import {Alert} from "react-bootstrap";

const Home = () => {
    if(localStorage.jwtToken) {
        authToken(localStorage.jwtToken);
    }

    const auth = useSelector((state) => state.auth);

    return <Alert style={{opacity: 0.9, padding: '50px',backgroundColor: 'cadetblue', color: "#ffffff", fontFamily: "Montserrat",
        fontWeight: "500px",textAlign: "center", fontSize:"28px"}}>Witaj  {auth.username}!</Alert>
}


export default Home;