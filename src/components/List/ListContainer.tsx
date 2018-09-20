import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import List from './List';
import ListToolbar from './ListToolbar';

export interface IListContainerProps {
  columns: IListColumn[];
  currentData: Transaction | Contact;
  data: Array<Transaction | Contact>;
  listType: ListType;
  listName: string;
  user: IUser;
  sortable: boolean;
  handleSelectRow: (id: string, listType: ListType) => void;
  numRows?: number;
  transactions?: Transaction[];
  contacts?: Contact[];
}

export interface IListContainerState {
  numSelected: number;
  order: Order;
  orderBy: string;
  filter: boolean;
  filterBy: string;
  filterByValue: string;
}

export interface IListColumn {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

export interface IFilter {
  key: string;
  type: string;
}

export type Order = 'asc' | 'desc';
export type ListType = 'Transaction' | 'Contact';

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

class ListContainer extends React.Component<WithStyles<any> & IListContainerProps, IListContainerState> {
  public state = {
    numSelected: 0,
    order: 'desc' as Order,
    orderBy: 'timestamp',
    filter: false,
    filterBy: '',
    filterByValue: ''
  }

  public componentWillMount() {
    const { order, orderBy } = this.state;
    const { currentData, data, listType, handleSelectRow } = this.props;

    if (!currentData.id) {
      const listData = data.sort(this.getSorting(order!, orderBy!));
      handleSelectRow(listData[0].id, listType);
    }
  }

  public handleRequestSort = (property: any) => {
    const orderBy = property;
    let order: Order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  }

  public handleClick = (id: string) => {
    this.props.handleSelectRow(id, this.props.listType);
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

  public handleChangeFilter = (filterBy: string) => {
    this.setState({ filterBy });
  }

  public handleChangeFilterValue = (filterByValue: string) => {
    this.setState({ filterByValue });
  }

  public buildFilters = () => {
    const filters: IFilter[] = [];
    if (this.props.data.length > 0) {
      const exampleData = this.props.data[0];
      Object.keys(exampleData).map(key => {
        const filter: IFilter = {
          key,
          type: typeof exampleData[key]
        }
        filters.push(filter);
      });
    }
    return filters;
  }

  public render() {
    const { numSelected, order, orderBy, filter, filterBy, filterByValue } = this.state;
    const { classes, columns, contacts, currentData, data, listName, listType, sortable, numRows, transactions, user } = this.props;
    const listData = data.sort(this.getSorting(order!, orderBy!));
    return (
      <Paper className={classes.root}>
        <ListToolbar
          listName={listName}
          listType={listType}
          numSelected={numSelected}
          filters={this.buildFilters()}
          filter={filter}
          filterBy={filterBy}
          filterByValue={filterByValue}
        />
        <List
          listType={listType}
          columns={columns}
          order={order}
          orderBy={orderBy}
          handleRequestSort={this.handleRequestSort}
          handleClick={this.handleClick}
          currentData={currentData}
          numRows={numRows}
          data={listData}
          user={user}
          sortable={sortable}
          transactions={transactions}
          contacts={contacts}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(ListContainer)