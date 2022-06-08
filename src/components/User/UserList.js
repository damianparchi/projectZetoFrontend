import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchUsers} from "../../services/index";
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


class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            obecnaStrona: 1,
            usersNaStrone: 5,
        };
    }

    componentDidMount() {
        //this.findAllRandomUsers();
        this.props.fetchUsers();
    }

    // findAllRandomUsers() {
    //     axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole")
    //         .then(response => response.data)
    //         .then((data) => {
    //             this.setState({users: data});
    //         });
    // };

    zmienStrone = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        })
    }

    pierwszaStrona = () => {
        if(this.state.obecnaStrona >1) {
            this.setState({
                obecnaStrona: 1
            })
        }
    }

    poprzedniaStrona = () => {
        if(this.state.obecnaStrona >1) {
            this.setState({
                obecnaStrona: this.state.obecnaStrona - 1
            })
        }
    }

    ostatniaStrona = () => {
        let usersLength = this.props.userData.users.length;
        if(this.state.obecnaStrona < Math.ceil(usersLength / this.state.usersNaStrone)) {
            this.setState({
                obecnaStrona: Math.ceil(usersLength / this.state.usersNaStrone)
            })
        }
    }

    nastepnaStrona = () => {
        if(this.state.obecnaStrona < Math.ceil(this.props.userData.users.length / this.state.usersNaStrone)) {
            this.setState({
                obecnaStrona: this.state.obecnaStrona + 1
            })
        }
    }

    render() {
        const {obecnaStrona, usersNaStrone} = this.state;
        const ostatniIndeks = obecnaStrona * usersNaStrone;
        const pierwszyIndeks = ostatniIndeks - usersNaStrone;

        const userData = this.props.userData;
        const users = userData.users;
        const obecniUsers = users && users.slice(pierwszyIndeks, ostatniIndeks);
        const wszystkieStrony = users.length / usersNaStrone;

        return (

            <div>
                {userData.erorr ?
                    <Alert variant={"danger"}>
                        {userData.error}

                    </Alert> :
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={faUser}/> Lista użytkowników</Card.Header>
                        <Card.Body>
                            <Table bordered hover striped variant="dark">
                                <thead>
                                <tr>
                                    <td>Imie i Nazwisko</td>
                                    <td>E-mail</td>
                                    <td>Adres</td>
                                    <td>Utworzono</td>
                                    <td>Stan konta</td>
                                </tr>
                                </thead>
                                <tbody>
                                {users.length === 0 ?
                                    <tr>
                                        <td colSpan={6}>Brak dostępnych użytkowników.</td>
                                    </tr> :
                                    obecniUsers.map((user, index) =>(
                                        <tr key={index}>
                                            <td>{user.first}{' '}{user.last}</td>
                                            <td>{user.email}</td>
                                            <td>{user.address}</td>
                                            <td>{user.created}</td>
                                            <td>{user.balance}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </Card.Body>
                        {users.length > 0 ?
                            <Card.Footer>
                                <div style={{"float": "left"}}>
                                    Strona {obecnaStrona} z {wszystkieStrony}
                                </div>
                                <div style={{"float": "right"}}>
                                    <InputGroup size={"sm"}>
                                        <InputGroup.Prepend>
                                            <Button type={"button"} variant={"outline-info"}
                                                    disabled={obecnaStrona === 1 ? true : false}
                                                    onClick={this.pierwszaStrona}>
                                                <FontAwesomeIcon icon={faFastBackward}/>Pierwsza
                                            </Button>
                                            <Button type={"button"} variant={"outline-info"}
                                                    disabled={obecnaStrona === 1 ? true : false}
                                                    onClick={this.poprzedniaStrona}>
                                                <FontAwesomeIcon icon={faStepBackward}/>Poprzednia
                                            </Button>
                                        </InputGroup.Prepend>
                                        <FormControl className={"stronaCss bg-dark"} name="obecnaStrona"
                                                     value={obecnaStrona}
                                                     onChange={this.zmienStrone}/>
                                        <InputGroup.Append>
                                            <Button type={"button"} variant={"outline-info"}
                                                    disabled={obecnaStrona === wszystkieStrony ? true : false}
                                                    onClick={this.nastepnaStrona}>
                                                <FontAwesomeIcon icon={faStepForward}/>Nastepna
                                            </Button>
                                            <Button type={"button"} variant={"outline-info"}
                                                    disabled={obecnaStrona === wszystkieStrony ? true : false}
                                                    onClick={this.ostatniaStrona}>
                                                <FontAwesomeIcon icon={faFastForward}/>Ostatnia
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </div>
                            </Card.Footer> : null
                        }
                    </Card>

                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userData: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);