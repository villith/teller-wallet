import { StyleRulesCallback, Table, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
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
  user: IUser;
  numRows?: number;
  sortable: boolean;
  contacts: Contact[];
}

export interface ITransactionListState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionList extends React.Component<WithStyles<any> & ITransactionListProps, ITransactionListState> {
  public render() {
    const { classes, contacts, currentTransaction, numRows, sortable, handleClick, handleRequestSort, order, orderBy, transactions, user } = this.props;
    return (
      <div className={classes.tableWrapper}>
        <Table padding='dense' style={{ tableLayout: 'fixed' }}>
          <TransactionListHeader
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={transactions.length}
            sortable={sortable}
          />
          <TransactionListBody
            handleClick={handleClick}
            transactions={transactions}
            order={order}
            orderBy={orderBy}
            currentTransaction={currentTransaction}
            user={user}
            numRows={numRows}
            contacts={contacts}
          />
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(TransactionList)