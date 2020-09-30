import React, {Component} from 'react';
import './ProfileMain.css';

import PathwayOngoing from './PathwayOngoing/PathwayOngoing';
import PathwayCreated from './PathwayCreated/PathwayCreated';
import PathwayCompleted from './PathwayCompleted/PathwayCompleted';

const TabDescription = props => {
    switch(props.selectedTab.label) {
        case "On-going": return(<PathwayOngoing selectedTab={props.selectedTab} />);
        case "Created": return(<PathwayCreated selectedTab={props.selectedTab} />)
        case "Completed": return(<PathwayCompleted selectedTab={props.selectedTab} />)
        default: return(<div>Invalid tab</div>)
    }
}

class ProfileMain extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: null
        }
    }
    
    componentWillMount() {
        if(Object.keys(this.props.content).length) {
            this.setState({
                selectedTab: this.props.content[Object.keys(this.props.content)[0]]
            })
        }
    }

    changeTab(label) {
        this.setState({
            selectedTab: Object.entries(this.props.content).filter(tab => tab[1].label === label)[0][1]
        })
    }

    render() {

        const Tabs = Object.entries(this.props.content).map(item => {
            let classes = 'tab';
            const tab = item[1];
            if(this.state.selectedTab.label === tab.label)
                classes += ' tabActive';

            return(
                <div className={classes} onClick={() => this.changeTab(tab.label)}>
                    <span>{tab.label}</span>
                </div>
            );
        })

        return(
            <div className='profileMain'>
                <div className='tabContainer'>
                    {Tabs}
                </div>

                <div className='profileMainContent'>
                    {/* {this.state.selectedTab.text} */}

                     <TabDescription selectedTab={this.state.selectedTab} />
                </div>
            </div>
        );
    }
}

export default ProfileMain;