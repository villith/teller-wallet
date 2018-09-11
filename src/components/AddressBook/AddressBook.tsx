import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';

export interface IAddressBookRowProps {
  contacts: Contact[];
  transactions: Transaction[];
}

export interface IAddressBookRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class AddressBookRow extends React.Component<WithStyles<any> & IAddressBookRowProps, IAddressBookRowState> { 
  public render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.root} />
    );
  }
}

export default withStyles(styles)(AddressBookRow)