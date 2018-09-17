import {
  AppBar,
  IconButton,
  StyleRulesCallback,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Menu as MenuIcon, Settings as SettingsIcon } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';

export interface INavBarProps {
  sideMenuOpen: boolean;
  toggleSideMenu: (() => void);
}

export interface INavBarState {
  placeholder?: string;
}

const drawerWidth = 240;

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  action: {
    marginLeft: theme.spacing.unit / 4,
    marginRight: theme.spacing.unit / 4,
    '-webkit-app-region': 'initial'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  '-webkit-app-region': 'drag'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  avatarIcon: {
    width: 48,
    height: 48
  },
  divider: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
    '-webkit-app-region': 'initial'
  },
  hide: {
    display: 'none',
  },
  outlined: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    color: 'white',
    borderColor: 'white'
  }
});

class NavBar extends React.Component<WithStyles<any> & INavBarProps, INavBarState> {
  public render() {
    const { classes, sideMenuOpen, toggleSideMenu } = this.props;
    return (
      <AppBar
        position='absolute'
        className={classNames(classes.appBar, sideMenuOpen && classes.appBarShift)}
      >
        <Toolbar disableGutters={!sideMenuOpen}>
          <IconButton
            color='inherit'
            aria-label='Menu'
            onClick={toggleSideMenu}
            className={classNames(classes.menuButton, sideMenuOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='title' color='inherit' className={classes.flex}>
            Teller Wallet
          </Typography>
          <div className={classes.action}>
            <Tooltip title='Settings'>
              <IconButton
                color='inherit'
                aria-label='Settings'
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavBar)