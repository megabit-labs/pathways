import React from 'react'
import Navbar from '../../components/SearchResultPage/Navbar/Navbar'
import classes from './TagsResultPage.module.css'
import queryString from 'query-string'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Link, withRouter } from 'react-router-dom'

const SearchResultPage = (props) => {
    const name = queryString.parse(props.location.search).name
    const SearchTags = gql`
        query{
            Tag(name: "${name}"){
                pathways{
                    name
                    id
                    tags{
                    name
                    }
                }
            }
        }
    `

    return (
        <div className={classes.searchResults}>
            <Navbar />
            <h3 className={classes.heading}>
                Showing similar tag results for "{name}"
            </h3>

            <Query query={SearchTags}>
                {({ loading, error, data }) => {
                    if (loading)
                        return <h3 className={classes.heading}>Loading...</h3>
                    if (error)
                        return (
                            <h3 className={classes.heading}>
                                Error! {error.message}
                            </h3>
                        )

                    return (
                        data &&
                        data.Tag[0] &&
                        data.Tag[0].pathways &&
                        data.Tag[0].pathways.map((item) => (
                            <div key={item.id} className={classes.resultCard}>
                                <div className={classes.resultCardHeading}>
                                    <Link
                                        to={'/pathway?id=' + item.id}
                                        className={classes.link}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.tags.map((tag) => {
                                        let link = `/results/tags?name=${tag.name}`
                                        return (
                                            <Link
                                                key={tag.name}
                                                to={link}
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

export default withRouter(SearchResultPage)
