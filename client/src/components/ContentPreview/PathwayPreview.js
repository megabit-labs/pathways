import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const FETCH_CONTENT_PATHWAY = gql`
    query FetchPathway($id: String) {
        Step(id: $id) {
            name
            steps {
                id
                name
            }
        }
    }
`

export default function PathwayPreview(props) {
    const { pathwayId } = props
    const { data, loading, error } = useQuery(FETCH_CONTENT_PATHWAY, {
        variables: { pathwayId },
    })

    if (loading) return 'loading...'
    if (error) return 'ERROR fetching pathway'

    return (
        <div>
            <div>Pathway: {data.name}</div>
            <div>Steps:</div>
            {data.steps.map((step) => (
                <div key={step.id}>{step.name}</div>
            ))}
        </div>
    )
}
