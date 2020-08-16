import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from './Pathway.module.css'
import Node from '../../components/Node/Node'
import StepDescription from '../../components/StepDescription/StepDescription'
import Ill from '../../assets/dummy.png'
import * as actions from '../../store/actions/index'

class Pathway extends Component {
    pathwayRef = React.createRef()

    state = {
        pos: [],
        top: 0,
        showStep: false,
        activeStep: null,
        totalSteps: 0,
        url: null,
    }

    goLeft = () => {
        let pos
        for (let i = 0; i < this.props.pathway.steps.length; i++) {
            if (this.props.pathway.steps[i].id === this.state.activeStep.id) {
                pos = i
            }
        }
        if (pos === 0) {
            return
        } else {
            this.setState({ activeStep: this.props.pathway.steps[pos - 1] })
        }
        let ele = document.getElementById(this.props.pathway.steps[pos - 1].id)
        let elePos = window.pageYOffset + ele.getBoundingClientRect().top
        window.scrollTo(0, elePos - window.innerHeight / 3)
    }

    goRight = () => {
        let pos
        for (let i = 0; i < this.props.pathway.steps.length; i++) {
            if (this.props.pathway.steps[i].id === this.state.activeStep.id) {
                pos = i
            }
        }
        if (pos === this.props.pathway.steps.length - 1) {
            return
        } else {
            this.setState({ activeStep: this.props.pathway.steps[pos + 1] })
        }
        let ele = document.getElementById(this.props.pathway.steps[pos + 1].id)
        let elePos = window.pageYOffset + ele.getBoundingClientRect().top
        window.scrollTo(0, elePos - window.innerHeight / 3)
    }

    componentDidMount() {
        this.setState({ totalSteps: this.props.pathway.steps.length })
        this.pathwayRef.current.focus()
        let nodes = this.pathwayRef.current.children
        let pos = []
        for (let i of nodes) {
            let ele = i.children[0]
            let coords = ele.getBoundingClientRect()
            let temp = {
                y: (coords.bottom - coords.top) / 2 + coords.top,
                x: (coords.right - coords.left) / 2 + coords.left,
            }
            pos.push(temp)
        }
        let top = this.pathwayRef.current.getBoundingClientRect().top
        this.setState({ pos: pos, top: top })
        this.setState({ url: window.location.href })
    }

    showStep = (step, event) => {
        if (step.isPathway === null) {
            this.props.history.replace('/pathway?id=' + step.pathway.id)
        } else {
            event.preventDefault()
            this.setState({ showStep: true, activeStep: step })
            let ele = document.getElementById(step.id)
            let elePos = window.pageYOffset + ele.getBoundingClientRect().top
            window.scrollTo(0, elePos - window.innerHeight / 3)
        }
    }

    displayPreviousPathway = () => {
        this.props.history.replace(
            '/pathway?id=' +
                this.props.pathwayTrail[this.props.pathwayTrail.length - 2].id
        )
        this.props.popLastPathway()
    }

