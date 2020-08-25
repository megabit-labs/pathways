import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import CodeBlock from '../Markdown/CodeBlock'

import classes from './PathwayPreview.module.css'

import MdArrowRoundForward from 'react-ionicons/lib/MdArrowRoundForward'

export default function PathwayPreview(props) {
    const { pathwayId } = props
    const FETCH_CONTENT_PATHWAY = gql`
        query {
            Pathway(id: "${pathwayId}") {
                id
                name
                steps {
                    id
                    name
                    time
                    index
                    isPathway
                    content {
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
    const { data, loading, error } = useQuery(FETCH_CONTENT_PATHWAY, {
        variables: { pathwayId },
    })

    if (loading) return 'loading...'
    if (error) return 'ERROR fetching pathway'
    if ('Step' in data) {
        return
    }
    console.log(data)
    if (data.Pathway.length <= 0) return null
    let link = `/pathway?id=${data.Pathway[0].id}`

    let content = '# ' + data.Pathway[0].name

    data.Pathway[0].steps.forEach((step) => {
        content += '\n - ** ' + step.name + '** \n'
    })

    return (
        <Fragment>
            <div>
                <ReactMarkdown
                    source={content}
                    escapeHtml={false}
                    renderers={{ code: CodeBlock }}
                />
                <Link target='_blank' to={link} className={classes.link}>
                    View Full Pathway
                    <MdArrowRoundForward
                        fontSize='20px'
                        className={classes.icon}
                    />
                </Link>
            </div>
        </Fragment>
    )
}
