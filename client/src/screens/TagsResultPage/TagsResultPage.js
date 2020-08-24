import React from 'react'
import Navbar from '../../components/SearchResultPage/Navbar/Navbar'
import classes from './TagsResultPage.module.css'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

export default function SearchResultPage({ match, props }) {
    const SearchTags = gql`
    query{
    Tag(name: "${match.params.query}"){
        pathways{
            name
            id
            tags{
              name
            }
          }
          }
        }`

    return (
        <div className={classes.searchResults}>
            <Navbar />
            <h3 className={classes.heading}>
                Showing similar tag results for "{match.params.query}"
            </h3>

            <Query query={SearchTags}>
                {({ loading, error, data }) => {
                    if (loading)
                        return <h3 className={classes.heading}>Loading</h3>
                    if (error)
                        return (
                            <h3 className={classes.heading}>
                                Error! {error.message}
                            </h3>
                        )
                    console.log(data)
                    return (
                        data &&
                        data.Tag[0] &&
                        data.Tag[0].pathways &&
                        data.Tag[0].pathways.map((item) => (
                            <div className={classes.resultCard}>
                                <div className={classes.resultCardHeading}>
                                    <Link
                                        to={'/pathway?id=' + item.id}
                                        className={classes.link}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.tags.map((tag) => {
                                        return (
                                            <Link
                                                to={`/results/tags/name=${tag.name}`}
                                                className={classes.badge}
                                            >
                                                {tag.name}
                                            </Link>
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
                    )
                }}
            </Query>
        </div>
    )
}
