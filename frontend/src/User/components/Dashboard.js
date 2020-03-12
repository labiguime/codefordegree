
import React, {useState, useEffect, useContext} from 'react';
import AllCourses from '../../Course/pages/AllCourses';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../../shared/components/SideBar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SchoolIcon from '@material-ui/icons/School';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { AuthContext } from '../../shared/context/auth-context';


export default function Dashboard(props){

  //const classes = useStyles();
  const [pageTitle, setPageTitle] = useState("Courses");
  const auth = useContext(AuthContext);
  
  let content;
  switch(pageTitle){
    case "Courses":
      content = <AllCourses />
      break;
    default:
      content = <div></div>
      break;
  }

  const sections = [
    {title: 'Profile', icon: <AccountBoxIcon />},
    {title: 'Courses', icon: <SchoolIcon />},
    {title: 'Statistic', icon: <EqualizerIcon />}
  ]
  return (
    <React.Fragment>
      <CssBaseline />
      <SideBar title={pageTitle} content={content} >
        {sections.map((section, index) => (
          <ListItem selected={section.title == pageTitle} 
                    button key={index} 
                    onClick={() => {setPageTitle(section.title)}}>
            <ListItemIcon>
              {section.icon}
            </ListItemIcon>
            <ListItemText primary={section.title}/>
          </ListItem>
        ))}
        <ListItem 
        button
        onClick={auth.logout}>
            <ListItemIcon>
              <ExitToAppOutlinedIcon/>
            </ListItemIcon>
            <ListItemText>
              Sign out
            </ListItemText>
        </ListItem>
        
      </SideBar>
    </React.Fragment>
  );
}