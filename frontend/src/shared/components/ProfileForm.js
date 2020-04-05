import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


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
    width: "80%",
  },
}));

export default function ProfileForm(props) {
  const classes = useStyles();
  
  const defaultValueMap = props.defaultValueMap || {};
  const [userInfo, setUserInfo] = React.useState(defaultValueMap);

  const handleNameChange = event => {
    setUserInfo({...userInfo, name: event.target.value});
  }
  const handleEmailChange = event => {
    setUserInfo({...userInfo, email: event.target.value})
  }
  const handleStudnetNumberChange = event => {
    setUserInfo({...userInfo, studentNumber: event.target.value});
  };
  return (
    <div >
      <div className={classes.root}>
      <TextField
        label="Name"
        id="User-Name"
        className={classes.textField}
        color='secondary'
        onBlur={handleNameChange}
        defaultValue={defaultValueMap["name"]}
      />
      <TextField
        label="Email"
        id="User-Email"
        className={classes.textField}
        color='secondary'
        onBlur={handleEmailChange}
        defaultValue={defaultValueMap["email"]}
      />

        <TextField
        label="Student Number"
        id="Student-Number"
        className={classes.textField}
        color='secondary'
        onBlur={handleStudnetNumberChange}
        defaultValue={defaultValueMap["studentNumber"]}
      />
      </div>
      <Button
          type="submit"
          size="medium"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => props.onSubmit(userInfo)}
      >
        Save
      </Button>
    </div>
  );
}
