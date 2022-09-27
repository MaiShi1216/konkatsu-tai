import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from '@/components/header/style.css'

import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import FavoriteIcon from '@mui/icons-material/Favorite'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import SettingsIcon from '@mui/icons-material/Settings'

import { NavLink } from 'react-router-dom'

type ResJson = {
  name: string
}

export const Header = () => {
  // Drawer の開閉状態
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  // Drawer の開閉
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen) // Drawer の開閉状態を反転
  }
  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.appName}>Woven Marriage Hunting App</h1>
        {/* ここから追記 */}
        <IconButton color="inherit" onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="right" variant="temporary" open={drawerOpen} onClose={handleDrawerToggle}>
          <List>
            <NavLink to="/">
              <ListItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </NavLink>

            <NavLink to="/matched">
              <ListItem>
                <ListItemIcon>
                  <FavoriteIcon />
                </ListItemIcon>
                <ListItemText primary="Matched members" />
              </ListItem>
            </NavLink>

            <NavLink to="/recommended">
              <ListItem>
                <ListItemIcon>
                  <VolunteerActivismIcon />
                </ListItemIcon>
                <ListItemText primary="Recommended members" />
              </ListItem>
            </NavLink>

            <NavLink to="/edit">
              <ListItem>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Correction of registration information" />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
        {/* ここまで */}
      </div>
    </>
  )
}
