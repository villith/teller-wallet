import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import TransactionList from './TransactionList';
import TransactionListToolbar from './TransactionListToolbar';

export interface ITransactionListContainerProps {
  handleSelectTransaction: (id: string) => void;
  currentTransaction: Transaction;
  transactions: Transaction[];
  user: IUser;
}

export interface ITransactionListContainerState {
  numSelected: number;
  order: Order;
  orderBy: string;
}

export type Order = 'asc' | 'desc';

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    width: '100%',
    transition: theme.transitions.create('flex', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    }),
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class TransactionListContainer extends React.Component<WithStyles<any> & ITransactionListContainerProps, ITransactionListContainerState> {
  public state = {
    numSelected: 0,
    order: 'desc' as Order,
    orderBy: 'timestamp'
  }

  public componentWillMount() {
    const { order, orderBy } = this.state;
    const { currentTransaction, transactions, handleSelectTransaction } = this.props;

    if (!currentTransaction.id) {
      const transactionList = transactions.sort(this.getSorting(order!, orderBy!));
      handleSelectTransaction(transactionList[0].id);
    }
  }

  public handleRequestSort = (event: any, property: any) => {
    const orderBy = property;
    let order: Order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }

  public handleClick = (event: any, id: string) => {
    this.props.handleSelectTransaction(id);
  }

  public getSorting = (order: Order, orderBy: string) => {
    return order === 'desc'
      ? (a: Transaction, b: Transaction) => (
        b[orderBy] === a[orderBy]
        ? a.id < b.id ? -1 : 1
        : b[orderBy] < a[orderBy] ? -1 : 1
      ) : (a: Transaction, b: Transaction) => (
        a[orderBy] === b[orderBy]
        ? a.id < b.id ? -1 : 1
        : a[orderBy] < b[orderBy] ? -1 : 1
      );
  }

  public render() {
    const { numSelected, order, orderBy } = this.state;
    const { classes, currentTransaction, transactions, user } = this.props;
    const transactionList = transactions.sort(this.getSorting(order!, orderBy!));
    return (
      <Paper className={classes.root}>
        <TransactionListToolbar
          numSelected={numSelected}
        />
        <TransactionList
          order={order}
          orderBy={orderBy}
          handleRequestSort={this.handleRequestSort}
          handleClick={this.handleClick}
          currentTransaction={currentTransaction}
          transactions={transactionList}
          user={user}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(TransactionListContainer)