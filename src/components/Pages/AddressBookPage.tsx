import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import ContactView from '../Contact/ContactView';
import ListContainer, { ListType } from '../List/ListContainer';
import { Aux } from '../winAux';

export interface IAddressBookPageRowProps {
  currentContact: Contact;
  currentTransaction: Transaction;
  handleChangeContact: (id: string) => void;
  handleEditContact: (contact: Contact) => void;
  handleSelectRow: (id: string, listType: ListType) => void;
  toggleContactFavorite?: (id: string) => void;
  user: IUser;
  contacts: Contact[];
  transactions: Transaction[];
  linkId?: string;
}

export interface IAddressBookPageRowState {
  placeholder?: string;
}

const columnData = [
  { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
];

const transactionListColumnData = [
  { id: 'timestamp', numeric: false, disablePadding: false, label: 'Timestamp' },
  { id: 'to', numeric: false, disablePadding: false, label: 'To / From' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
];

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class AddressBookPage extends React.Component<WithStyles<any> & IAddressBookPageRowProps, IAddressBookPageRowState> { 
  public componentDidMount() {
    const { handleChangeContact, linkId } = this.props;
    if (linkId) { handleChangeContact(linkId) }
  }

  public render() {
    const { currentContact, currentTransaction, contacts, handleEditContact, handleSelectRow, user, transactions, toggleContactFavorite } = this.props;
    const txData = transactions.filter(tx => (tx.to === currentContact.address) || (tx.from === currentContact.address));
    return (
      <Aux>
        <Grid item={true} xs={6}>
          {currentContact && currentContact.id &&
            <ContactView
              contact={currentContact}
              toggleContactFavorite={toggleContactFavorite}
              handleEditContact={handleEditContact}
            />
          }
        </Grid>
        <Grid item={true} xs={6}>
          <ListContainer
            columns={columnData}
            currentData={currentContact}
            listType={'Contact'}
            data={contacts}
            handleSelectRow={handleSelectRow}
            user={user}
            listName={'Contacts'}
            sortable={true}
            transactions={transactions}
            placeholderImage={'agenda.svg'}
            placeholderText={'No Contacts Found'}
          />
        </Grid>
        <Grid item={true} xs={6}>
          <ListContainer
            columns={transactionListColumnData}
            currentData={currentTransaction}
            listType={'Transaction'}
            data={txData}
            handleSelectRow={handleSelectRow}
            user={user}
            listName={`Transactions with ${currentContact.firstName} ${currentContact.lastName}`}
            sortable={true}
            transactions={transactions}
            contacts={contacts}
            placeholderImage={'list.svg'}
            placeholderText={'No Transactions Found'}
          />
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(AddressBookPage)