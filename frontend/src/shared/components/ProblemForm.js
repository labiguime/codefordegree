import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import DatePicker from "react-datepicker";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import "react-datepicker/dist/react-datepicker.css";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
    width: "30%",
  },
  nameField: {
    margin: theme.spacing(1),
    width: "30%",
  },
  marksField: {
    margin: theme.spacing(1),
    width: "20%",
  },
  rtField: {
    margin: theme.spacing(1),
    width: "30%",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "30%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    float: "right",
  },
  boxField: {
    margin: theme.spacing(1),
    width: "84%",
  },
  typo: {
  	underline: "always",
  }
}));

export default function AddProblemForm(props) {
  const classes = useStyles();

  const defaultValueMap = props.defaultValueMap || {};
  const [problemInfo, setProblemInfo] = React.useState({...defaultValueMap});
  let testcases = problemInfo.testcases || [];
  const handleNameChange = event => {
    setProblemInfo({...problemInfo, name: event.target.value});
  }

  const handleDeadlineChange = event => {
    setProblemInfo({...problemInfo, deadline: event});
  };

  const handleDescriptionChange = event => {
    setProblemInfo({...problemInfo, description: event.target.value})
  }

  const handleMarkChange = event => {
    setProblemInfo({...problemInfo, mark: event.target.value})
  }

  const handleRuntimeLimitChange = event => {
    setProblemInfo({...problemInfo, runtime_limit: event.target.value})
  }

  const handleAddTestCase = () => {
    setProblemInfo({
      ...problemInfo, 
      testcases: [...testcases, {stdin:"", expected_output: "", hidden: false}]
    });
  }

  const handleDeleteTestCase = () => {
    let deletedTestcases = testcases.filter(e => e.checked);
    let newTestcases = testcases.filter(e => !e.checked);
    testcases = [...newTestcases];
    setProblemInfo({
      ...problemInfo,
      testcases,
      deletedTestcases
    })
  }

  const handleCheckTestCase = (idx) => {
    testcases[idx].checked = !testcases[idx].checked;
    setProblemInfo({
      ...problemInfo,
      testcases: [...testcases]
    });
  }

  const handleUpdateTestCase = (value, idx) => {
    testcases[idx] = {...testcases[idx], ...value};
    setProblemInfo({
      ...problemInfo,
      testcases: [...testcases]
    });
  }
  return (
    <div >
	  <div className={classes.root}>

	      <TextField
	        label="Problem Name"
	        id="problem-name"
	        className={classes.nameField}
	        color='secondary'
	        onBlur={handleNameChange}
	        defaultValue={defaultValueMap && defaultValueMap["name"]}
	      />

		  <TextField
		  	label="Runtime limit (in ms)"
		  	id="problem-runtime_limit"
		  	className={classes.rtField}
		  	color='secondary'
		  	onBlur={handleRuntimeLimitChange}
		  	defaultValue={defaultValueMap && defaultValueMap["runtime_limit"]}
		  />

		  <TextField
			  label="Marks"
			  id="problem-mark"
			  className={classes.marksField}
			  color='secondary'
			  onBlur={handleMarkChange}
			  defaultValue={defaultValueMap && defaultValueMap["mark"]}
		  />

	  </div>
	  <Typography className={classes.typo}>
	    <br />
		&nbsp; Deadline: &ensp;
		<DatePicker
	  	  id="problem-deadline"
		    dateFormat="MM-dd-yyyy"
		    selected={moment(problemInfo.deadline).toDate()}
	  	  value={problemInfo.deadline}
	  	  onChange={handleDeadlineChange}
	  	  color='secondary'
	  	  defaultValue={defaultValueMap && defaultValueMap["deadline"]}
  	  	/>
	  </Typography>

	  <div style={{marginTop: "10px"}}>
		<TextField
			label="Problem Description"
			id="problem-description"
			className={classes.boxField}
			fullWidth
			multiline
			rowsMax="10"
			margin="dense"
			color='secondary'
			onBlur={handleDescriptionChange}
			defaultValue={defaultValueMap && defaultValueMap["description"]}
		/>
	  </div>

    <div style={{marginLeft: "6px"}}>
        <Typography>
          Test cases 
          <IconButton color="primary" aria-label="add" onClick={handleAddTestCase}>
            <AddIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleDeleteTestCase}>
            <DeleteIcon />
          </IconButton>
        </Typography>
        {testcases.map((e, index) => {
          return (<div style={{paddingTop: "5px"}}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <FormControlLabel
                onClick={(event) => {
                  event.stopPropagation();
                  handleCheckTestCase(index);
                }}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox checked={!!e.checked}/>}
                label={`Test case ${index+1}`}
              />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                    <TextField 
                      style={{marginLeft: '5px'}}
                      label="Stdin"
                      onBlur={event => handleUpdateTestCase({stdin: event.target.value}, index)}
                      multiline
                      defaultValue={e.stdin}
                    />
                    <TextField 
                      style={{marginLeft: '5px'}}
                      label="Expected output"
                      onBlur={event => handleUpdateTestCase({expected_output: event.target.value}, index)}
                      multiline
                      defaultValue={e.expected_output}
                    />
              </Grid>
              <Grid item xs={6}>
              <FormControl >
                <FormLabel >Type</FormLabel>
                <RadioGroup name="type" value={e.hidden ? "hidden" : "visible"} onChange={(event) => {handleUpdateTestCase({hidden: event.target.value == "hidden"}, index);}}>
                  <FormControlLabel value={"hidden"} control={<Radio />} label="hidden" />
                  <FormControlLabel value={"visible"} control={<Radio />} label="visible" />
                </RadioGroup>
              </FormControl>
              </Grid>
            </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </div>)
        })}
        
    </div>

      <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => props.onSubmit(problemInfo)}
      >
        {props.buttonTitle}
      </Button>

    </div>
	);
}
