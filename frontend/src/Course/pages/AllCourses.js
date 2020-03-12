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
import AddCourseForm from '../../shared/components/AddCourseForm';


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
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      }
}));
export default function AllCourses(props){
    
    //Context
    const auth = useContext(AuthContext);

    //Modal
    const modalStyle = getModalStyle();
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => {
      setOpen(true);
    }
    const handleCloseModal = () => {
      setOpen(false);
    }
    const classes = useStyles();
    const [allCourses, setAllCourses] = useState([]);
      useEffect(() => {
        const token = localStorage.getItem('token');
        axios({
          url: 'http://localhost:5000/api/courses',
          headers: {
            "x-auth-token": token
          }
        }).then((res) => {
          console.log(res);
          const allCourses = res.data;
          setAllCourses(allCourses);
        }).catch(err => {
          console.log(err);
        });
      }, []);

  var createCourse = () => {
    const token = localStorage.getItem('token');
    axios({
      url: 'http://localhost:5000/api/courses',
      method: "post",
      headers: {
        "x-auth-token": token
      }
    }).then(res => {
      const newCourse = res.data;
      setAllCourses([...allCourses, newCourse]);
    }).catch(err => {
      console.log(err);
    })
  }
    return(
    <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <div className={classes.main}  >
            <Modal onClose={handleCloseModal} open={open}>
                <div style={modalStyle} className={classes.modalBox}>
                  <h2 className={classes.modalTitle}> Adding New course</h2>
                  <AddCourseForm />
                </div>
            </Modal>
            <div className={classes.courseGroupHeader}  >
              <Typography variant="h4" > 
                Administrative Courses
              </Typography>
              <ToolTip title="Create course" placement="top">
                <IconButton color="primary" className={classes.iconAlignRight} onClick={handleOpenModal}>
                    <AddIcon />
                </IconButton>
              </ToolTip>
            </div>
            <Divider />
            <div className={classes.courseGroup}>
              <Grid container spacing={4}>
                {allCourses.map(course => (
                  course.admin_id == auth.userInfo._id && 
                  <Grid item key={course} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {course.name}
                        </Typography>
                        <Typography>
                          {course.description.substring(0, 100)}
                          {course.description.length > 100 && "..."}
                        </Typography>
                        <Typography>
                          Term: {course.term.toUpperCase()}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing >
                        <Button size="small" color="primary">
                          View
                        </Button>
                        <section className={classes.iconAlignRight}>
                            <IconButton size="small" color="primary" onClick={() => console.log("edit")}>
                                <EditIcon/> 
                            </IconButton>
                            <IconButton  size="small" color="primary" onClick={() => console.log("delete")}>
                                <DeleteIcon /> 
                            </IconButton>

                        </section>

                      </CardActions>
                    </Card>
                  </Grid>
                ))}
            </Grid>

            </div>
          </div>
          
        </Container>
      </main>
    );
}