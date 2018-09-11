import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';

export interface ITransactionPageRowProps {
  contacts: Contact[];
  transactions: Transaction[];
}

export interface ITransactionPageRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
});

class TransactionPageRow extends React.Component<WithStyles<any> & ITransactionPageRowProps, ITransactionPageRowState> { 
  public render() {
    const { classes } = this.props;
    
    return (
      <Paper className={classes.root} />
    );
  }
}

export default withStyles(styles)(TransactionPageRow)