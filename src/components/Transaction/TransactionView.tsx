import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import TransactionDetails from './TransactionDetails';

export interface ITransactionViewProps {
  currentTransaction: Transaction;
  user: IUser;
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
    const { classes, currentTransaction, user } = this.props;
    return (
      <Paper className={classes.root}>
        <TransactionDetails
          currentTransaction={currentTransaction}
          user={user}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(TransactionView);
