import React from "react"

import Header from "../../components/SearchPage/Header/Header"
import SearchField from "../../components/SearchPage/SearchField/SearchField"
import Footer from "../../components/SearchPage/Footer/Footer"

const SearchPage = (props) => {

    return (
        <div>
            <Header />
            <SearchField />
            <Footer />
        </div>
    )
}

export default SearchPage;