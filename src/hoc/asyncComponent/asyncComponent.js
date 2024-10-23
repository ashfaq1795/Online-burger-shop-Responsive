import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            //when we import another page the old one become null.
            component: null
        }

        componentDidMount () {
            //importComponent() is a function which we get as an argument in asyncComponent function. this function use dynamic "import"  syntax and then give us promise  where we eventually get the component we want it to load and then render this component.
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }
        
        render () {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}
export default asyncComponent;