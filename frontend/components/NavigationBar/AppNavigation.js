import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import TopicIcon from '@mui/icons-material/Topic';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Link } from "react-router-dom";

const drawerWidth = 250;

function AppNavigation(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
          {["Dashboard", "Group Details", "Topic Submission", "Document Submission"].map((text, index) => (
            // <Link  className='nav-links'
            //   to={
            //     text === "Dashboard"
            //       ? `/`
            //       : text === "Group Details"
            //       ? `/groups/${index}`
            //       : text === "Topic Submission"
            //       ? `/register_topic`
            //       : text === "Document Submission"
            //       ? `/documents`
            //       : null
            //   }
            // >
              <ListItem key={text}>
                <ListItemButton>
                  <ListItemIcon>
                  {index == 0 ? <DashboardIcon /> 
                    : index === 1 ? <GroupsIcon />
                    : index === 2 ? <TopicIcon />
                    : index === 3 ? <DriveFolderUploadIcon />
                    : null}
                  </ListItemIcon>
                  <div onClick={() => props.onClickItem(text)} >
                  <ListItemText primary={text} />
                  </div>
                </ListItemButton>
              </ListItem>
            // </Link>
          ))}
        </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "white",
          color: "black",
        }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <Link to={`/login`}>
            <Button color="inherit">Login</Button>          
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >        
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },            
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className='box-content'
      >

      </Box>
    </Box>
  );
}

AppNavigation.propTypes = {
  window: PropTypes.func,
};

export default AppNavigation;
