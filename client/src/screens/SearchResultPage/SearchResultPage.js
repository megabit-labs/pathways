import React, { Component } from 'react'
import Navbar from '../../components/SearchResultPage/Navbar/Navbar'
import classes from './SearchResultPage.module.css'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

export default function SearchResultPage({ match, props }) {
    const SearchPathway = gql`
    query{
    SearchPathways(searchQuery: "${match.params.query}"){
    id
    name
    tags{
        name
    }
    }
   
}`

    return (

       <div className={classes.searchResults}>
            <Navbar />
            <h3 className={classes.heading}>
                Displaying search results for "{match.params.query}"
            </h3>

            <Query query={SearchPathway}>
                {({ loading, error, data }) => {
                    if (loading)
                        return <h3 className={classes.heading}>Loading</h3>
                    if (error)
                        return (
                            <h3 className={classes.heading}>
                                Error! {error.message}
                            </h3>
                        )

                    return data.SearchPathways.map((item) => (
                        <div className={classes.resultCard}>
                            <div className={classes.resultCardHeading}>
                                <Link
                                    to={"/pathway?id=" + item.id}
                                    className={classes.link}
                                >
                                    {item.name}
                                </Link>
                                {item.tags.map((tag) => {
                                    return (
                                        <div className={classes.badge}>
                                            {tag.name}
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={classes.text}>
                                <p className={classes.description}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))
                }}
            </Query>
        </div>
    )
}
