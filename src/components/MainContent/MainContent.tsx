import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, RouteComponentProps, StaticContext, Switch } from 'react-router';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { findById, findByPublicKey } from '../../helpers/get';
import { IUser } from '../../interfaces/User';
import { ListType } from '../List/ListContainer';
import AddressBookPage from '../Pages/AddressBookPage';
import HomePage from '../Pages/HomePage';
import SendPage from '../Pages/SendPage';
import SettingsPage from '../Pages/SettingsPage';
import TransactionPage from '../Pages/TransactionPage';

export interface IMainContentProps {
  contacts: Contact[];
  transactions: Transaction[];
  user: IUser;
  toggleContactFavorite: (id: string) => void;
  handleEditContact: (contact: Contact) => void;
  handleDeleteContact: (contact: Contact) => void;
  handleSelectCurrency: (currencyCode: string) => void;
}

export interface IMainContentState {
  currentContact: Contact;
  currentTransaction: Transaction;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class MainContent extends React.Component<WithStyles<any> & IMainContentProps, IMainContentState> {
  public state = {
    currentContact: {} as Contact,
    currentTransaction: {} as Transaction
  }

  public handleSelectRow = (id: string, listType: ListType) => {
    if (listType === 'Transaction') {
      this.handleChangeTransaction(id);
    }

    if (listType === 'Contact') {
      this.handleChangeContact(id);
    }
  }

  public handleChangeContact = (id: string) => {
    const index = findById(id, this.props.contacts);
    const contact = this.props.contacts[index];
    this.setState({ currentContact: contact });
  }

  public handleChangeTransaction = (id: string) => {
    const index = findById(id, this.props.transactions);
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
    const { contacts, handleDeleteContact, handleEditContact, toggleContactFavorite, transactions, user } = this.props;
    const { currentContact, currentTransaction } = this.state;
    const contact = this.getTransactionContact();
    const homePage = () => {
      return (
        <HomePage
          currentTransaction={currentTransaction}
          contacts={contacts}
          handleSelectRow={this.handleSelectRow}
          transactions={transactions}
          user={user}
        />
      )
    }
    const addressBookPage = (props: RouteComponentProps<any, StaticContext, any>) => {
      const { id } = props.match.params;
      return (
        <AddressBookPage
          currentContact={currentContact}
          currentTransaction={currentTransaction}
          handleChangeContact={this.handleChangeContact}
          handleSelectRow={this.handleSelectRow}
          toggleContactFavorite={toggleContactFavorite}
          user={user}
          contacts={contacts}
          transactions={transactions}
          handleEditContact={handleEditContact}
          handleDeleteContact={handleDeleteContact}
          linkId={id}
        />
      )
    }
    const sendPage = () => {
      return (
        <SendPage
          currentTransaction={currentTransaction}
          currentContact={currentContact}
          handleSelectRow={this.handleSelectRow}
          user={user}
          contacts={contacts}
          transactions={transactions}
          handleChangeContact={this.handleChangeContact}
        />
      )
    }
    const transactionPage = () => {
      return (
        <TransactionPage
          toggleContactFavorite={toggleContactFavorite}
          user={user}
          handleSelectRow={this.handleSelectRow}
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
        <Route exact={true} path='/' render={homePage} />
        <Route path='/transactions' render={transactionPage} />
        <Route path='/addressBook/:id?' render={(props) => addressBookPage(props)} />
        <Route path='/send' render={sendPage} />
        <Route path='/settings' render={settingsPage} />
      </Switch>
    );
  }
}

export default withStyles(styles)(MainContent);