import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../Markdown/CodeBlock'

const StepPreview = (props) => {
    const { stepId } = props
    const FETCH_CONTENT_STEP = gql`
        query {
            Step(id: "${stepId}") {
                id
                name
                time
                index
                content {
                    id
                    title
                    content
                }
            }
        }
    `
    const { data, loading, error } = useQuery(FETCH_CONTENT_STEP, {
        variables: { stepId },
    })

    if (loading) return 'loading...'
    if (error) return 'ERROR fetching step'

    console.log(data)

    return (
        <div>
            <ReactMarkdown
                source={data.Step[0].content.content}
                escapeHtml={false}
                renderers={{ code: CodeBlock }}
            />
        </div>
    )
}

export default StepPreview
