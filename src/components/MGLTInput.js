import React from 'react';
import './MGLTInput.css';

class MGLTInput extends React.Component {
    static defaultProps = {
        defaultValue: '',
        onChange: () => {}
    }

    constructor(props) {
        super(props)
        this.state = this.calcState(this.props.defaultValue.toString())
    }

    calcState = oldMGLT => {
        oldMGLT = oldMGLT.replace(/\s/g, '') //convert back from display value
        oldMGLT = isNaN(oldMGLT)? oldMGLT.slice(0, -1) : oldMGLT //number validation 

        //format number for display
        let MGLT
        if(oldMGLT.includes('.')) MGLT = oldMGLT.split(/(?=(?:...)*...\.)/).join(' ')
        else MGLT = oldMGLT.split(/(?=(?:...)*$)/).join(' ')

        return {MGLT, value: +oldMGLT}
    }

    onChangeHandler = ({target: {value}}) => {
        const newState = this.calcState(value)
        this.props.onChange(newState.value)
        this.setState(newState)
    }

    render() {
        return (
            <div className="MGLTInput">
                <input
                    value={this.state.MGLT}
                    onChange={this.onChangeHandler}
                />
                <span>MGLT</span>
            </div>
        )
    }
}

export default MGLTInput;
