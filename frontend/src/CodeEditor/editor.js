import React from 'react';
import AceEditor from 'react-ace';

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";

export default function Editor(props) {
    function onChange(value) {
        console.log(value);
    }
    return (
        <AceEditor
            placeholder="Placeholder Text"
            mode="javascript"
            theme="xcode"
            name="blah2"
            onChange={onChange}
            fontSize={14}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={`function HelloWorld(editor) {
  console.log("Hello World");
}`}
            setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
            }} />
    )
}

