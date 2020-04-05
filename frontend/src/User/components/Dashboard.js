
import React, {useState, useEffect, useContext} from 'react';
import AllCourses from '../../Course/pages/AllCourses';
import Statistic from '../pages/Statistic';
import UserProfile from '../pages/UserProfile';

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
import { Link } from 'react-router-dom';

export default function Dashboard(props){

  const auth = useContext(AuthContext);
  const pageTitle = props.title;
  const {content} = props;
  const sections = [
    {title: 'Profile', icon: <AccountBoxIcon />, link:'/profile'},
    {title: 'Courses', icon: <SchoolIcon />, link:'/dashboard'},
    {title: 'Statistic', icon: <EqualizerIcon />, link:'/statistic'}
  ]
  
  return (
    <React.Fragment>
      <CssBaseline />
      <SideBar title={pageTitle} content={content}>
        {sections.map((section, index) => (
            <ListItem selected={section.title == pageTitle} key={index} component={Link} to={section.link}>
              <ListItemIcon>
                {section.icon}
              </ListItemIcon>
              <ListItemText primary={section.title} />
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
