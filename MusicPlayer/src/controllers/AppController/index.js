import React, {Component} from 'react';
// import {requireModel} from "@symph/joy/controller";

class AppController extends Component {

    async componentDidUpdate(prevProps) {
        let {dispatch} = this.props;
        if (this.props.location !== prevProps.location) {
            console.log("ROUTE CHANGED", this.props.location);
        }
    }

    render() {
        return (
            <React.Fragment>
                { this.props.children }
            </React.Fragment>
        );
    }
}

export default AppController;