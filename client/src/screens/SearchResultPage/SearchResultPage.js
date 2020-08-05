import React, { Component } from 'react'
import SubNavbar from '../../components/SearchResultPage/SubNavbar/SubNavbar'
import Navbar from '../../components/SearchResultPage/Navbar/Navbar'

class SearchResultPage extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <SubNavbar />
                {/* <div className='search-poster-container'>
                    {this.props.results &&
                        this.props.results.length > 0 &&
                        this.props.results.map((result) => {
                            ;<p>{result.name}</p>
                        })}
                    <h1>Hello Result will fetch here</h1>
                </div> */}
            </div>
        )
    }
}

export default SearchResultPage;
