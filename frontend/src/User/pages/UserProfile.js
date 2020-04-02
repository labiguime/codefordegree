import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';






 
// import UserProfile from 'react-user-profile'

const useStyles = makeStyles(theme => ({
    cardGrid: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(8),
    },
    pageTitle: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
      },
    userInfo: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
}));



export default function UserProfile(){
    const classes = useStyles();
    const [userInfo, setUserInfo] = useState([]); // setUserInfo update
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios({
          url: 'http://localhost:5000/api/user/me',
          headers: {
            "x-auth-token": token
          }
        }).then((res) => {
          console.log(res);
            // console.log('testing!');
          const userInfo = res.data;
          setUserInfo(userInfo);
        }).catch(err => {
          console.log(err);
        });
      }, []);


    return (<React.Fragment>
        <Container className={classes.cardGrid} maxWidth="md">
            <div className={classes.pageTitle}>
                <Grid item xs={12} sm={6}>
                    <Typography variant='h4'>User Contact</Typography>
                    <Divider />
                </Grid>
            </div>

            <div className={classes.userInfo}>
                <Grid item xs={6} sm={6} className={classes.userInfo}>
                    <Typography variant='h6' align="left" gutterBottom='true'>
                        Name : {userInfo.name}</Typography>
                    <Typography variant='h6' align="left" gutterBottom='true'>
                        Email : {userInfo.email}</Typography> 
                    {/* <Typography variant='h6' align="left" gutterBottom='true'>
                        Student Number : {userInfo.studentNumber}</Typography>  */}
                </Grid>
            </div>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Edit Info
          </Button>
        </Container>
    </React.Fragment>
    )
}


// //Function
// (params) => {
// //anon funciton
// }