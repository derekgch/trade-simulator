import React, { Component } from 'react';
import { chartRange } from '../Adapter';
import { Button } from 'semantic-ui-react'
import { v4 } from 'uuid';



class RangePicker extends Component {

    handleClick=(event, {name})=>{
        // console.log(name)
        this.props.selectRange(name);
    }

    generateButton =()=>{
        return chartRange.map(e=>{
            return <Button key={v4()} onClick={this.handleClick} name={e}>{e.toUpperCase()}</Button>
        })
    }
    render() {

        return (
            <div>
                  <Button.Group>
                    {this.generateButton()}
                </Button.Group>
            </div>
        );
    }
}

export default RangePicker;