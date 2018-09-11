import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import TransactionDetails from './TransactionDetails';

export interface ITransactionViewProps {
  currentTransaction: Transaction;
  userDetails: {
    publicKey: string;
  }
}

export interface ITransactionViewState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    width: '100%',
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
});

class TransactionView extends React.Component<WithStyles<any> & ITransactionViewProps, ITransactionViewState> {
  public render() {
    const { classes, currentTransaction, userDetails } = this.props;
    return (
      <Paper className={classes.root}>
        <TransactionDetails
          currentTransaction={currentTransaction}
          userDetails={userDetails}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(TransactionView);
