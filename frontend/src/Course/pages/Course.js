import React, {useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
      iconAlignRight: {
          marginLeft:'auto'
      },
      problemTableTitlingHeader: {
        display: 'flex'
      }
}));

export default function Course(props) {

    const [course, setCourse] = useState([]);
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
                <Typography variant="h6" >
                  Course name:
                </Typography>
                <Typography variant="h6" >
                  Description:
                </Typography>
                <div className={classes.problemTableTitlingHeader}>
                  <Typography variant="h6" >
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
