import React ,{useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import ToolTip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import {AuthContext} from '../../shared/context/auth-context';
import axios from 'axios';
import CourseForm from '../../shared/components/CourseForm';
import {COURSE_URL} from '../../shared/constants';
import Dashboard from '../../User/components/Dashboard';
import {Link} from 'react-router-dom';
import EnrollmentModal from '../../shared/components/EnrollmentModal'

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
      modalTitle: {
      textAlign: "center"
      },
      icon: {
        marginRight: theme.spacing(2),
      },
      heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
      heroButtons: {
        marginTop: theme.spacing(4),
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
        flexGrow: 1,
      },
      footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
      },
      iconAlignRight: {
          marginLeft:'auto'
      },
      courseGroupHeader: {
        display: 'flex'
      },
      courseGroup: {
        marginTop: 20
      },
      modalBox: {
        position: 'absolute',
        width: "70%",
        backgroundColor: theme.palette.background.paper,
        border: '1px solid black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }
}));

export default function AllCourses(props){

    //Context
    const auth = useContext(AuthContext);

    //Styles
    const classes = useStyles();
    const modalStyle = getModalStyle();

    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAdminModal, setIsModalAdminModal] = useState(false);
    const [modalState, setModalState] = useState({});
    const [allCourses, setAllCourses] = useState([]);
    const [coursesAvailable, setCoursesAvailable] = useState([]);
    const [coursesEnrolled, setCoursesEnrolled] = useState([]);
    const [course, setCourse] = useState([]);

    useEffect(() => {
       retrieveAllCourses();
       retrieveEnrollableCourses();
       retrieveEnrolledCourses();
    }, []);

    const retrieveEnrolledCourses = async () => {
        const token = localStorage.getItem('token');
        try {
            const result = await axios({
                url: `${COURSE_URL}/enrolled`,
                headers: {
                    "x-auth-token": token
                }
            });
            const data = result.data;
            setCoursesEnrolled(data);
            return data;
        } catch (e) {
            console.log(e);
        }
    };

    const retrieveAllCourses = async () => {
       const token = localStorage.getItem('token');
       try {
           const result = await axios({
               url: COURSE_URL,
               headers: {
                   "x-auth-token": token
               }
           });
           const data = result.data;
           setAllCourses(data);
           return data;
       } catch (e) {
           console.log(e);
       }
    };

    const retrieveEnrollableCourses = async () => {
       const token = localStorage.getItem('token');
       try {
           const result = await axios({
               url: `${COURSE_URL}/all`,
               headers: {
                   "x-auth-token": token
               }
           });
           const data = result.data;
           setCoursesAvailable(data);
           return data;
       } catch (e) {
           console.log(e);
       }
    };

    const handleCreateAdministrativeCourse = async (data) => {
        const token = localStorage.getItem('token');
        try {
            const result = await axios({
                url: COURSE_URL,
                method: "post",
                data: data,
                headers: {
                    "x-auth-token": token
                }
            });
            const createdCourse = result.data;
            setAllCourses([...allCourses, createdCourse]);
            setCoursesAvailable([...coursesAvailable, createdCourse]);
            setIsModalOpen(false);
        } catch (e) {
            console.log(e);
            setIsModalOpen(false);
        }
    };

    const handleEditAdministrativeCourse = async (updatedCourse) => {
        const token = localStorage.getItem('token');
        try {
            const result = await axios({
                url: `${COURSE_URL}/${updatedCourse._id}`,
                method: "put",
                data: updatedCourse,
                headers: {
                    "x-auth-token": token
                }
            });

            const updatedAllCoursesList = allCourses.map(e => {
                if(e._id == updatedCourse._id) {
                    return updatedCourse;
                }
                return e;
            });

            setAllCourses(updatedAllCoursesList);
            setIsModalOpen(false);
        } catch (e) {
            console.log(e);
            setIsModalOpen(false);
        }
    };

    const handleDeleteAdministrativeCourse = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const result = await axios({
                url: `${COURSE_URL}/${id}`,
                method: "delete",
                headers: {
                    "x-auth-token": token
                }
            });

            await retrieveEnrolledCourses();

            const updatedAllCoursesList = allCourses.filter(e => {
                return e._id != id;
            });

            const updatedAvailableCoursesList = coursesAvailable.filter(e => {
                return e._id != id;
            });

            setCoursesAvailable(updatedAvailableCoursesList);
            setAllCourses(updatedAllCoursesList);
            setIsModalOpen(false);
        } catch (e) {
            console.log(e);
            setIsModalOpen(false);
        }
    };

    const handleEnrollCourse = async (c) => {
        const token = localStorage.getItem('token');
        try {
            const result = await axios({
                url: `${COURSE_URL}/join/${c}`,
                method: "post",
                data: {userId: auth.userInfo._id},
                headers: {
                    "x-auth-token": token
                }
            });
            await retrieveEnrolledCourses();
            setIsModalOpen(false);
        } catch (e) {
            console.log(e);
            setIsModalOpen(false);
        }
    };

    const handleLeaveEnrolledCourse = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const result = await axios({
                url: `${COURSE_URL}/leave/${id}`,
                method: "delete",
                data: {userId: auth.userInfo._id},
                headers: {
                    "x-auth-token": token
                }
            });
            await retrieveEnrolledCourses();
            setIsModalOpen(false);
        } catch (e) {
            console.log(e);
            setIsModalOpen(false);
        }
    };

    const handleOpenModal = (title, buttonTitle, defaultValueMap, onSubmit, isAdminCoursesModal) => {
        setModalState({title, buttonTitle, defaultValueMap, onSubmit});
        setIsModalOpen(true);
        (isAdminCoursesModal) ? setIsModalAdminModal(true) : setIsModalAdminModal(false);
    }

    const handleCloseModal = (isAdminCoursesModal) => {
        setModalState({});
        setIsModalOpen(false);
    }
    let content = (
        <Container className={classes.cardGrid} maxWidth="md">
            <div className={classes.main}>
                <Modal onClose={() => handleCloseModal(isModalAdminModal)} open={isModalOpen}>
                    <div style={modalStyle} className={classes.modalBox}>
                        <h1 className={classes.modalTitle}> {modalState.title} </h1>
                        {
                            (isModalAdminModal) ? <CourseForm
                            buttonTitle={modalState.buttonTitle}
                            defaultValueMap={modalState.defaultValueMap}
                            onSubmit={modalState.onSubmit}
                            /> : <EnrollmentModal
                                buttonTitle={modalState.buttonTitle}
                                defaultValueMap={modalState.defaultValueMap}
                                onSubmit={modalState.onSubmit}
                            />
                        }
                    </div>
                </Modal>
                <div className={classes.courseGroupHeader}  >
                    <Typography variant="h4" >
                        Enrolled Course
                    </Typography>
                    <ToolTip title="Enroll Course" placement="top">
                        <IconButton
                            color="primary"
                            className={classes.iconAlignRight}
                            onClick={() => handleOpenModal("Enrollment module", "Enroll", (coursesAvailable),  handleEnrollCourse, false)}
                        >
                            <AddIcon />
                        </IconButton>
                    </ToolTip>
                </div>
                <Divider />
                <div className={classes.courseGroup}>
                    <Grid container spacing={4}>
                        {coursesEnrolled.map(({admin_id, name, term, description, _id}, idx) => (
                            <Grid item key={idx} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {name}
                                        </Typography>
                                        <Typography>
                                            {(description && description.length > 100) && (description.substring(0, 100).trim() + '....')}
                                            {description && description.length <=100 && description}
                                        </Typography>
                                        <Typography>
                                            Term: {term.toUpperCase()}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing >
                                        <Button size="small" color="primary">
                                            <Link className={classes.linkStyle} to={ "/course/"+_id}>View</Link>
                                        </Button>
                                        <section className={classes.iconAlignRight}>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => {
                                                    let isOk = window.confirm("Do you truly wish to drop out of this course?");
                                                    if(isOk)
                                                        handleLeaveEnrolledCourse(_id);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </section>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <br />
                    <br />
                    <br />
                    <div className={classes.courseGroupHeader}  >
                        <Typography variant="h4" >
                            Teaching Course
                        </Typography>
                        <ToolTip title="Create course" placement="top">
                            <IconButton
                                color="primary"
                                className={classes.iconAlignRight}
                                onClick={() => handleOpenModal("Adding new course", "Create course", {},  handleCreateAdministrativeCourse, true)}
                            >
                                <AddIcon />
                            </IconButton>
                        </ToolTip>
                    </div>
                    <Divider />
                    <div className={classes.courseGroup}>
                        <Grid container spacing={4}>
                        {allCourses.map(({admin_id, name, term, description, _id}, idx) => (admin_id == auth.userInfo._id &&
                            <Grid item key={idx} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {name}
                                        </Typography>
                                        <Typography>
                                            {(description && description.length > 100) && (description.substring(0, 100).trim() + '....')}
                                            {description && description.length <=100 && description}
                                        </Typography>
                                        <Typography>
                                            Term: {term.toUpperCase()}
                                        </Typography>
                                    </CardContent>
                                    <CardActions disableSpacing >
                                        <Button size="small" color="primary" color="inherit">
                                            <Link className={classes.linkStyle} to={ "/course/"+allCourses[idx]._id}>View</Link>
                                        </Button>
                                        {admin_id == auth.userInfo._id &&
                                        <section className={classes.iconAlignRight}>
                                            <IconButton size="small"
                                                color="primary"
                                                onClick={() => handleOpenModal("Edit course", "Save", allCourses[idx], ((data) => handleEditAdministrativeCourse(data)), true)}
                                            >
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => {
                                                    let isOk = window.confirm("Do you truly wish to proceed with the deletion of this course? This action is irreversible.");
                                                    if(isOk)
                                                        handleDeleteAdministrativeCourse(_id);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </section>
                                        }
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </Container>
    )
    return(
        <Dashboard title="Courses" content={content}/>
        
    );
}
