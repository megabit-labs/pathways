import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './PathwayDetails.module.css'
import * as actions from '../../store/actions/index'

import Modal from '../Modal/Modal'

class PathwayDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            description: this.props.description,
            newTag: '',
        }
    }

    onTextChange = (e, field) => {
        this.setState({
            [field]: e.target.value,
        })
    }

    savePathwayDetails = () => {
        this.props.updatePathwayDetails(this.state.name, this.state.description)
        this.props.hidePathwayDetailsScreen()
    }

    addTag = () => {
        this.setState({
            newTag: '',
        })
        this.props.addTag(this.state.newTag)
    }

    removeTag = (tag) => {
        this.props.removeTag(tag)
    }

    render() {
        let { showPathwayDetailsScreen } = this.props

        return (
            <Modal
                show={showPathwayDetailsScreen}
                modalClosed={this.props.hidePathwayDetailsScreen}
            >
                <input
                    className={classes.InputField}
                    placeholder='Enter Name of Pathway'
                    onChange={(e) => this.onTextChange(e, 'name')}
                    value={this.state.name}
                />
                <textarea
                    className={classes.InputField}
                    placeholder='Enter Description of Pathway'
                    rows={5}
                    onChange={(e) => this.onTextChange(e, 'description')}
                    value={this.state.description}
                />
                <div className={classes.tagsContainer}>
                    <div className={classes.addTagsArea}>
                        <input
                            className={classes.InputFieldSmall}
                            placeholder='Add Tags'
                            onChange={(e) => this.onTextChange(e, 'newTag')}
                            value={this.state.newTag}
                        />
                        <div
                            className={classes.ActionButton}
                            aria-hidden='true'
                            onClick={this.addTag}
                        >
                            Add
                        </div>
                    </div>
                    <div className={classes.displayTagsArea}>
                        {this.props.tags.map((tag) => {
                            return (
                                <div
                                    key={tag}
                                    className={classes.tag}
                                    onClick={() => this.removeTag(tag)}
                                >
                                    {tag}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div
                    className={classes.ActionButton}
                    aria-hidden='true'
                    onClick={() => {
                        this.savePathwayDetails()
                    }}
                >
                    Done
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.createEditPathway.pathwayName,
        description: state.createEditPathway.pathwayDescription,
        tags: state.createEditPathway.pathwayTags,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatePathwayDetails: (name, description) =>
            dispatch(actions.updatePathwayDetails(name, description)),
        addTag: (tag) => dispatch(actions.addTag(tag)),
        removeTag: (tag) => dispatch(actions.removeTag(tag)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PathwayDetails)
