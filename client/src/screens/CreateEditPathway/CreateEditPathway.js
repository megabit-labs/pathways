import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import StepDndList from '../../components/StepDndList/stepDndList'
import StepEditArea from '../../components/StepEditArea/StepEditArea'
import PathwayDetails from '../../components/PathwayDetails/PathwayDetails'

import classes from './CreateEditPathway.module.css'

class CreateEditPathway extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showPathwayDetailsScreen: false,
        }
    }

    showPathwayDetailsScreen = () => {
        this.setState({ showPathwayDetailsScreen: true })
    }

    hidePathwayDetailsScreen = () => {
        this.setState({ showPathwayDetailsScreen: false })
    }

    render() {
        return (
            <Fragment>
                <PathwayDetails
                    showPathwayDetailsScreen={
                        this.state.showPathwayDetailsScreen
                    }
                    hidePathwayDetailsScreen={this.hidePathwayDetailsScreen}
                />
                <div className={classes.Content}>
                    <div className={classes.EditArea}>
                        <StepEditArea />
                    </div>
                    <div className={classes.StepList}>
                        <StepDndList
                            showPathwayDetailsScreen={
                                this.showPathwayDetailsScreen
                            }
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stepId: state.createEditPathway.selectedStep,
        steps: state.createEditPathway.steps,
    }
}

export default connect(mapStateToProps)(CreateEditPathway)
