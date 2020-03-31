import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import DatePicker from "react-datepicker";

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
		  	id="problem-dead"
		  	className={classes.rtField}
		  	color='secondary'
		  	onBlur={handleRuntimeLimitChange}
		  	defaultValue={defaultValueMap && defaultValueMap["runtime_limit"]}
		  />

		  <TextField
			  label="Marks allocated"
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
	  	  id="Term"
	  	  selected={problemInfo.deadline}
	  	  onChange={handleDeadlineChange}
	  	  color='secondary'
	  	  defaultValue={defaultValueMap && defaultValueMap["term"]}
  	  	/>
	  </Typography>

	  <div>
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
