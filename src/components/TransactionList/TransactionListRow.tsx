import { Checkbox, StyleRulesCallback, TableCell, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';

export interface ITransactionListRowProps {
  isSelected: boolean;
  transaction: Transaction;
  handleClick: ((event: any, id: string) => void);
}

export interface ITransactionListRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionListRow extends React.Component<WithStyles<any> & ITransactionListRowProps, ITransactionListRowState> {
  public render() {
    const { isSelected, transaction, handleClick } = this.props;
    return (
      <TableRow
        hover={true}
        // tslint:disable-next-line:jsx-no-lambda
        onClick={(event) => handleClick(event, transaction.id)}
        role={'checkbox'}
        tabIndex={-1}
        key={transaction.id}
        selected={isSelected}
      >
        <TableCell padding='checkbox'>
          <Checkbox checked={isSelected} />
        </TableCell>
        <TableCell padding='none'>
          {transaction.timestamp}
        </TableCell>
        <TableCell padding='none'>
          {transaction.to}
        </TableCell>
        <TableCell padding='none'>
          {transaction.amount}
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(TransactionListRow)