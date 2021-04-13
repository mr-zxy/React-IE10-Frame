import React from 'react';
import './index.scss';
import SidebarItem from "./sidebarItem";

export default class Sidebar extends React.Component {
    render(props) {
        return (
            <div className="sidebar-wrapper">
                <SidebarItem location={this.props.location}/>
            </div>
        );
    }
}