import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';

export interface IAddressBookPageRowProps {
  contacts: Contact[];
  transactions: Transaction[];
}

export interface IAddressBookPageRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class AddressBookPageRow extends React.Component<WithStyles<any> & IAddressBookPageRowProps, IAddressBookPageRowState> { 
  public render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.root} />
    );
  }
}

export default withStyles(styles)(AddressBookPageRow)