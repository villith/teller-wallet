import { StyleRulesCallback, Table, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import TransactionListBody from './TransactionListBody';
import { Order } from './TransactionListContainer';
import TransactionListHeader from './TransactionListHeader';

export interface ITransactionListProps {
  order: Order;
  orderBy: string;
  handleSelectAllClick: ((event: any, checked: boolean) => void);
  handleRequestSort: ((event: any, property: any) => void);
  handleClick: ((event: any, id: string) => void);
  selected: string[];
  transactions: Transaction[];
}

export interface ITransactionListState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionList extends React.Component<WithStyles<any> & ITransactionListProps, ITransactionListState> {
  public render() {
    const { classes, handleClick, handleRequestSort, handleSelectAllClick, order, orderBy, selected, transactions } = this.props;
    return (
      <div className={classes.tableWrapper}>
        <Table style={{ tableLayout: 'auto' }}>
          <TransactionListHeader
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={transactions.length}
          />
          <TransactionListBody
            handleClick={handleClick}
            transactions={transactions}
            order={order}
            orderBy={orderBy}
            selected={selected}
            sortable={true}
          />
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(TransactionList)