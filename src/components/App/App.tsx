import { CircularProgress, Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Ledger } from '../../classes/Ledger';
import { Transaction } from '../../classes/Transaction';
import MainContent from '../MainContent/MainContent';
import NavBar from '../NavBar/NavBar';
import SideMenu from '../SideMenu/SideMenu';

export interface IAppProps {
  placeholder?: string;
}

export interface IAppState {
  loading: boolean;
  sideMenuOpen: boolean;
  transactions: Transaction[];
}

const drawerWidth = 280;

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
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
    loading: true,
    sideMenuOpen: false,
    transactions: [] as Transaction[],
  }

  public componentDidMount() {
    this.loadTransactions();
  }

  public loadTransactions = () => {
    fetch('my_ledger.json')
      .then(result => result.json())
      .then((ledger: Ledger) => {
        const { entries } = ledger;
        this.setState({ loading: false, transactions: entries });
    });
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
    const { loading, sideMenuOpen, transactions } = this.state;
    return (
      <div className={classes.root}>
        <NavBar
          sideMenuOpen={sideMenuOpen}
          toggleSideMenu={this.toggleSideMenu}
        />
        <SideMenu
          closeMenu={this.closeSideMenu}
          open={sideMenuOpen}
          openMenu={this.openSideMenu}
        />
        {loading === true ? (
          <CircularProgress className={classes.loading} size={96} />
        ) : (
          <Grid container={true} spacing={16} className={classes.content}>
            <MainContent
              transactions={transactions}
            />
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(App);
