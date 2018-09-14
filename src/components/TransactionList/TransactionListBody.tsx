import { StyleRulesCallback, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import { Order } from './TransactionListContainer';
import TransactionListRow from './TransactionListRow';

export interface ITransactionListBodyProps {
  currentTransaction: Transaction;
  order?: Order;
  orderBy?: string;
  handleClick: (event: any, id: string) => void;
  transactions: Transaction[];
  user: IUser;
}

export interface ITransactionListBodyState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionListBody extends React.Component<WithStyles<any> & ITransactionListBodyProps, ITransactionListBodyState> {
  public render() {
    const { currentTransaction, handleClick, transactions, user } = this.props;
    return (
      <TableBody>
        {transactions.map((transaction) => {
          const { id } = transaction;
          const isSelected = currentTransaction.id === id;
          return <TransactionListRow
            isSelected={isSelected}
            key={id}
            transaction={transaction}
            handleClick={handleClick}
            user={user}
          />
        })}
      </TableBody>
    );
  }
}

export default withStyles(styles)(TransactionListBody)