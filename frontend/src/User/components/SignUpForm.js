import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form'; 

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://csil-git1.cs.surrey.sfu.ca/tln3/codefordegree">
        Code4Degree
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    color: "red"
  }
}));

export default function SignUp(props) {
  const classes = useStyles();
  const { errors, handleSubmit, register} = useForm();

  const onSubmit = data => {
    props.onSubmit(data); 
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        {props.formMessage && <div className={classes.error}>{props.formMessage}</div>}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                inputRef={register({
                  required:{
                    value: true,
                    message: "Name is required"
                  }
                })}
                error={errors.name !== undefined}
                autoComplete="fname"
                name="name"
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
              <div className={classes.error}>{errors.name && errors.name.message}</div> 
            </Grid>
            <Grid item xs={12}>
              <TextField
                inputRef={register({
                required: {
                  value: true,
                  message: "Email is required"
                },
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address"
                }
                })}
                error={errors.email ? true : false}
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            <div className={classes.error}>{errors.email && errors.email.message}</div> 
            </Grid>
            <Grid item xs={12}>
              <TextField
              inputRef={register({
                required:{
                  value: true,
                  message: "Password is required"
                },
                minLength: {
                  value: 6,
                  message: "Password requires at least 6 characters"
                },
              })}             
                error={errors.password !== undefined}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            <div className={classes.error}>{errors.password && errors.password.message}</div> 
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button   
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}