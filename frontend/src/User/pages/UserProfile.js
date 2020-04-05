import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ProfileForm from '../../shared/components/ProfileForm';
import Dashboard from '../components/Dashboard';
import {USER_URL} from '../../shared/constants';
 
// import UserProfile from 'react-user-profile'
function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles(theme => ({
    cardGrid: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(8),
    },
    modalTitle: {  
        textAlign: "center"
        },
    pageTitle: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2),
      },
    userInfo: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
    modalBox: {
        position: 'absolute',
        width: "50%",
        backgroundColor: theme.palette.background.paper,
        border: '1px solid black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }
}));

export default function UserProfile(){
    const modalStyle = getModalStyle();

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [modalState, setModalState] = useState({});
    const [userInfo, setUserInfo] = useState([]); // setUserInfo update
    const handleOpenModal = (name, email, studentNumber, onSubmit) => {
        // setOpen(true);
        setModalState({name, email, studentNumber, onSubmit});
        setOpen(true);
      }
      const handleCloseModal = () => {
        setModalState({});
        setOpen(false);
      }
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios({
          url: `${USER_URL}/me`,
          headers: {
            "x-auth-token": token
          }
        }).then((res) => {
          const userInfo = res.data;
          console.log(userInfo)
          setUserInfo(userInfo);
        }).catch(err => {
          console.log(err);
        });
      }, []);

    let handleEditProfile = (updatedProfile) => {
        const token = localStorage.getItem('token');
        axios({
          url: `${USER_URL}/me`,
          method: "put",
          data: updatedProfile,
          headers: {
            "x-auth-token": token
          }
        }).then((res) => {
            // console.log(userInfo);
            // console.log(updatedProfile);
          setUserInfo(updatedProfile);
          setOpen(false);
        }).catch(err => {
          console.log(err);
        })
    } 

    let content = (
        <React.Fragment>
        <Container className={classes.cardGrid} maxWidth="md">
        <Modal onClose={handleCloseModal} open={open}>
                <div style={modalStyle} className={classes.modalBox}>
                  <h1 className={classes.modalTitle}> Edit Profile </h1>
                   <ProfileForm
                      defaultValueMap={userInfo}
                      onSubmit={(data) => handleEditProfile(data)}
                    //   onSubmit={modalState.onSubmit}
                   />
                </div>
            </Modal>
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
                    <Typography variant='h6' align="left" gutterBottom='true'>
                        Student Number : {userInfo.studentNumber}</Typography> 
                </Grid>
            </div>
            <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleOpenModal(
                                        userInfo.name, 
                                        userInfo.email, 
                                        userInfo.studentNumber, 
                                        ((data) => handleEditProfile(data)))}
          >
            Edit Info
          </Button>
        </Container>
    </React.Fragment>
    )
    return (
      <Dashboard content={content} title="Profile"/>
    )
}


// //Function
// (params) => {
// //anon funciton
// }