import React, { Component } from 'react';
import './App.css';
import InputForm from'./InputForm';
import ListGroup from './ListGroup';
import Button from './Button';
import axios from 'axios';


class App extends Component {

    
    constructor(){
        super();
        this.state = {
               
            todos : [
                {
                    _id:1,
                    text:'',
                    completed:false    
                }
         
            ],
            
            firstId: 1,

        };
        
        this.addTodo = this.addTodo.bind(this);
        this.toggleComplete = this.toggleComplete.bind(this);
        this.removeDone = this.removeDone.bind(this);
       // this.notScratched = this.notScratched.bind(this);
       
    }

    componentDidMount(){
        axios.get('http://localhost:8080/todos')
            .then(results => {
                console.log(results.data);
                this.setState({
                    todos: results.data,
                    firstId: this.state.firstId + 1
                });
            })
            .catch(error => {
                console.log(error);
            });
    } 
   
    
   
    addTodo(text){
        
        let newTodo = {
            text: text,
            completed:false,
            
        };
		//let todoCopy = Array.from(this.state.todos);
        //todoCopy.push(newTodo);
        axios.post('http://localhost:8080/todos',  
                    newTodo)  
            .then(result => {
                //console.log(result.data);
                axios.get('http://localhost:8080/todos').then(results => {
                    //console.log(results.data);
                    this.setState({
                        todos: results.data,
                    });
                    //console.log(this.state.todos);
                });
            })
            .catch(error => {
                console.log(error);
            });
		
		//console.log(this.state.todos);
    } 

    removeDone() {
        let done = Array.from(this.state.todos);
            done = done.filter(function (el) {
                return el.completed === false;
            });
       
        this.setState({
            todos:done
        });
    }

    // notScratched() {
    //     let disabled=false;
    //     let notDoneItem = Array.from(this.state.todos);
        
    //     for (let i = 0; i < notDoneItem.length; i++) {
            
	// 		if (notDoneItem[i].complete === false) {
    //             disabled = !disabled;
                 
    //         }
          
    //     }
        
    // }

    toggleComplete(id) {
		
		let toDosCopy = Array.from(this.state.todos);
		  
		for (let i = 0; i < toDosCopy.length; i++) {
            //let id = toDosCopy[i]._id;
            //console.log(toDosCopy[i]._id);
			if (toDosCopy[i]._id === id) {
				toDosCopy[i].completed = !toDosCopy[i].completed;
				break;
			}
        }
        
        
        this.setState({
            todos: toDosCopy
        });
	}
    
    render(){

	return (
			<div className="App">
				<div className="container">
					<h1 className="text-center">My To-dos</h1>

					<InputForm formSubmit={ this.addTodo } />
					<ListGroup todos={ this.state.todos } 
                               toggleComplete = { this.toggleComplete }
                               
                               />
					<Button removeDone={ this.removeDone }  
                            toggleComplete = { this.toggleComplete }
                            notScratched = { this.notScratched }
                            />
					
				</div>
			</div>
		);
 	}
}

export default App;
