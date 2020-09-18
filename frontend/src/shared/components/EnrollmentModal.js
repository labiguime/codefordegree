import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  searchFieldAppearance: {
      minWidth: "40%",
	  textAlign: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    float: "left",
  }
}));

export default function EnrollmentModal(props) {
	const classes = useStyles();
    const defaultValueMap = props.defaultValueMap || {};

    const [courseList, setCourseList] = React.useState(defaultValueMap);
	const [chosenCourse, setChosenCourse] = React.useState();

	const onCourseSelected = (e, v) => {
		//Handle the edge case when v is null
		if(v)
			setChosenCourse(v.id);
	}

    const options = courseList.map((course, index) => {
         return {
            name: course.name,
            id: course._id
         }
    });

	return (
		<div>
		<Grid container justify = "center">
			<Grid item xs={12}>
					<Grid container justify = "center">
					<Autocomplete
					  color='secondary'
                      options={options}
					  className={classes.searchFieldAppearance}
                      getOptionLabel={option => option.name}
                      onChange={(e, v) => onCourseSelected(e, v)}
                      renderInput={params => {
						return <div>
                        	<TextField {...params} label="Search for course..." variant="outlined">
                        	</TextField>
							{props.submitError && <Alert style={{marginTop: "5px"}} severity="error">{props.submitError}</Alert>}
						</div>
                      }}
					/>
					</Grid>
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
                    <br />
			</Grid>
		  </Grid>
		</div>
	);
}
