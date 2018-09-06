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
import { Apps as AppIcon, Menu as MenuIcon, SaveAlt as SaveAltIcon, Share as ShareIcon } from '@material-ui/icons';
import * as classNames from 'classnames';
import * as React from 'react';
import SideMenu from '../SideMenu/SideMenu';

export interface IAppProps {
  placeholder?: string;
}

export interface IAppState {
  sideMenuOpen: boolean;
}

const drawerWidth = 280;

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 6
  },
  action: {
    marginLeft: theme.spacing.unit / 4,
    marginRight: theme.spacing.unit / 4,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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

class App extends React.Component<WithStyles<any> & IAppProps, IAppState> {
  public state = {
    sideMenuOpen: false
  }

  public toggleSideMenu = () => {
    this.setState(prevState => ({ sideMenuOpen: !prevState.sideMenuOpen }));
  }

  public openSideMenu = () => {
    this.setState({ sideMenuOpen: true });
  }

  public closeSideMenu = () => {
    this.setState({ sideMenuOpen: false });
  }

  public render() {
    const { classes } = this.props;
    const { sideMenuOpen } = this.state;
    return (
      <div className={classes.root}>
        <AppBar
          position='absolute'
          className={classNames(classes.appBar, sideMenuOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!sideMenuOpen}>
            <IconButton
              color='inherit'
              aria-label='Menu'
              onClick={this.toggleSideMenu}
              className={classNames(classes.menuButton, sideMenuOpen && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='title' color='inherit' className={classes.flex}>
              Teller Wallet
            </Typography>
            <div className={classes.action}>
              <Tooltip title='Show Strategy List'>
                <IconButton
                  color='inherit'
                  aria-label='test'
                >
                  <AppIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={classes.action}>
              <Tooltip title='Import'>
                <IconButton
                  color='inherit'
                  aria-label='Import'
                >
                  <SaveAltIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div className={classes.action}>
              <Tooltip title='Export'>
                <IconButton
                  color='inherit'
                  aria-label='Export'                
                >
                  <ShareIcon />
                </IconButton>
              </Tooltip>
            </div>
          </Toolbar>
        </AppBar>
        <SideMenu
          closeMenu={this.closeSideMenu}
          open={sideMenuOpen}
          openMenu={this.openSideMenu}
        />
      </div>
    );
  }
}

export default withStyles(styles)(App);
