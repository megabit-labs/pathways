import React, {Component} from 'react';
import './ProfileMain.css';

import RecentPathway from './RecentPathway/RecentPathway';
import PathwayPreview from './PathwayPreview/PathwayPreview';

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
        
        const PreviewData = this.state.selectedTab.pathways.map(pathway => {
            if(pathway.id !== this.state.selectedTab.recentPathway.id) {
                return(
                    <PathwayPreview data={pathway} />
                );
            }
        });

        return(
            <div className='profileMain'>
                <div className='tabContainer'>
                    {Tabs}
                </div>

                <div className='profileMainContent'>
                    {/* {this.state.selectedTab.text} */}

                    <span class='header-first'> Jump right back in!</span>

                    <div>
                        <RecentPathway data={this.state.selectedTab.recentPathway} />
                    </div>

                    <hr />

                    <span class='header-second'>Stuff you procastinated about</span>

                    <div>
                        <div className='previewWrapper'>
                            {PreviewData}
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
}

export default ProfileMain;