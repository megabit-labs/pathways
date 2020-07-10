import React, { Component } from "react"

import classes from "./Pathway.module.css"
import Node from "../../components/Node/Node"
import { Fragment } from "react"
import TopNavbar from "../../components/TopNavbar/TopNavbar"
import AcmNavbar from "../../components/AcmNavbar/AcmNavbar"
import StepDescription from "../../components/StepDescription/StepDescription"
import Ill from "../../assets/dummy.png"

class Pathway extends Component {
    pathwayRef = React.createRef()

    state = {
        pos: [],
        top: 0,
        showStep: false,
        activeStep: null,
    }

    componentDidMount() {
        this.setState({ classesList: [classes.pathwayContainer] }, () => {
            this.pathwayRef.current.focus()
            let nodes = this.pathwayRef.current.children
            let pos = []
            for (let i of nodes) {
                let ele = i.children[0]
                let coords = ele.getBoundingClientRect()
                console.log(coords)
                let temp = {
                    y: (coords.bottom - coords.top) / 2 + coords.top,
                    x: (coords.right - coords.left) / 2 + coords.left,
                }
                pos.push(temp)
            }
            console.log(pos)
            let top = this.pathwayRef.current.getBoundingClientRect().top
            this.setState({ pos: pos, top: top })
        })
    }

    showStep = (step, event) => {
        event.preventDefault()
        this.setState({ showStep: true, activeStep: step })
    }

    render() {
        // let stepDescClasses = [classes.stepDescContainer];
        // if (this.state.showStep) {
        //     stepDescClasses.push(classes.showStep)
        // }
        // else {
        //     stepDescClasses.push(classes.hideStep)
        // }

        let display
        let rightDisplay
        if (!this.state.showStep) {
            rightDisplay = (
                <div className={classes.illContainer}>
                    <img src={Ill} alt="illustration" className={classes.ill} />
                </div>
            )
        } else {
            console.log(this.state.activeStep)
            console.log(this.props.pathway)
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
                <svg className={classes.svgContainer}>
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
                                    stroke="#09695d"
                                    stroke-width="8"
                                />
                            )
                        }
                    })}
                </svg>
            )
        }

        console.log(this.props.pathway)

        return (
            <Fragment>
                {/* <TopNavbar /> */}
                <div className={classes.pathwaySecondaryHeading}>
                    {this.props.pathway.name}
                </div>
                <div className={classes.pathwayMainHeading}>
                    {this.props.pathway.name}
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
                        <div className={classes.rightContainer}>
                            {rightDisplay}
                        </div>
                    </div>
                </div>
                {/* <AcmNavbar /> */}
            </Fragment>
        )
    }
}

export default Pathway
