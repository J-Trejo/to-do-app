import React from 'react';

class InputForm extends React.Component{
    
    constructor(){
        super();
        this.state ={
            value: null
        }
        this.collectTodoData = this.collectTodoData.bind(this);  
    }
    collectTodoData(event){
        event.preventDefault();
        
        let todoItem = this.refs.todoItem;
        let text = this.refs.todoItem.value;
        
        todoItem.value = "";
        this.props.formSubmit(text);
        
    }

    render(){


        return(
            
                <form onSubmit={ this.collectTodoData }>
                    <div className="input-group">
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="submit">Add</button>
                        </span>
                        <input type="text" name="todoItem" ref="todoItem"  className="form-control" placeholder="add a todo" value={this.state.value} />
                    </div>
                </form>  
           
        )
    }

}

export default InputForm;