import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import ToolTip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import ProblemForm from '../../shared/components/ProblemForm';
import axios from 'axios';

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
    root: {
        flexGrow: 1
    },
    iconAlignRight: {
          marginLeft:'auto'
    },
    problemTableTitlingHeader: {
        display: 'flex'
    },
    textCenter: {
        textAlign: 'center'
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
    textRight: {
        textAlign: 'right'
    },
    alignCenter: {
        alignItems: 'center'
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

export default function Course(props) {

    const [course, setCourse] = useState([]);
    const [user, setUser] = useState([]);
    const [allProblems, setAllProblems] = useState([]);
    const {CourseId} = props.match.params;

    const [open, setOpen] = useState(false);
    const modalStyle = getModalStyle();
    const [modalState, setModalState] = useState({});
    const handleOpenModal = (title, buttonTitle, defaultValueMap, onSubmit) => {
      // setOpen(true);
      setModalState({title, buttonTitle, defaultValueMap, onSubmit});
      setOpen(true);
    }
    const handleCloseModal = () => {
      setModalState({});
      setOpen(false);
    }

    let handleCreateProblem = (data) => {
        const token = localStorage.getItem('token');
        axios({
          url: 'http://localhost:5000/api/courses/'+CourseId+'/problems/',
          method: "post",
          data: data,
          headers: {
            "x-auth-token": token
          }
        }).then(res => {
          const newProblem = res.data;
          console.log(newProblem);
          setAllProblems([...allProblems, newProblem]);
          setOpen(false);
        }).catch(err => {
          console.log(err);
        })
    }

    const classes = useStyles();

    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            const fetchData = async () => {
                const res = await axios({
                    url: 'http://localhost:5000/api/courses/'+CourseId,
                    method: "get",
                    headers: {
                        "x-auth-token": token
                    }
                });
                setCourse(res.data);
                setUser(res.data.admin_id);
                const problemsData = await axios({
                    url: 'http://localhost:5000/api/courses/'+CourseId+'/problems',
                    method: "get",
                    headers: {
                        "x-auth-token": token
                    }
                });
                setAllProblems(problemsData);
            }
            fetchData();
        }
        catch (err) {
            console.log(err.message);
        }
    }, []);


    return (
        <div>
            <Container>
                <Modal onClose={handleCloseModal} open={open}>
                    <div style={modalStyle} className={classes.modalBox}>
                      <h1 className={classes.modalTitle}> {modalState.title}</h1>
                       <ProblemForm
                          buttonTitle={modalState.buttonTitle}
                          defaultValueMap={modalState.defaultValueMap}
                          //onSubmit={(data) => handleCreateCourse(data)}
                          onSubmit={modalState.onSubmit}
                       />
                    </div>
                </Modal>
                <br />
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                      <Grid container>
                          <Grid item xs={6}>
                              <Typography variant="h5">
                                Course: {course.name}
                              </Typography>
                          </Grid>
                          <Grid item xs={6}>
                              <Typography variant="h5" className={classes.textRight}>
                                Administrator: {user.name}
                              </Typography>
                          </Grid>
                      </Grid>
                      <br />
                      <Divider />
                      <br />
                      <Grid container>
                          <Grid item xs={12}>
                              <Typography variant="h6" className={classes.textCenter}>
                                {course.description}
                              </Typography>
                          </Grid>
                      </Grid>

                  </CardContent>
                </Card>
                <br />
                <br />
                <div className={classes.problemTableTitlingHeader}>
                  <Typography variant="h6" className={classes.alignCenter} >
                    List of problems
                  </Typography>
                  <ToolTip title="Create problem" placement="top">
                    <IconButton color="primary" className={classes.iconAlignRight}
                    onClick={() => handleOpenModal("Creating new problem", "Create problem", {},  handleCreateProblem)}>
                        <AddIcon />
                    </IconButton>
                  </ToolTip>
                </div>
                <Divider />
                <TableContainer >
                     <Table aria-label="simple table">
                         <TableHead>
                         <TableRow>
                             <TableCell>Name</TableCell>
                             <TableCell align="left">Description</TableCell>
                             <TableCell align="left">Deadline</TableCell>
                             <TableCell align="left">Success ratio</TableCell>
                         </TableRow>
                         </TableHead>
                         <TableBody>

                         </TableBody>
                     </Table>
                 </TableContainer>

             </Container>
      </div>
    );
}
