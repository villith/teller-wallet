import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import AddressBook from './AddressBook';

export interface IAddressBookContainerRowProps {
  contacts: Contact[];
  transactions: Transaction[];
}

export interface IAddressBookContainerRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class AddressBookContainerRow extends React.Component<WithStyles<any> & IAddressBookContainerRowProps, IAddressBookContainerRowState> { 
  public render() {
    const { classes, contacts, transactions } = this.props;
    
    return (
      <Paper className={classes.root}>
        <AddressBook
          contacts={contacts}
          transactions={transactions}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(AddressBookContainerRow)