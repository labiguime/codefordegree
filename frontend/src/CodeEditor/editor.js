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
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import Axios from 'axios';

function ExpansibleTestCases(props){
    /*
        testcases: [{
            stdin: "",
            stdout: "",
            expected_output: "",
            result: True or False
        }]
    */
    const {testcases = []} = props;

    return (
        <React.Fragment>
            {testcases.map((testcase, index) => {
                let icon;
                if(testcase.result == true)
                    icon = <CheckIcon style={{color: "green"}}/>
                else if(testcase.result == false)
                    icon = <CrossIcon style={{color: "red"}}/>
                return (<ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandedMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                       <Typography>
                            Test case {index+1} {icon}    
                        </Typography> 
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

    });
    const {courseId, problemId} = props;
    function handleEditorStateChange(newState){
        setEditorState({...editorState, ...newState});
    }
    function handleConsoleExpandClick(){
        setConsoleExpanded(!consoleExpanded);
    }
    function onChange(value) {
        // props.onCodeChange(value);
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
    console.log(splitSize);
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
                      <MenuItem value={"c++"}>c++</MenuItem>
                      <MenuItem value={"java"}>java</MenuItem>
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
                    name="blah2"
                    onChange={onChange}
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={props.value}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }} 
                    height={splitSize - 50}
                />
            </Pane>
            <Pane >
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
                        <Button variant="contained" style={{marginRight: 10}}>Run code</Button>
                    </div>
                    <div>
                        <Button variant="contained" color="primary">Submit</Button>
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

