import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import queryString from 'query-string'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Pathway from '../../screens/Pathway/Pathway'
import * as actions from '../../store/actions/index'

const GetPathway = (props) => {
    console.log(props)
    const value = queryString.parse(props.location.search).id
    const GET_PATHWAY = gql`
        query {
            Pathway(id: "${value}") {
                id
                name
                steps {
                    id
                    name
                    time
                    index
                    isPathway
                    content{
                        id
                        title
                        content
                    }
                    pathway {
                        id
                    }
                }
            }
        }
    `

    return (
        <Query query={GET_PATHWAY}>
            {({ loading, error, data }) => {
                if (loading) return <div>Loading</div>
                if (error) return `Error! ${error.message}`

                const obj = {
                    name: data.Pathway[0].name,
                    id: data.Pathway[0].id,
                }
                props.addNewPathway(obj)
                return <Pathway pathway={data.Pathway[0]} />
            }}
        </Query>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewPathway: (obj) => dispatch(actions.addNewPathway(obj)),
    }
}

export default connect(null, mapDispatchToProps)(withRouter(GetPathway))
