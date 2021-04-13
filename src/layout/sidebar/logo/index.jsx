import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.scss';
import LogoImg from '@/assets/logo/logo.png';
import {connect} from 'react-redux'

class Logo extends Component {
    render() {
        return (
            <Link to="/home">
                <div className="logo-wrapper" style={{height: this.props.collapsed ? '32px' : React.$HEADER_HEIGHT}}>
                    <img src={LogoImg} alt="logo"/>
                    {this.props.collapsed ? "" : <h1>{React.$TITLE}</h1>}
                </div>
            </Link>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collapsed: state.utils.collapsed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Logo)
