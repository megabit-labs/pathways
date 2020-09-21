import React, {Component} from 'react';
import './ProfileStats.css';

class ProfileStats extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {    
        const styles = [
            {
                color: 'white',
                background: '#27AA3D'
            },
            {
                color: 'white',
                background: '#FBBC05'
            },
            {
                color: 'white',
                background: '#4285F4'
            }
        ];

        const stats = Object.entries(this.props.content).map((item, i) => {
            const tab = item[1];
            return(
                <div>
                    <span style={styles[i % styles.length]}>{tab.total}</span> Pathways {tab.label}
                </div>
            )
        })

        return(
            <div className='profileStats'>
                {stats}
            </div>
        );
    }
}

export default ProfileStats;