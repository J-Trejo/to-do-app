import React from 'react';

class SelectDrop extends React.Component{

    render(){




        return(
            <select className="pull-left">
				<option value="all">all</option>
				<option value="active">active</option>
				<option value="complete">complete</option>
			</select>

        )
    }


}

export default SelectDrop;