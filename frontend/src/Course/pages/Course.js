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
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Dashboard from '../../User/components/Dashboard';
import axios from 'axios';
import moment from 'moment'

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
      height: "600px",
      overflow: 'auto'
    }
}));

export default function Course(props) {

    const [course, setCourse] = useState({});
    const [admin, setAdmin] = useState({});
    const [user, setUser] = useState({});
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

    const fetchProblems = async () => {
        const token = localStorage.getItem('token');
        const problemsData = await axios({
            url: 'http://localhost:5000/api/courses/'+CourseId+'/problems',
            method: "get",
            headers: {
                "x-auth-token": token
            }
        });
        const myProblems = problemsData.data;
        setAllProblems(myProblems);
    };

    const handleOpenModalEx = (title, buttonTitle, defaultValueMap, onSubmit) => {
      // setOpen(true);
      let dl = defaultValueMap.deadline;
      if (dl) {
          const date = moment(dl, "YYYY-MM-DD");
          defaultValueMap.deadline = date.format('MM-DD-YYYY');
      }
      setModalState({title, buttonTitle, defaultValueMap, onSubmit});
      setOpen(true);
    }

    const handleCloseModal = () => {
      setModalState({});
      fetchProblems();
      setOpen(false);
    }

    let handleCreateProblem = async (data) => {
      const token = localStorage.getItem('token');
      try{
        let res = await axios({
          url: 'http://localhost:5000/api/courses/'+CourseId+'/problems/',
          method: "post",
          data: data,
          headers: {
            "x-auth-token": token
          }
        });
        const newProblem = res.data;
        res = await axios({
          url: `http://localhost:5000/api/courses/${CourseId}/problems/${newProblem._id}/testcases/batch`,
          method: 'post',
          data: {testcases: data.testcases},
          headers: {
            "x-auth-token": token
          }
        });
        const newTestcases = res.data;
        newProblem.testcases = newTestcases;
        setAllProblems([...allProblems, newProblem]);
        setOpen(false);
      }catch(e){
        console.log(e.message);
      }
    }

    let handleEditProblem = async (data) => {
        const token = localStorage.getItem('token');
        try{
          let res = await axios({
            url: 'http://localhost:5000/api/courses/'+CourseId+'/problems/'+data._id,
            method: "put",
            data: data,
            headers: {
              "x-auth-token": token
            }
          });
          res = await axios({
            url: `http://localhost:5000/api/courses/${CourseId}/problems/${data._id}/testcases/batch`,
            method: "post",
            data: {testcases: data.testcases, deletedTestcases: data.deletedTestcases},
            headers: {
              "x-auth-token": token
            }
          });
          data.testcases = res.data;
          const newProblems = allProblems.map(e => {
            if(e._id == data._id)
              return data;
            return e;
          });
          setAllProblems(newProblems);
          setOpen(false);
        }catch(e){
          console.log(e.message);
        }
    }

    let handleDeleteProblem = (data) => {
        const token = localStorage.getItem('token');
        axios({
          url: 'http://localhost:5000/api/courses/'+CourseId+'/problems/'+data,
          method: "delete",
          headers: {
            "x-auth-token": token
          }
        }).then(res => {
          const newProblems = allProblems.filter(e => {
            return e._id != data;
          });
          setAllProblems(newProblems);
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
                
                const problemsData = await axios({
                    url: 'http://localhost:5000/api/courses/'+CourseId+'/problems?testcases=true',
                    method: "get",
                    headers: {
                        "x-auth-token": token
                    }
                });
                const myProblems = problemsData.data;
                const userData = await axios({
                  url: 'http://localhost:5000/api/user/me',
                  method: 'get',
                  headers: {
                        "x-auth-token": token
                  }
                });
                setAllProblems(myProblems);
                setCourse(res.data);
                setAdmin(res.data.admin_id);
                setUser(userData.data);
            }
            fetchData();
        }
        catch (err) {
            console.log(err.message);
        }
    }, []);

    allProblems.sort((problem1, problem2) => new Date(problem2.deadline) - new Date(problem1.deadline))
    let content = (
        <div>
            <Modal onClose={handleCloseModal} open={open}>
                <div style={modalStyle} className={classes.modalBox}>
                  <h1 className={classes.modalTitle}> {modalState.title}</h1>
                   <ProblemForm
                      buttonTitle={modalState.buttonTitle}
                      defaultValueMap={modalState.defaultValueMap}
                      onSubmit={modalState.onSubmit}
                   />
                </div>
            </Modal>
            <Container>
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
                                Administrator: {admin.name}
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
                    <IconButton color="primary" className={classes.iconAlignRight} disabled={user._id != admin._id}
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
                             <TableCell>Total marks</TableCell>
                             <TableCell align="left">Deadline</TableCell>
                             <TableCell align="left">Success ratio</TableCell>
                             <TableCell align="left">Action</TableCell>
                         </TableRow>
                         </TableHead>
                         <TableBody>
                         {allProblems.map((data, index) => (
                             <TableRow key={index}>
                             <TableCell>
                             <Button size="small" color="primary" color="inherit"><Link to={ "/problem/"+CourseId+"/"+data._id  }>{data.name}</Link></Button></TableCell>
                             <TableCell>{data.mark}</TableCell>
                             <TableCell component="th" scope="row" align="left">
                                 <Moment format="HH:mm on MMM D, YYYY ">{data.deadline}</Moment> (<Moment fromNow style={{color: "blue"}}>{data.deadline}</Moment>)
                             </TableCell>
                             <TableCell align="left">0</TableCell>
                             <TableCell>

                                 <IconButton size="small"
                                   color="primary"
                                   disabled={user._id != admin._id}
                                   onClick={() => handleOpenModalEx(
                                                                 "Edit problem",
                                                                 "Save changes",
                                                                 data,
                                                                 ((d) => handleEditProblem(d)))}
                                 >
                                     <EditIcon/>
                                 </IconButton>

                                 <IconButton
                                     size="small"
                                     color="primary"
                                     disabled={user._id != admin._id}
                                     onClick={() => {
                                         let isOk = window.confirm("Are you sure that you want to delete this problem?")
                                         if(isOk)
                                             handleDeleteProblem(data._id);
                                     }}
                                 >
                                     <DeleteIcon />
                                 </IconButton>

                             </TableCell>
                             </TableRow>
                         ))}
                         </TableBody>
                     </Table>
                 </TableContainer>

             </Container>
      </div>
    )

    return (
        <Dashboard title={"Course Page"} content={content}/> 
    );
}
