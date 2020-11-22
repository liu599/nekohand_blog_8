import React, {Component} from 'react';
import {requireModel} from "@symph/joy/controller";
import NekoModel from "../../models/model";
import controller from "@symph/joy/controller";
import {autowire} from '@symph/joy/autowire';


// @requireModel(NekoModel)          // register model
@controller((state) => {              // state is store's state
    return {
        model: state.nekoblog // bind model's state to props
    }
})

class AppController extends Component {

    // constructor () {
    //     super(...arguments);
    //     this.state = {
    //         isLoading: false
    //     }
    // }
    @autowire()
    nekoModel: NekoModel;

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