import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteTask} from "../../services";
import {ButtonGroup, Card, Table, Button, InputGroup, FormControl} from "react-bootstrap";
import {
    faEdit,
    faTasks,
    faTrash,
    faFastBackward,
    faFastForward,
    faStepBackward,
    faStepForward,
    faSearch, faTimes
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import MyToast from "../MyToast";
import {Link} from "react-router-dom";
import "../../assets/css/Style.css";

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            wyszukaj: '',
            obecnaStrona : 1,
            taskiNaStrone : 5,
            sortDir: "asc"

        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"})
            this.findAllTasks(this.state.obecnaStrona);
        }, 500)

    }

    componentDidMount() {
        this.findAllTasks(this.state.obecnaStrona);
    }

    findAllTasks(obecnaStrona) {
        obecnaStrona -= 1;
        axios.get("http://localhost:8080/tasks?pageNumber="+obecnaStrona+"&pageSize="+this.state.taskiNaStrone+"&sortBy=tytul&sortDir="+this.state.sortDir)
            .then(response => response.data)
            .then((data)=>{
                this.setState({
                    tasks: data.content,
                    wszystkieStrony: data.totalPages,
                    wszystkieElementy: data.totalElements,
                    obecnaStrona: data.number + 1
                });
            }).catch(error => {
                console.log(error);
                localStorage.removeItem('jwtToken');
                this.props.history.push('/logout');
        })
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(taskId);
        setTimeout(() => {
            if(this.props.taskObject != null) {
                this.setState({"show": true});
                setTimeout(()=> this.setState({"show":false}), 3000);
                this.findAllTasks(this.state.obecnaStrona)
            } else {
                this.setState({"show": false});
            }
        }, 500)
    };

    zmienStrone = event => {
        let targetPage = parseInt(event.target.value)
        if(this.state.wyszukaj) {
            this.wyszukajDane(targetPage);
        } else {
            this.findAllTasks(targetPage)
        }
        this.setState({
            [event.target.name]: targetPage
        })
    }

    pierwszaStrona = () => {
        let pierwszaStrona = 1;
        if(this.state.obecnaStrona > pierwszaStrona) {
            if(this.state.wyszukaj) {
                this.wyszukajDane(pierwszaStrona);
            } else {
                this.findAllTasks(pierwszaStrona)
            }
        }
    }

    poprzedniaStrona = () => {
        let poprzedniaStrona = 1;
        if(this.state.obecnaStrona > poprzedniaStrona) {
            if(this.state.wyszukaj) {
                this.wyszukajDane(this.state.obecnaStrona - poprzedniaStrona);
            } else {
                this.findAllTasks(this.state.obecnaStrona - poprzedniaStrona)
            }
        }
    }

    ostatniaStrona = () => {
        let temp = Math.ceil(this.state.wszystkieElementy / this.state.taskiNaStrone)
        if(this.state.obecnaStrona < temp) {
            if(this.state.wyszukaj) {
                this.wyszukajDane(temp);
            } else {
                this.findAllTasks(temp)
            }
        }
    }

    nastepnaStrona = () => {
        if(this.state.obecnaStrona < Math.ceil(this.state.wszystkieElementy / this.state.taskiNaStrone)) {
            if(this.state.wyszukaj) {
                this.wyszukajDane(this.state.obecnaStrona+1);
            } else {
                this.findAllTasks(this.state.obecnaStrona+1)
            }
        }
    }

    wyszukajChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    wyszukajReset = () => {
        this.setState({"wyszukaj" : ''});
        this.findAllTasks(this.state.obecnaStrona);
    };

    wyszukajDane = (obecnaStrona) => {
        obecnaStrona -= 1;
        axios.get("http://localhost:8080/tasks/wyszukaj/"+this.state.wyszukaj+"?page="+obecnaStrona+"&size="+this.state.taskiNaStrone)
            .then(response => response.data)
            .then((data)=>{
                this.setState({
                    tasks: data.content,
                    wszystkieStrony: data.totalPages,
                    wszystkieElementy: data.totalElements,
                    obecnaStrona: data.number + 1
                });
            });
    };




    render() {
        const {tasks, obecnaStrona, wszystkieStrony, wyszukaj} = this.state;

        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faTasks}/> Lista tasków
                        </div>
                        <div style={{"float":"right"}}>
                            <InputGroup size="sm">
                                <FormControl placeholder="Wyszukaj" name="wyszukaj" value={wyszukaj}
                                             className={"wyszukaj-ramka bg-dark text-white"}
                                             onChange={this.wyszukajChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.wyszukajDane}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.wyszukajReset}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                            <tr>
                                <th onClick={this.sortData}>Tytul<div className={this.state.sortDir === "asc" ? "strzalka strzalka-gora" : "strzalka strzalka-dol" }> </div></th>
                                <th>Opis</th>
                                <th>Typ</th>
                                <th>Przydzielono dla</th>
                                <th>Deadline</th>
                                <th>Firma</th>
                                <th>Priorytet</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                tasks.length === 0 ?
                                    <tr align={"center"}>
                                        <td colSpan={"9"}>Dostępne taski</td>
                                    </tr> :
                                    tasks.map((task)=>(
                                        <tr key={task.id}>
                                            <td>{task.tytul}</td>
                                            <td>{task.opis}</td>
                                            <td>{task.typ}</td>
                                            <td>{task.przydzielonoDla}</td>
                                            <td>{task.deadline}</td>
                                            <td>{task.firma}</td>
                                            <td>{task.priorytet}</td>
                                            <td>{task.status}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"/edit/"+task.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit}/></Link>{' '}
                                                    <Button size={"sm"} variant={"outline-danger"} onClick={() => this.deleteTask(task.id)}><FontAwesomeIcon icon={faTrash}/></Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    ))
                            }
                            </tbody>
                        </Table>
                    </Card.Body>
                    {tasks.length > 0 ?
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
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Task usunięto pomyślnie"} type={"danger"}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        taskObject: state.task
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTask: (taskId) => dispatch(deleteTask(taskId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);