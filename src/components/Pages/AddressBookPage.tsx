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
  handleEditContact: (contact: Contact) => void;
  handleSelectRow: (id: string, listType: ListType) => void;
  toggleContactFavorite?: (id: string) => void;
  user: IUser;
  contacts: Contact[];
  transactions: Transaction[];
}

export interface IAddressBookPageRowState {
  placeholder?: string;
}

const columnData = [
  { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
];

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class AddressBookPage extends React.Component<WithStyles<any> & IAddressBookPageRowProps, IAddressBookPageRowState> { 
  public render() {
    const { currentContact, contacts, handleEditContact, handleSelectRow, user, transactions, toggleContactFavorite } = this.props;
    
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
          />
        </Grid>
      </Aux>
    );
  }
}

export default withStyles(styles)(AddressBookPage)