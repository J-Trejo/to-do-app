import React from 'react';
import Todo from './Todo'



class ListGroup extends React.Component{

    render(){

        let todoJSX = this.props.todos.map((todo)=>{
            return <Todo text={todo.text} 
                         completed={todo.completed}
                         id={todo._id} 
                         toggleComplete={ this.props.toggleComplete }
                         notScratched = { this.props.notScratched }
                         />;
        })
        
		return(
			<ul className="list-group">
               { todoJSX }
			</ul>
        )
    }
}

export default ListGroup;