import React, {Component} from 'react';
import Header from "./Header";
import SearchField from "./SearchField";
import Footer from "./Footer";
import Suggestion from "./data";

class SearchPage extends Component{
    render() {
    return(
        <div>

<Header />
<SearchField />
<Footer />
        </div>
    )
    }
}
export default SearchPage;