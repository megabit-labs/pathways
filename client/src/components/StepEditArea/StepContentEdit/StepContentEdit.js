import React from "react"

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'


import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';

import classes from "./StepContentEdit.module.css"
import './prism.css'


const stepContentEdit = (props) => {
    return (
        <div className={classes.StepContentEdit}>
            <Editor
                value={props.content}
                onValueChange={props.onContentChange}
                highlight={(code) => highlight(code, languages.markdown)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 16,
                    minHeight: "500px"
                }}
                wrap="soft"
            />
        </div>
    );
};

export default stepContentEdit;
