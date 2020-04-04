import React, {useState} from 'react';
// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
      marginTop: "10px"
  },
  appBarHeader: {
      boxShadow: "none"
  }
}));

export default function TabWrapper(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const {tabHeaders, tabBodies} = props;
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


  return (
    <div className={classes.root}>
      <AppBar className={classes.appBarHeader} position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
            {tabHeaders.map((header, index) => {
                return (
                    <Tab key={index} label={header.label} icon={header.icon} disabled={header.disabled}/>
                )
            })}
        </Tabs>
      </AppBar>
        {tabBodies.map((TabBody, index) => {
            return (
                <TabPanel value={value} index={index} dir={theme.direction}>
                    <TabBody/>
                </TabPanel>
            )
        })}
    </div>
  );
}
