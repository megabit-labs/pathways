import React, { Component } from 'react';

import classes from './Pathway.module.css';
import Node from '../../components/Node/Node';
import { Fragment } from 'react';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import AcmNavbar from '../../components/AcmNavbar/AcmNavbar';
import StepDescription from '../../components/StepDescription/StepDescription';

class Pathway extends Component {

    pathwayRef = React.createRef();

    state = {
        pos: [],
        top: 0,
        classesList: [],
        showStep: false,
        activeStep: null,
    }

    componentDidMount() {
        this.setState({ classesList: [classes.pathwayContainer] }, () => {
            this.pathwayRef.current.focus();
            let nodes = this.pathwayRef.current.children;
            let pos = [];
            for (let i of nodes) {
                let ele = i.children[0];
                let coords = ele.getBoundingClientRect();
                console.log(coords)
                let temp = {
                    y: (coords.bottom - coords.top) / 2 + coords.top,
                    x: (coords.right - coords.left) / 2 + coords.left,
                }
                pos.push(temp)
            };
            let top = this.pathwayRef.current.getBoundingClientRect().top;
            console.log(top)
            this.setState({ pos: pos, top: top });
        })
    }

    showStep = (step, event) => {
        event.preventDefault();
        this.setState({ showStep: true, activeStep: step });
        let arr = [...this.state.classesList];
        arr.push(classes.move)
        this.setState({ classesList: arr })
    };


    render() {

        let stepDescClasses = [classes.stepDescContainer];
        if (!this.state.showStep) {
            stepDescClasses.push(classes.hideStep);
        }
        else {
            stepDescClasses.push(classes.showStep)
        }

        let display;
        if (this.state.pos.length === 0) {
            display = null;
        }
        else {
            display = <svg className={classes.svgContainer}>
                {this.state.pos.map((pos, index) => {
                    if (index === (this.state.pos.length - 1)) {
                        return null;
                    }
                    else {
                        return <line key={index} x1={this.state.pos[index].x} y1={this.state.pos[index].y - this.state.top} x2={this.state.pos[index + 1].x} y2={this.state.pos[index + 1].y - this.state.top} stroke="#09695d" stroke-width="8" />
                    }
                })}
            </svg>
        }

        console.log(this.props.pathway)


        return (
            <Fragment>
                <TopNavbar />
                <div className={classes.pathwayHeading}><b>{this.props.pathway.name}</b></div>
                <div className={classes.outerContainer}>
                    <div className={classes.topBar}>
                    </div>
                    <div className={this.state.classesList.join(' ')} ref={this.pathwayRef}>
                        {display}
                        {this.props.pathway.steps.map((step, index) => {
                            if (index % 2 === 0) {
                                return (
                                    <div key={index} className={classes.nodeContainerLeft}>
                                        <Node step={step} id={step.id} clicked={(event) => this.showStep(step, event)} />
                                    </div>
                                );
                            }
                            else {
                                return (
                                    <div key={index} className={classes.nodeContainerRight}>
                                        <Node step={step} id={step.id} clicked={(event) => this.showStep(step, event)} />
                                    </div>
                                );
                            }
                        })}
                    </div>
                    <div className={stepDescClasses.join(' ')}>
                        <StepDescription step={this.state.activeStep} />
                    </div>
                </div>
                <AcmNavbar />
            </Fragment>
        )
    }

};

export default Pathway;