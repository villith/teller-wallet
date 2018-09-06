import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Transaction } from '../../classes/Transaction';
import TransactionList from './TransactionList';
import TransactionListToolbar from './TransactionListToolbar';

export interface ITransactionListContainerProps {
  transactions: Transaction[];
}

export interface ITransactionListContainerState {
  numSelected: number;
  selected: string[];
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
    order: 'asc' as Order,
    orderBy: 'id',
    selected: [] as string[]
  }

  public handleRequestSort = (event: any, property: any) => {
    const orderBy = property;
    let order: Order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }

  public handleSelectAllClick = (event: any, checked: boolean) => {
    if (checked) {
      this.setState(({ selected: this.props.transactions.map(t => t.id) }));
      return;
    }
    this.setState({ selected: [] });
  }

  public handleClick = (event: any, id: string) => {
    const selected = [ ...this.state.selected ];
    const selectedIndex = selected.indexOf(id);

    if (selectedIndex === -1) {
      selected.push(id);
    }
    else {
      selected.splice(selectedIndex, 1);
    }

    this.setState({ selected });
  }

  public render() {
    const { numSelected, order, orderBy, selected } = this.state;
    const { classes, transactions } = this.props;
    return (
      <Paper className={classes.root}>
        <TransactionListToolbar
          numSelected={numSelected}
        />
        <TransactionList
          order={order}
          orderBy={orderBy}
          handleSelectAllClick={this.handleSelectAllClick}
          handleRequestSort={this.handleRequestSort}
          handleClick={this.handleClick}
          selected={selected}
          transactions={transactions}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(TransactionListContainer)