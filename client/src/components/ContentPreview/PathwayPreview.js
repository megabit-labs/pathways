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
            <h3>Pathway: {data.name}</h3>
            <div style={{ marginTop: '10px' }}>Steps:</div>
            <ul style={{ marginLeft: '30px' }}>
                {data.steps.map((step) => (
                    <li key={step.id}>{step.name}</li>
                ))}
            </ul>
        </div>
    )
}
