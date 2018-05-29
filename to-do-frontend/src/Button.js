import React from 'react';

class Button extends React.Component{
    

    render(){
    
      //let disabled = this.props.notScratched();
        
        return(
            <button onClick={()=>{ this.props.removeDone(this.props.completed) } } 
                    className="pull-right btn btn-default" >Clear Complete
            </button>
        )
    }


}

export default Button;