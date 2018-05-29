import React from 'react';

class Todo extends React.Component{

	render(){

		return(
			
			<li className="list-group-item">
				<input onChange={()=>{ this.props.toggleComplete(this.props.id) } } className="pull-left" type="checkbox" checked={ this.props.completed } />
				<label className={this.props.completed === true ? "done" : "" }>{ this.props.text }</label>
			</li>
		)
    }


}

export default Todo;