import { Grid, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import TransactionListContainer from '../TransactionList/TransactionListContainer';

export interface IMainContentProps {
  transactions: Transaction[];
}

export interface IMainContentState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  tableWrapper: {
    overflowX: 'auto',
  },
});

class MainContent extends React.Component<WithStyles<any> & IMainContentProps, IMainContentState> {
  public render() {
    const { transactions } = this.props;
    return (
      <Grid item={true} xs={6} md={4}>
        <TransactionListContainer
          transactions={transactions}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(MainContent);