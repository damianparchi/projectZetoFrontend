import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faFastBackward,
    faFastForward,
    faStepBackward,
    faStepForward,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {Card, InputGroup, Table, FormControl, Button, Alert} from "react-bootstrap";
import "../../assets/css/Style.css";

function UserrList() {
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
                })
            }
        )
    }

    return(
        <>
        <div>
            
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={faUser}/> Lista użytkowników</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <td>Nazwa</td>
                                    <td>E-mail</td>
                                    <td>Numer Telefonu</td>
                                    <td>Rola</td>
                                </tr>
                                </thead>
                                <tbody>
                                {users.length === 0 ?
                                    <tr>
                                        <td colSpan={6}>Brak dostępnych użytkowników.</td>
                                    </tr> :
                                    users.map((user, index) =>(
                                        <tr key={index}>
                                            <td>{user.name}{' '}{user.last}</td>
                                            <td>{user.email}</td>
                                            <td>{user.mobile}</td>
                                            <td>{user.role.name}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                        {users.length > 0 ?
                            <Card.Footer>
                                <div style={{"float": "left"}}>
                                    {/* Strona {obecnaStrona} z {wszystkieStrony} */}
                                </div>
                                <div style={{"float": "right"}}>
                                    <InputGroup size={"sm"}>
                                        <InputGroup.Prepend>
                                            <Button type={"button"} variant={"outline-info"}
                                                    // disabled={obecnaStrona === 1 ? true : false}
                                                    // onClick={this.pierwszaStrona}
                                                    >
                                                <FontAwesomeIcon icon={faFastBackward}/>Pierwsza
                                            </Button>
                                            <Button type={"button"} variant={"outline-info"}
                                                    // disabled={obecnaStrona === 1 ? true : false}
                                                    // onClick={this.poprzedniaStrona}
                                                    >
                                                <FontAwesomeIcon icon={faStepBackward}/>Poprzednia
                                            </Button>
                                        </InputGroup.Prepend>
                                        <FormControl className={"stronaCss bg-dark"} name="obecnaStrona"
                                                    //  value={obecnaStrona}
                                                    //  onChange={this.zmienStrone}
                                                    />
                                        <InputGroup.Append>
                                            <Button type={"button"} variant={"outline-info"}
                                                    // disabled={obecnaStrona === wszystkieStrony ? true : false}
                                                    // onClick={this.nastepnaStrona}
                                                    >
                                                <FontAwesomeIcon icon={faStepForward}/>Nastepna
                                            </Button>
                                            <Button type={"button"} variant={"outline-info"}
                                                    // disabled={obecnaStrona === wszystkieStrony ? true : false}
                                                    // onClick={this.ostatniaStrona}
                                                    >
                                                <FontAwesomeIcon icon={faFastForward}/>Ostatnia
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Card.Footer> : null
                        }
                    </Card>

                
            </div>
        
        </>
    )
}

export default UserrList;