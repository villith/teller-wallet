import { CircularProgress, Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { History, Location } from 'history';
import * as React from 'react';
import { match } from 'react-router';

import { Contact } from '../../classes/Contact';
import { Ledger } from '../../classes/Ledger';
import { Transaction } from '../../classes/Transaction';
import { findById } from '../../helpers/get';
import { web3 } from '../../helpers/web3';
import { ISettings } from '../../interfaces/Settings';
import { IUser } from '../../interfaces/User';
import MainContent from '../MainContent/MainContent';
import NavBar from '../NavBar/NavBar';
import SideMenu from '../SideMenu/SideMenu';
import ToolbarContainer from '../Toolbar/ToolbarContainer';

dotenv.config();

export interface IAppProps {
  match: match<any>;
  history: History;
  location: Location<any>;
}

export interface IAppState {
  contacts: Contact[];
  loading: boolean;
  settings: ISettings;
  sideMenuOpen: boolean;
  transactions: Transaction[];
  user: IUser;
  wallet: {
    balance: any;
  }
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100%'
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 6,
    overflowY: 'scroll'
  },
  action: {
    marginLeft: theme.spacing.unit / 4,
    marginRight: theme.spacing.unit / 4,
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
  },
  loading: {
    margin: 'auto'
  }
});

class App extends React.Component<WithStyles<any> & IAppProps, IAppState> {
  public state = {
    loading: true,
    contacts: [] as Contact[],
    settings: {} as ISettings,
    sideMenuOpen: false,
    transactions: [] as Transaction[],
    user: {} as IUser,
    wallet: {
      balance: {}
    }
  }

  public componentWillMount() {
    this.loadContent();
  }

  public loadContent = () => {
    const promiseArray: Array<Promise<void>> = [
      this.loadTransactions(),
      this.loadContacts(),
      this.loadUser(),
      this.loadSettings()
    ];
    Promise.all(promiseArray).then(() => this.setState({ loading: false }, () => this.loadBalance()));
  }

  public loadBalance = () => {
    const { user, wallet } = this.state;
    web3.eth.getBalance(user.address).then(result => {
      wallet.balance = web3.utils.fromWei(result, 'ether');
      this.setState({ wallet });
    });
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

  public loadSettings = () => {
    return fetch('settings.json')
      .then(result => result.json())
      .then((settings: ISettings) => {
        console.log(settings);
        this.setState({ settings });
    });
  }

  public handleEditContact = (contact: Contact) => {
    const { contacts } = this.state;
    const index = findById(contact.id, contacts);
    const existingContact = contacts[index];
    if (existingContact) {
      contacts[index] = contact;
      this.setState({ contacts }, () => this.saveContacts());
    }
    else {
      console.log(`[handleEditContact] Contact with ${contact.id} could not be found.`);
    }
  }

  public handleDeleteContact = (contact: Contact) => {
    const { contacts } = this.state;
    const index = findById(contact.id, contacts);
    const existingContact = contacts[index];
    if (existingContact) {
      contacts.splice(index, 1);
      this.setState({ contacts }, () => this.saveContacts());
    }
    else {
      console.log(`[handleDeleteContact] Contact with ${contact.id} could not be found.`);
    }
  }

  public saveContacts = () => {
    const { contacts } = this.state;
    fs.writeFile('contacts.json', contacts, (err: any) => {
      if (err) { throw err; }
      console.log('Saved contact changes');
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
    this.setState({ contacts }, () => this.saveContacts());
  }

  public handleSelectCurrency = (currencyCode: string) => {
    console.log(`[handleSelectCurrency] currencyCode: ${currencyCode}`);
    const { settings } = this.state;
    settings.currencyCode = currencyCode;
    this.setState({ settings });
  }

  public render() {
    const { classes, location } = this.props;
    const { contacts, loading, settings, sideMenuOpen, transactions, user } = this.state;
    return (
      <div className={classes.root}>
        <ToolbarContainer />
        <NavBar
          currencyCode={settings.currencyCode}
          handleSelectCurrency={this.handleSelectCurrency}
          sideMenuOpen={sideMenuOpen}
          toggleSideMenu={this.toggleSideMenu}
        />
        <SideMenu
          closeMenu={this.closeSideMenu}
          location={location}
          open={sideMenuOpen}
          openMenu={this.openSideMenu}
        />
        {loading ? (
          <CircularProgress className={classes.loading} size={96} />
        ) : (
          <Grid container={true} spacing={16} className={classes.content}>
            <MainContent
              contacts={contacts}
              transactions={transactions}
              user={user}
              handleSelectCurrency={this.handleSelectCurrency}
              toggleContactFavorite={this.toggleContactFavorite}
              handleEditContact={this.handleEditContact}
              handleDeleteContact={this.handleDeleteContact}
            />
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(App);
