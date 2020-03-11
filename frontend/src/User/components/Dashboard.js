
import React, {useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { AuthContext } from '../../shared/context/auth-context';
import Header from './Header';
import SideBar from '../../shared/components/SideBar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ToolTip from '@material-ui/core/Tooltip';
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
const sections = [
    { title: 'Home', url: '/dashboard' },
    { title: 'Assignment', url: '#' },
    { title: 'Grades', url: '#' },
    { title: 'Group Project', url: '#' },
    { title: 'Schedule', url: '#' },
    { title: 'TODO: Think about this', url: '#' },
  ];

const useStyles = makeStyles(theme => ({
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
    marginBottom: 20 
  }
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// export default function Album() {
export default function Dashboard(props){
  const classes = useStyles();

  const content = (
    <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <div className={classes.courseGroup}  >
            <div className={classes.courseGroupHeader} style={{display: "flex"}} >
              <Typography variant="h4" > 
                Administrative Courses
              </Typography>
              <ToolTip title="Create course" placement="top">
                <IconButton color="primary" className={classes.iconAlignRight} onClick={() => {}}>
                    <AddIcon />
                </IconButton>
              </ToolTip>
              <Divider />
            </div>
            <Grid container spacing={4}>
              {cards.map(card => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        CMPT 470 - Web-based information system 
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to describe the content.
                        alalallalalalalallalala
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
          
        </Container>
      </main>
  )

  return (
    <React.Fragment>
      <CssBaseline />
      <SideBar title={"Courses"} content={content} />
      
    </React.Fragment>
  );
}