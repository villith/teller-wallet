import { CircularProgress, Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Ledger } from '../../classes/Ledger';
import { Transaction } from '../../classes/Transaction';
import { findById } from '../../helpers/get';
import { IUser } from '../../interfaces/User';
import MainContent from '../MainContent/MainContent';
import NavBar from '../NavBar/NavBar';
import SideMenu from '../SideMenu/SideMenu';

export interface IAppProps {
  placeholder?: string;
}

export interface IAppState {
  contacts: Contact[];
  currentPage: string;
  loading: boolean;
  sideMenuOpen: boolean;
  transactions: Transaction[];
  user: IUser;
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
    marginTop: theme.spacing.unit * 6,
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
    currentPage: '/',
    contacts: [] as Contact[],
    sideMenuOpen: false,
    transactions: [] as Transaction[],
    user: {} as IUser
  }

  public componentDidMount() {
    this.loadContent();
  }

  public loadContent = () => {
    const promiseArray: Array<Promise<void>> = [
      this.loadTransactions(),
      this.loadContacts(),
      this.loadUser()
    ];
    Promise.all(promiseArray).then(() => this.setState({ loading: false }));
  }

  public loadTransactions = () => {
    return fetch('my_ledger.json')
      .then(result => result.json())
      .then((ledger: Ledger) => {
        const { entries } = ledger;
        this.setState({ transactions: entries });
    });
  }

  public loadContacts = () => {
    return fetch('contacts.json')
      .then(result => result.json())
      .then((contacts: Contact[]) => {
        contacts.map(contact => {
          const { address, title, firstName, lastName, description, notes, favorite } = contact;
          const newContact = new Contact(
            address,
            firstName,
            lastName,
            title,
            description,
            notes,
            favorite
          );
          return newContact;
        });
        this.setState({ contacts });
    });
  }

  public loadUser = () => {
    return fetch('user.json')
      .then(result => result.json())
      .then((user: IUser) => {
        this.setState({ user });
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

  public toggleContactFavorite = (id: string) => {
    const { contacts } = this.state;
    const index = findById(id, contacts);
    const contact = contacts[index];
    if (contact) {
      contact.favorite = !contact.favorite;
    }
    this.setState({ contacts });
  }

  public render() {
    const { classes } = this.props;
    const { contacts, currentPage, loading, sideMenuOpen, transactions, user } = this.state;
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
              currentPage={currentPage}
              contacts={contacts}
              transactions={transactions}
              user={user}
              toggleContactFavorite={this.toggleContactFavorite}
            />
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(App);
