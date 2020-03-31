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
import axios from 'axios';

const useStyles = makeStyles(theme => ({
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
    }
}));

export default function Course(props) {

    const [course, setCourse] = useState([]);
    const [user, setUser] = useState([]);
    const {CourseId} = props.match.params;


    const classes = useStyles();

    useEffect(() => {
        const token = localStorage.getItem('token');
        try {
            const fetchProblem = async () => {
                const res = await axios({
                    url: 'http://localhost:5000/api/courses/'+CourseId,
                    method: "get",
                    headers: {
                        "x-auth-token": token
                    }
                });
                setCourse(res.data);
                const adminId = res.data.admin_id;
                setUser(adminId);
            }
            fetchProblem();
        }
        catch (err) {
            console.log(err.message);
        }
    }, []);


    return (
        <div>
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
                    <IconButton color="primary" className={classes.iconAlignRight}>
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
