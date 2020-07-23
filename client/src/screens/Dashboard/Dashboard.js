import React, { Component } from 'react'
import { connect } from 'react-redux'

import GithubIcon from 'react-ionicons/lib/LogoGithub'

import classes from './Dashboard.module.css'

class Dashboard extends Component {

    render() {
        return (
            <div className={classes.Main}>
                <div className = {classes.Content}>

                    <div className={classes.ProfileInfo}>
                        <img src={this.props.imageURL} />

                        <div className={classes.Name}>
                            {this.props.name}
                        </div>  

                        <div className={classes.Username}>
                            <div>
                                <GithubIcon fontSize="26px"/> 
                            </div>
                            <p>{this.props.username}</p>
                        </div>

                        <div className={classes.Bio}>
                            <p>{this.props.bio}</p>
                        </div>

                        <div className={classes.Stats}>
                            <strong>{this.props.pathwaysCompleted}</strong> pathways completed<br></br>
                            <strong>{this.props.pathwaysOngoing}</strong> pathways ongoing<br></br>
                            <strong>{this.props.pathwaysCreated}</strong> pathways created
                        </div>

                        <div className={classes.CreatePathwayBtn}>
                            Create Pathway
                        </div>

                    </div>
                    <div className={classes.DashboardContent}>
                        DashboardContent
                    </div>
                </div>
                Dashboard
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.user.name,
        bio: state.user.bio,
        imageURL: state.user.imageURL,
        username: state.user.username,
        pathwaysCreated: state.user.pathwaysCreated,
        pathwaysCompleted: state.user.pathwaysCompleted,
        pathwaysOngoing: state.user.pathwaysOngoing
    }
}

export default connect(mapStateToProps)(Dashboard)
