import { StyleRulesCallback, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import { Order } from './TransactionListContainer';
import TransactionListRow from './TransactionListRow';

export interface ITransactionListBodyProps {
  currentTransaction: Transaction;
  order?: Order;
  orderBy?: string;
  handleClick: (event: any, id: string) => void;
  transactions: Transaction[];
  userDetails: {
    publicKey: string;
  }
}

export interface ITransactionListBodyState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionListBody extends React.Component<WithStyles<any> & ITransactionListBodyProps, ITransactionListBodyState> {
  public render() {
    const { currentTransaction, handleClick, transactions, userDetails } = this.props;
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
            userDetails={userDetails}
          />
        })}
      </TableBody>
    );
  }
}

export default withStyles(styles)(TransactionListBody)