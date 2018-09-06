import { StyleRulesCallback, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import { Order } from './TransactionListContainer';
import TransactionListRow from './TransactionListRow';

export interface ITransactionListBodyProps {
  order?: Order;
  orderBy?: string;
  handleClick: ((event: any, id: string) => void);
  selected: string[];
  transactions: Transaction[];
  sortable: boolean;
}

export interface ITransactionListBodyState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionListBody extends React.Component<WithStyles<any> & ITransactionListBodyProps, ITransactionListBodyState> {
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
    const { handleClick, transactions, selected, order, orderBy, sortable } = this.props;
    const transactionList = sortable ? transactions.sort(this.getSorting(order!, orderBy!)) : transactions;
    return (
      <TableBody>
        {transactionList.map(transaction => {
          const { id } = transaction;
          const isSelected = selected.indexOf(id) !== -1;
          return <TransactionListRow
            isSelected={isSelected}
            key={id}
            transaction={transaction}
            handleClick={handleClick}
          />
        })}
      </TableBody>
    );
  }
}

export default withStyles(styles)(TransactionListBody)