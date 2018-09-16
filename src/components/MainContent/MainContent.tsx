import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from 'react-router';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { findById, findByPublicKey } from '../../helpers/get';
import { IUser } from '../../interfaces/User';
import AddressBookPage from '../Pages/AddressBookPage';
import HomePage from '../Pages/HomePage';
import SettingsPage from '../Pages/SettingsPage';
import TransactionPage from '../Pages/TransactionPage';

export interface IMainContentProps {
  currentPage: string;
  contacts: Contact[];
  transactions: Transaction[];
  user: IUser;
  toggleContactFavorite: (id: string) => void;
}

export interface IMainContentState {
  currentTransaction: Transaction;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  tableWrapper: {
    overflowX: 'auto',
  },
  widgets: {
    '&> div': {
      marginBottom: theme.spacing.unit * 1.5
    }
  }
});

class MainContent extends React.Component<WithStyles<any> & IMainContentProps, IMainContentState> {
  public state = {
    currentTransaction: {} as Transaction
  }

  public handleSelectTransaction = (transactionId: string) => {
    const index = findById(transactionId, this.props.transactions);
    const tx = this.props.transactions[index];
    this.setState({ currentTransaction: tx });
  }

  public getTransactionContact = () => {
    const { currentTransaction } = this.state;
    const { contacts, user } = this.props;
    let contact = {} as Contact;
    if (currentTransaction.id) {
      const incoming = currentTransaction.to === user.address;
      const publicKey = incoming ? currentTransaction.to : currentTransaction.from;
      const index = findByPublicKey(publicKey, contacts);
      if (index !== -1) {
        contact = contacts[index];
      }
      else {
        contact = new Contact(publicKey, '', '', ''); 
      }
      return contact;
    }
    else {
      return contact;
    }      
  }

  public render() {
    const { contacts, toggleContactFavorite, transactions, user } = this.props;
    const { currentTransaction } = this.state;
    const contact = this.getTransactionContact();
    const homePage = () => {
      return (
        <HomePage
          currentTransaction={currentTransaction}
          contacts={contacts}
          handleSelectTransaction={this.handleSelectTransaction}
          transactions={transactions}
          user={user}
        />
      )
    }
    const addressBookPage = () => {
      return (
        <AddressBookPage
          contacts={contacts}
          transactions={transactions}
        />
      )
    }
    const transactionPage = () => {
      return (
        <TransactionPage
          toggleContactFavorite={toggleContactFavorite}
          user={user}
          handleSelectTransaction={this.handleSelectTransaction}
          currentTransaction={currentTransaction}
          contact={contact}
          contacts={contacts}
          transactions={transactions}
        />
      )
    }
    const settingsPage = () => {
      return (
        <SettingsPage
          contacts={contacts}
          transactions={transactions}
        />
      )
    }
    return (
      <Switch>
        // tslint:disable-next-line:jsx-no-lambda
        <Route exact={true} path='/' render={homePage} />
        <Route path='/transactions' render={transactionPage} />
        <Route path='/addressBook' render={addressBookPage} />
        <Route path='/settings' render={settingsPage} />
      </Switch>
    );
  }
}

export default withStyles(styles)(MainContent);