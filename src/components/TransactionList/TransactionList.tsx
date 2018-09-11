import { StyleRulesCallback, Table, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import TransactionListBody from './TransactionListBody';
import { Order } from './TransactionListContainer';
import TransactionListHeader from './TransactionListHeader';

export interface ITransactionListProps {
  order: Order;
  orderBy: string;
  handleRequestSort: ((event: any, property: any) => void);
  handleClick: ((event: any, id: string) => void);
  currentTransaction: Transaction;
  transactions: Transaction[];
  userDetails: {
    publicKey: string;
  }
}

export interface ITransactionListState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionList extends React.Component<WithStyles<any> & ITransactionListProps, ITransactionListState> {
  public render() {
    const { classes, currentTransaction, handleClick, handleRequestSort, order, orderBy, transactions, userDetails } = this.props;
    return (
      <div className={classes.tableWrapper}>
        <Table padding='dense' style={{ tableLayout: 'fixed' }}>
          <TransactionListHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={transactions.length}
          />
          <TransactionListBody
            handleClick={handleClick}
            transactions={transactions}
            order={order}
            orderBy={orderBy}
            currentTransaction={currentTransaction}
            userDetails={userDetails}
          />
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(TransactionList)