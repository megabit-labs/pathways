import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../Markdown/CodeBlock'

const FETCH_CONTENT_STEP = gql`
    query FetchStep($id: String) {
        Step(id: $id) {
            content {
                content
            }
        }
    }
`

export default function StepPreview(props) {
    const { stepId } = props
    const { data, loading, error } = useQuery(FETCH_CONTENT_STEP, {
        variables: { stepId },
    })

    if (loading) return 'loading...'
    if (error) return 'ERROR fetching step'

    return (
        <div>
            <ReactMarkdown
                source={data.content.content}
                escapeHtml={false}
                renderers={{ code: CodeBlock }}
            />
        </div>
    )
}
