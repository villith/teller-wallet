import { Grid, StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';

export interface ITransactionDetailsProps {
  currentTransaction: Transaction;
  userDetails: {
    publicKey: string;
  }
}

export interface ITransactionDetailsState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionDetails extends React.Component<WithStyles<any> & ITransactionDetailsProps, ITransactionDetailsState> {
  public render() {
    const { classes, currentTransaction } = this.props;
    return (
      <Grid container={true} className={classes.root}>
        <Grid item={true} xs={6}>
          <Typography variant='headline'>Recipient</Typography>
          {currentTransaction.to.substr(0, 20)}
        </Grid>
        <Grid item={true} xs={6}>
          <Typography variant='headline'>Amount</Typography>
          {currentTransaction.amount}
        </Grid>
        <Grid item={true} xs={6}>
          <Typography variant='headline'>Balance After</Typography>
          <div className={classes.balance}>100 (-{currentTransaction.amount})</div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(TransactionDetails)