import React from 'react';

class ClassCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        //this.increment = this.increment.bind(this);
        //this.decrement = this.decrement.bind(this);
        // при таком подходе при клике функцию не вызываем:
        //<button onClick={this.increment}>Increment</button>
        //<button onClick={this.decrement}>Decrement</button>
    } 

    increment() {
        this.setState({count: this.state.count + 1});
	}

	decrement() {
		this.setState({count: this.state.count - 1});
	}

    render() {
        return ( 
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={() => this.increment()}>Increment</button>
                <button onClick={() => this.decrement()}>Decrement</button>
            </div>
        );
    }
    
};

export default ClassCounter;