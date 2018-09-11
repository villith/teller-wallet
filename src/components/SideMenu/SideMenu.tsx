import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
  AttachMoney as AttachMoneyIcon,
  ChevronLeft as ChevronLeftIcon,
  Contacts as ContactsIcon,
  Home as HomeIcon,
} from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';

export interface ISideMenuProps {
  closeMenu: (() => void);
  open: boolean;
  openMenu: (() => void);
}

export interface ISideMenuState {
  placeholder?: string;
}

const drawerWidth = 240;

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  avatar: {
    borderRadius: 0
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  selected: {
    backgroundColor: lighten(theme.palette.primary.light, 0.75),
    borderRightWidth: theme.spacing.unit / 2,
    borderRightColor: theme.palette.primary.main,
    borderRightStyle: 'solid',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class SideMenu extends React.Component<WithStyles<any> & ISideMenuProps, ISideMenuState> {
  public render() {
    const { classes, closeMenu, open } = this.props;
    return (
      <Drawer
        open={open}
        variant='permanent'
        classes={{
          paper: classNames(classes.drawer, classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={closeMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>          
          <ListItem
            button={true}
            className={classes.listItem}                
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Overview'}/>
          </ListItem>
          <ListItem
            button={true}
            className={classes.listItem}                
          >
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary={'Transactions'}/>
          </ListItem>
          <ListItem
            button={true}
            className={classes.listItem}                
          >
            <ListItemIcon>
              <ContactsIcon />
            </ListItemIcon>
            <ListItemText primary={'Contacts'}/>
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideMenu)