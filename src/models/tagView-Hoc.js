import React, {Component} from 'react'
export const TagViewModel = param => WrappedComponent =>{
    return class extends Component {
        render() {
            return (<WrappedComponent {...this.props}></WrappedComponent>)
        }
    }
}

/**
 * 反向继承
 export const HomeModel=WrappedComponent=>class extends WrappedComponent{
    render() {
        return super.render();
    }
}
 **/
