import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'

import classes from './PathwayDetails.module.css'
import * as actions from '../../store/actions/index'

import Modal from '../Modal/Modal'
import generateId from '../../utils/generateId'
import * as mutations from '../../utils/mutations/updatePathway'

class PathwayDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.name,
            description: this.props.description,
            tags: this.props.tags,
            newTag: '',
            errors: ''
        }
    }

    onTextChange = (e, field) => {
        this.setState({
            [field]: e.target.value,
        })
    }

    updatePathwayError = err => {
        this.setState({
            ...this.state,
            errors: err
        })
    }

    savePathwayDetails = (createPathway) => {
        
        // if(this.state.name === "" || this.state.description === "") {
        //     this.setState({
        //         ...this.state,
        //         errors: 'Enter Valid Input'
        //     })
        //     return
        // }

        const pathwayId = this.props.id === '' ? generateId("pathway") : this.props.id
        this.props.updatePathwayDetails(this.state.id, this.state.name, this.state.description)

        // create a new pathway or update existing
        createPathway({
            variables: {
                id: "pathway_ 1603514311507_66325",
                name: "philosophy",
                steps: [],
                tags: ['no tag'],
                description: "kns"
            }
        })
        .then( res => {
            if(!res.errors) {
                if(res['data']['createUpdatePathway']['status'] === "ERROR") {
                    this.updatePathwayError(res['data']['createUpdatePathway']['message'])
                    return
                } else {
                    console.log("Pathway " + this.state.name + " has been added")
                    this.setState({
                        ...this.state,
                        errors: ''
                    })
                    this.props.hidePathwayDetailsScreen()
                }
            } else {
                console.log(res.errors)
                return
            }
        })
        .catch (e => {
            const err = JSON.parse(JSON.stringify(e))
            this.updatePathwayError(err)
            return
        })

    }

    addTag = () => {
        this.setState({
            ...this.state,
            tags: [...this.state.tags, this.state.newTag],
            newTag: '',
        })
        this.props.addTag(this.state.newTag)
    }

    removeTag = (tag) => {
        this.setState({
            ...this.state,
            tags: this.state.tags.filter((tagVal) => tagVal !== tag)
        })
        this.props.removeTag(tag)
    }

    render() {
        let { showPathwayDetailsScreen } = this.props
        let modalClosed = this.props.hidePathwayDetailsScreen
        if(this.props.modalCloseOnOverlay === false) {
            modalClosed = null
        }

        const FormValidationError = () => {
            if(this.state.errors !== "") {
                return(<div>{this.state.errors}</div>)
            } else {
                return(<span></span>)
            }
        }

        return (
            <Modal
                show={showPathwayDetailsScreen}
                modalClosed={modalClosed}
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
                <FormValidationError />
                <Mutation mutation={mutations.CREATE_UPDATE_PATHWAY} >
                    {(createPathway) => (
                        <div
                            className={classes.ActionButton}
                            aria-hidden='true'
                            onClick={() => {
                                this.savePathwayDetails(createPathway)
                            }}
                        >
                        Done
                        </div>
                    )}
                </Mutation>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.createEditPathway.pathwayId,
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
