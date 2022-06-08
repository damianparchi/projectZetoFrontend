import React, {Component} from "react";
import {connect} from "react-redux";

import {saveTask, fetchTask, updateTask, fetchPriorities, fetchStatus} from "../../services/index";
import {Card, Form, Button, Col} from "react-bootstrap";
import {faList, faPlusSquare, faSave, faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import MyToast from "../MyToast";
import axios from "axios";


class Task extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            statusy: [],
            priorytety: [],
            show: false
        }
    }

    initialState = {
        id: '', tytul:'', opis:'', typ:'', przydzielonoDla:'', deadline:'', firma:'', status:'', priorytet: ''
    }

    componentDidMount() {
        const taskId = +this.props.match.params.id;
        if(taskId) {
            this.findTaskById(taskId);
        }
        this.findAllPriorytety();
        this.findAllStatusy();
    }

    findAllPriorytety = () => {
        axios.get("http://localhost:8080/tasks/priorytety")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    priorytety: [{value:'', display:'Ustal priorytet'}]
                        .concat(data.map(priorytet => {
                            return {value:priorytet, display:priorytet}
                        }))
                });
            });
    };

    findAllStatusy = () => {
        axios.get("http://localhost:8080/tasks/statusy")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    statusy: [{value:'', display:'Ustal status'}]
                        .concat(data.map(status => {
                            return {value:status, display:status}
                        }))
                });
            });
    };

    // findAllPriorytety = () => {
    //     this.props.fetchPriorities();
    //     setTimeout(() => {
    //         let taskPriorities = this.props.taskObject.priorytety;
    //         if(taskPriorities) {
    //             this.setState({
    //                 priorytety: [{value:'', display:'Wybierz priorytety'}]
    //                     .concat(taskPriorities.map(priorytet => {
    //                         return {value: priorytet, display: priorytet}
    //                     }))
    //             })
    //             this.findAllStatusy();
    //         }
    //     }, 100)
    // }
    //
    // findAllStatusy = () => {
    //     this.props.fetchStatus();
    //     setTimeout(() => {
    //         let taskStatusy = this.props.taskObject.statusy;
    //         if(taskStatusy) {
    //             this.setState({
    //                 statusy: [{value:'', display:'Wybierz status'}]
    //                     .concat(taskStatusy.map(status => {
    //                         return {value: status, display: status}
    //                     }))
    //             })
    //         }
    //     }, 100)
    // }

    findTaskById = (taskId) => {
        this.props.fetchTask(taskId);
        setTimeout(() => {
            let task = this.props.taskObject.task;
            if(task != null) {
                this.setState({
                    id: task.id,
                    tytul: task.tytul,
                    opis: task.opis,
                    typ: task.typ,
                    przydzielonoDla: task.przydzielonoDla,
                    deadline: task.deadline,
                    firma: task.firma,
                    priorytet: task.priorytet,
                    status: task.status
                })
            }
        }, 1000)

    }

    resetTask = () => {
        this.setState(() => this.initialState);
    }


    submitTask = event => {
        event.preventDefault();

        const task = {
            tytul: this.state.tytul,
            opis: this.state.opis,
            typ: this.state.typ,
            przydzielonoDla: this.state.przydzielonoDla,
            deadline: this.state.deadline,
            firma: this.state.firma,
            priorytet: this.state.priorytet,
            status: this.state.status

        };

        this.props.saveTask(task)
        setTimeout(() => {
            if (this.props.taskObject.task != null) {
                this.setState({"show": true, "method": "post"});
                setTimeout(() => this.setState({"show": false}), 1500);
                setTimeout(() => this.taskList(), 1000);
            } else {
                this.setState({"show": false});
            }
        }, 1000);
        this.setState(this.initialState);
    }

    updateTask = event => {
        event.preventDefault();

        const task = {
            id: this.state.id,
            tytul: this.state.tytul,
            opis: this.state.opis,
            typ: this.state.typ,
            przydzielonoDla: this.state.przydzielonoDla,
            deadline: this.state.deadline,
            firma: this.state.firma,
            priorytet: this.state.priorytet,
            status: this.state.status
        };

        this.props.updateTask(task);
        setTimeout(() => {
            if(this.props.taskObject.task != null) {
                this.setState({"show": true, "method":"put"});
                setTimeout(()=> this.setState({"show":false}), 1500);
                setTimeout(()=> this.taskList(), 1500);
            } else {
                this.setState({"show": false});
            }
        }, 2000)
        this.setState(this.initialState);
    }

    taskChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    taskList = () => {
        return this.props.history.push("/list");
    }

    render() {
        const {tytul, opis, typ, przydzielonoDla, deadline, firma, priorytet, status} = this.state;

        return(
            <div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare}/> {this.state.id ? "Aktualizuj Task" : "Dodaj Task"}</Card.Header>
                    <Form onReset={this.resetTask} onSubmit={this.state.id ? this.updateTask : this.submitTask} id="taskFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTytul"}>
                                    <Form.Label>Tytul</Form.Label>
                                    <Form.Control
                                        name="tytul" required autoComplete="off"
                                        value={tytul}
                                        onChange={this.taskChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj tytuł taska" />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridOpis"}>
                                    <Form.Label>Opis</Form.Label>
                                    <Form.Control
                                        name="opis" required autoComplete="off"
                                        value={opis}
                                        onChange={this.taskChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj opis taska" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridTyp"}>
                                    <Form.Label>Typ</Form.Label>
                                    <Form.Control
                                        name="typ" required autoComplete="off"
                                        value={typ}
                                        onChange={this.taskChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj typ taska" />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridPrzydzielonoDla"}>
                                    <Form.Label>Przydzielono dla</Form.Label>
                                    <Form.Control
                                        name="przydzielonoDla" required autoComplete="off"
                                        value={przydzielonoDla}
                                        onChange={this.taskChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj nazwę użytkownika" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId={"formGridDeadline"}>
                                    <Form.Label>Deadline</Form.Label>
                                    <Form.Control
                                        name="deadline" required autoComplete="off"
                                        value={deadline}
                                        onChange={this.taskChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj deadline taska" />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridFirma"}>
                                    <Form.Label>Firma</Form.Label>
                                    <Form.Control
                                        name="firma" required autoComplete="off"
                                        value={firma}
                                        onChange={this.taskChange}
                                        type="text"
                                        className={"bg-dark text-white"}
                                        placeholder="Podaj nazwę firmy" />
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridPriorytet"}>
                                    <Form.Label>Priorytet</Form.Label>
                                    <Form.Control as="select"
                                        custom onChange={this.taskChange}
                                        name="priorytet" value={priorytet}
                                        className={"bg-dark text-white"}>
                                        {this.state.priorytety.map(priorytet =>
                                            <option key={priorytet.value} value={priorytet.value}>
                                                {priorytet.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId={"formGridStatus"}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control as="select"
                                                  custom onChange={this.taskChange}
                                                  name="status" value={status}
                                                  className={"bg-dark text-white"}>
                                        {this.state.statusy.map(status =>
                                            <option key={status.value} value={status.value}>
                                                {status.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button variant={"success"} type={"submit"}>
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Aktualizuj" : "Zatwierdź"}
                            </Button>{' '}
                            <Button variant={"info"} type={"reset"}>
                                <FontAwesomeIcon icon={faUndo}/> Wyczyść
                            </Button>{' '}
                            <Button variant={"info"} type={"button"} onClick={() => this.taskList()}>
                                <FontAwesomeIcon icon={faList}/> Lista Tasków
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show ={ this.state.show} message = {this.state.method ==="put" ? "Task zaktualizowano pomyślnie!" : "Task dodano pomyślnie!"} type = {"success"}/>
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
        saveTask: (task) => dispatch(saveTask(task)),
        fetchTask: (taskId) => dispatch(fetchTask(taskId)),
        updateTask: (task) => dispatch(updateTask(task)),
        fetchPriorities: () => dispatch(fetchPriorities()),
        fetchStatus: () => dispatch(fetchStatus())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Task);