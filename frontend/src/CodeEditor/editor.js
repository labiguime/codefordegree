import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import axios from 'axios';
import AceEditor from 'react-ace';
import SplitPane, {Pane} from 'react-split-pane';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TabWrapper from '../shared/components/TabWrapper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandedMoreIcon from '@material-ui/icons/ExpandMore';
import CheckIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import CrossIcon from '@material-ui/icons/CancelRounded';
import LinearProgress from '@material-ui/core/LinearProgress';
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import {languageMap, languagePlaceHolder} from '../shared/constants';
import Axios from 'axios';

function ExpansibleTestCases(props){
    /*
        testcases: [{
            stdin: "",
            stdout: "",
            expected_output: "",
            hidden: True or False,
            result: True or False
        }]
    */
    const {testcases = []} = props;

    return (
        <React.Fragment>
            {testcases.map((testcase, index) => {
                let icon;
                if(!testcase.hidden){
                    if(testcase.result == true)
                        icon = <CheckIcon style={{color: "green"}}/>
                    else if(testcase.result == false)
                        icon = <CrossIcon style={{color: "red"}}/>
                }
                return (<ExpansionPanel disabled={testcase.hidden} style={{marginBottom: "10px"}}>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandedMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                            Test case {index+1} <span style={{marginLeft: "5px"}}>{icon}</span>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                    <Typography>
                        <p>stdin: {testcase.stdin}</p>
                        <p>stdout: {testcase.stdout}</p>
                        <p>expected output: {testcase.expected_output}</p>
                        {testcase.result == true && <p>result: Passed</p>}
                        {testcase.result == false && <p>result: Failed</p>}
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>   
                )
            })}
            
        </React.Fragment>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: "10px"
    },
    submitGroup: {
        marginTop: 10,
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))
export default function Editor(props) {
    const classes = useStyles();
    const [consoleExpanded, setConsoleExpanded] = useState(false);
    const [splitSize, setSplitSize] = useState(500);
    const [testcases, setTestcases] = useState([]);
    const [editorState, setEditorState] = useState({
        mode: "javascript",
        fontSize: 14,
        theme: "xcode",
        value: languagePlaceHolder["javascript"]
    });
    const [submitting, setSubmitting] = useState(false);
    const {courseId, problemId} = props;

    function handleEditorStateChange(newState){
        if(newState.mode == "c++")
            newState.mode = "c_cpp";
        setEditorState({...editorState, ...newState});
    }

    function handleConsoleExpandClick(){
        setConsoleExpanded(!consoleExpanded);
    }


    function onEditorBlur(event, editor) {
        setEditorState({...editorState, value: editor.getValue()});
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios({
            url: `http://localhost:5000/api/courses/${courseId}/problems/${problemId}/testcases`,
            medthod: "get",
            headers: {
                'x-auth-token': token
            }
        }).then(res => {
            setTestcases(res.data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    function handleSplitSizeChange(size){
        setSplitSize(size);
    }

    function handleSubmitCode(){
        const token = localStorage.getItem('token');
        setSubmitting(true);
        axios({
            url: `http://localhost:5000/api/courses/${courseId}/problems/${problemId}/submissions`,
            method: "post",
            headers: {
                'x-auth-token': token
            },
            data: {
                source_code: editorState.value,
                language_id: languageMap[editorState.mode]
            }
        }).then(res => {
            let testcaseResults = res.data.testcase_results;
            let newTestCasesState = testcases.map(testcase => {
                let updatedTestCase = testcaseResults.find(e => e.testcase_id == testcase._id);
                if(updatedTestCase){
                    let {result, stdout} = updatedTestCase;
                    return {...testcase, result, stdout};
                }
            })
            setSubmitting(false);
            setConsoleExpanded(true);
            setTestcases(newTestCasesState);
        }).catch(error => {
            console.log(error);
            setSubmitting(false);
        })
    }

    function handleRunCode(){
        const token = localStorage.getItem('token');
        setSubmitting(true);
        axios({
            url: `http://localhost:5000/api/courses/${courseId}/problems/${problemId}/submissions/test`,
            method: "post",
            headers: {
                'x-auth-token': token
            },
            data: {
                source_code: editorState.value,
                language_id: languageMap[editorState.mode],
            }
        }).then(res => {
            let testcaseResults = res.data.testcase_results;
            let newTestCasesState = testcases.map(testcase => {
                let updatedTestCase = testcaseResults.find(e => e.testcase_id == testcase._id);
                if(updatedTestCase){
                    let {result, stdout} = updatedTestCase;
                    return {...testcase, result, stdout};
                }
                return testcase;
            })
            setSubmitting(false);
            setConsoleExpanded(true);
            setTestcases(newTestCasesState);
        }).catch(error => {
            console.log(error);
            setSubmitting(false);
        })
    }

    return (
        <SplitPane 
            split="horizontal"
            style={{marginLeft: "10px", overflow: 'auto'}}
            onChange={handleSplitSizeChange}
            minSize="500px"
            initialSize="500px"
            maxSize="900px"
        >
            <Pane minSize="500px">
                <FormControl className={classes.formControl}>
                    <Select
                      labelId="language"
                      id="language-select"
                      value={editorState.mode}
                      onChange={(event) => handleEditorStateChange({mode: event.target.value})}
                    >
                      <MenuItem value={"javascript"}>javascript</MenuItem>
                      <MenuItem value={"c_cpp"}>c++</MenuItem>
                      <MenuItem value={"python"}>python 3</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <Select
                      labelId="theme"
                      id="theme-select"
                      value={editorState.theme}
                      onChange={(event) => handleEditorStateChange({theme: event.target.value})}
                    >
                      <MenuItem value={"xcode"}>xcode</MenuItem>
                      <MenuItem value={"github"}>github</MenuItem>
                      <MenuItem value={"twilight"}>twilight</MenuItem>
                      <MenuItem value={"monokai"}>monokai</MenuItem>
                    </Select>
                </FormControl>
                <AceEditor
                    {...editorState}
                    name="editor"
                    onBlur={onEditorBlur}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }} 
                    height={splitSize - 50}
                    width="100%"
                />
            </Pane>
            <Pane >
                {submitting && <LinearProgress color="secondary"/>}
                <div className={classes.submitGroup}>
                    <div>
                        <Button onClick={handleConsoleExpandClick}
                        >
                            Console
                            <ExpandedMoreIcon className={clsx(classes.expand, {
                                [classes.expandOpen]: consoleExpanded
                                })}
                            /> 
                        </Button>
                    </div>
                    <div style={{marginLeft: 'auto'}}>
                        <Button variant="contained" style={{marginRight: 10}} onClick={handleRunCode}>
                            Run code
                        </Button>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={handleSubmitCode}>
                            Submit
                        </Button>
                    </div>
                </div>
                {consoleExpanded && <TabWrapper 
                        tabHeaders={["Test cases", "Run code result"]}
                        tabBodies={[
                            () => <ExpansibleTestCases testcases={testcases}/>
                        ]}
                    
                    />
                }
            </Pane>

        </SplitPane>
    )
}

