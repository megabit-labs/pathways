import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import ReactMarkdown from 'react-markdown'
import classes from './ContentPreview.modue.css'
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

function ContentPreview(props) {
    const [id, setId] = useState('')
    const { data } = useQuery(FETCH_CONTENT_STEP)

    const { stepType } = props
    let displayComponent = null

    if (stepType === 'Shared Step') {
        displayComponent = (
            <ReactMarkdown
                source={data.content.content}
                escapeHtml={false}
                renderers={{ code: CodeBlock }}
            />
        )
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <input
                    className={classes.InputField}
                    placeholder='Enter ID of relevant component'
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                />
                <div className={classes.ActionButton}>Done</div>

                {displayComponent}
            </div>
        </div>
    )
}

export default ContentPreview
