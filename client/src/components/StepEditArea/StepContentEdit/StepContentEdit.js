import React from 'react'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import ContentPreview from '../../ContentPreview/ContentPreview'

import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markdown'

import classes from './StepContentEdit.module.css'
import './prism.css'

const stepContentEdit = (props) => {
    const { content, onContentChange, selectedStepType } = props

    let editor = null
    if (selectedStepType === 'Shared Step' || selectedStepType === 'Pathway') {
        editor = <ContentPreview stepType={selectedStepType} />
    } else {
        editor = (
            <Editor
                value={content}
                onValueChange={onContentChange}
                highlight={(code) => highlight(code, languages.markdown)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 16,
                    minHeight: '500px',
                }}
                wrap='soft'
            />
        )
    }
    return <div className={classes.StepContentEdit}>{editor}</div>
}

export default stepContentEdit
