import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
    width: "40%",
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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

export default function EnrollmentModal(props) {
	const classes = useStyles();
    const defaultValueMap = props.defaultValueMap || {};
    const [courseList, setCourseList] = React.useState(defaultValueMap);
	const [temporaryList, setTemporaryList] = React.useState(defaultValueMap);
	console.log(courseList);
    const handleListChange = (e) => {
		let currentList = {};
		let newList = {};
		currentList = courseList;
		newList = currentList.filter(item => {
				const lc = item.name.toLowerCase();
			    const filter = e.target.value.toLowerCase();
			 	return lc.includes(filter);
		});
		setTemporaryList(newList);
	}
	return (
		<div>
		<div>
		    <input type="text" className="input" placeholder="Search..." onChange={handleListChange} />
		</div>

		<ul>
		  {temporaryList.map(item => (
		    <li key={item._id}>
		      {item.name} &nbsp;
		    </li>
		  ))}
		</ul>

		</div>
	);
}
