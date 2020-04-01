import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: theme.spacing(1),
    width: "40%",
  },
  cardGrid: {
	paddingTop: theme.spacing(8),
	paddingBottom: theme.spacing(8),
  },
  card: {
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
  },
  cardMedia: {
	paddingTop: '56.25%', // 16:9
  },
  cardContent: {
	flexGrow: 4,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "30%",
  },
  searchFieldAppearance: {
      minWidth: "40%",
	  textAlign: "center",
  },
  selectFieldAppearance: {
	  margin: theme.spacing(1),
      minWidth: "40%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    float: "left",
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
	const [chosenCourse, setChosenCourse] = React.useState();
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
	const handleCourseChanged = (e) => {
		setChosenCourse(e.target.value);
	}
	return (
		<div>
		<Grid container justify = "center">
			<Grid item xs={12}>
					<Grid container justify = "center">
					<TextField
					  label="Search..."
					  color='secondary'
					  className={classes.searchFieldAppearance}
					  onChange={handleListChange}
					/>
					</Grid>
					<br />
					<Grid container justify = "center">
					<FormControl className={classes.selectFieldAppearance}>
			          <Select
					  	id="Chosen"
			            color='secondary'
						defaultValue={temporaryList[0].name}
						onChange={handleCourseChanged}
			          >
					  {temporaryList.map(item => (
						<MenuItem value={item._id}>{item.name}</MenuItem>
					  ))}
			          </Select>
			        </FormControl>
					</Grid>
					<br />
					<br />
					<Grid container justify = "center">
					<Button
						type="submit"
						size="medium"
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={() => props.onSubmit(chosenCourse)}
					>
					  {props.buttonTitle}
					</Button>
					</Grid>
			</Grid>
		  </Grid>
		</div>
	);
}
