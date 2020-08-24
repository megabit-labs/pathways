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

    const content =
        '# ' +
        data.Step[0].content.title +
        '\n ** ' +
        data.Step[0].content.content +
        '**'

    return (
        <div>
            {data.Step.length > 0 ? (
                <ReactMarkdown
                    source={content}
                    escapeHtml={false}
                    renderers={{ code: CodeBlock }}
                />
            ) : null}
        </div>
    )
}

export default StepPreview