    render() {
        let pathwayTrail = this.props.pathwayTrail
        let mainHeading
        let secondaryHeading
        if (pathwayTrail.length === 0) {
            mainHeading = ''
            secondaryHeading = ''
        } else {
            if (pathwayTrail.length < 2) {
                secondaryHeading = ''
                mainHeading = pathwayTrail[pathwayTrail.length - 1].name
            } else {
                mainHeading = pathwayTrail[pathwayTrail.length - 1].name
                secondaryHeading = pathwayTrail[pathwayTrail.length - 2].name
            }
        }
        let display
        let rightDisplay
        if (!this.state.showStep) {
            rightDisplay = (
                <div className={classes.illContainer}>
                    <img src={Ill} alt='illustration' className={classes.ill} />
                </div>
            )
        } else {
            rightDisplay = (
                <div className={classes.stepDescContainer}>
                    {this.props.pathway.steps.map((step) => {
                        if (step.id === this.state.activeStep.id) {
                            return (
                                <div
                                    className={
                                        classes.stepDescInnerContainerActive
                                    }
                                    key={step.id}
                                >
                                    <StepDescription
                                        step={this.state.activeStep}
                                    />
                                </div>
                            )
                        }
                        return (
                            <div
                                className={
                                    classes.stepDescInnerContainerInactive
                                }
                                key={step.id}
                            >
                                <StepDescription step={this.state.activeStep} />
                            </div>
                        )
                    })}
                </div>
            )
        }

        if (this.state.pos.length === 0) {
            display = null
        } else {
            display = (
                <svg
                    className={classes.svgContainer}
                    style={{ height: document.body.scrollHeight }}
                >
                    {this.state.pos.map((pos, index) => {
                        if (index === this.state.pos.length - 1) {
                            return null
                        } else {
                            return (
                                <line
                                    key={index}
                                    x1={this.state.pos[index].x}
                                    y1={
                                        this.state.pos[index].y - this.state.top
                                    }
                                    x2={this.state.pos[index + 1].x}
                                    y2={
                                        this.state.pos[index + 1].y -
                                        this.state.top
                                    }
                                    stroke='#d1d1d1'
                                    stroke-width='3'
                                />
                            )
                        }
                    })}
                </svg>
            )
        }
        return (
            <div style={{ width: '100vw', backgroundColor: '#FAFAFA' }}>
                <div className={classes.pathwayHeadingContainer}>
                    <div
                        className={classes.smallHeading}
                        onClick={() => this.displayPreviousPathway()}
                    >
                        <b>{secondaryHeading}</b>
                    </div>
                    <div className={classes.largeHeading}>
                        <b>{mainHeading}</b>
                    </div>
                </div>
                <div className={classes.outerContainer}>
                    <div className={classes.pathwayContainer}>
                        <div className={classes.pathwayInnerContainer}>
                            {display}
                            <div
                                className={classes.pathway}
                                ref={this.pathwayRef}
                            >
                                {this.props.pathway.steps.map((step, index) => {
                                    if (index % 2 === 0) {
                                        if (
                                            this.state.activeStep &&
                                            this.state.activeStep.id === step.id
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    id={step.id}
                                                    className={
                                                        classes.nodeContainerLeft
                                                    }
                                                >
                                                    <Node
                                                        step={step}
                                                        active={true}
                                                        id={step.id}
                                                        clicked={(event) =>
                                                            this.showStep(
                                                                step,
                                                                event
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )
                                        }
                                        return (
                                            <div
                                                key={index}
                                                id={step.id}
                                                className={
                                                    classes.nodeContainerLeft
                                                }
                                            >
                                                <Node
                                                    step={step}
                                                    active={false}
                                                    id={step.id}
                                                    clicked={(event) =>
                                                        this.showStep(
                                                            step,
                                                            event
                                                        )
                                                    }
                                                />
                                            </div>
                                        )
                                    } else {
                                        if (
                                            this.state.activeStep &&
                                            this.state.activeStep.id === step.id
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    id={step.id}
                                                    className={
                                                        classes.nodeContainerRight
                                                    }
                                                >
                                                    <Node
                                                        step={step}
                                                        active={true}
                                                        id={step.id}
                                                        clicked={(event) =>
                                                            this.showStep(
                                                                step,
                                                                event
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )
                                        }
                                        return (
                                            <div
                                                key={index}
                                                id={step.id}
                                                className={
                                                    classes.nodeContainerRight
                                                }
                                            >
                                                <Node
                                                    step={step}
                                                    id={step.id}
                                                    clicked={(event) =>
                                                        this.showStep(
                                                            step,
                                                            event
                                                        )
                                                    }
                                                />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div className={classes.rightContainer}>
                        {this.state.activeStep === null ? null : (
                            <div className={classes.buttonsContainer}>
                                <div
                                    className={classes.nextButton}
                                    onClick={() => this.goRight()}
                                >
                                    Next Step
                                </div>
                            </div>
                        )}
                        {rightDisplay}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        pathwayTrail: state.displayPathway.pathwayTrail,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        popLastPathway: () => dispatch(actions.popLastPathway()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Pathway))
