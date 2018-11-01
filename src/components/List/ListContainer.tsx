import { Paper, StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact, ContactFilterables } from '../../classes/Contact';
import { Transaction, TransactionFilterables } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import Placeholder from '../Placeholder/Placeholder';
import { Aux } from '../winAux';
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
  filterable: boolean;
  handleSelectRow: (id: string, listType: ListType) => void;
  numRows?: number;
  transactions?: Transaction[];
  contacts?: Contact[];
  placeholderImage: string;
  placeholderText: string;
}

export interface IListContainerState {
  numSelected: number;
  order: Order;
  orderBy: string;
  filters: IFilterMap;
}

export interface IListColumn {
  id: string;
  numeric: boolean;
  disablePadding: boolean;
  label: string;
}

type IFilterMap = { [key in (TransactionFilterables | ContactFilterables)]: any; }

export interface IFilter {
  key: string;
  type: DataType;
}

export type Order = 'asc' | 'desc';
export type ListType = 'Transaction' | 'Contact';
export type DataType = 'number' | 'string' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';

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
    filters: {} as IFilterMap
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

  public applyFilters = (filter: IFilter, value: any) => {
    const { filters } = this.state;
    filters[filter.key] = value;
    this.setState({ filters });
  }

  public filterListData = (listData: Array<Transaction | Contact>) => {
    const { filters } = this.state;
    const { listType } = this.props;
    const filterables = listType === 'Transaction' ? TransactionFilterables : ContactFilterables;
    const filteredListData = listData.filter(item => {
      return Object.keys(filters)
        .filter(filter => filter in filterables)
        .map(key => {
          const value = filters[key];
          return item[key].includes(value);
        });
      });
    return filteredListData;      
  }

  public render() {
    const { numSelected, order, orderBy } = this.state;
    const { classes, columns, contacts, currentData, data, filterable, listName, listType, placeholderImage, placeholderText, sortable, numRows, transactions, user } = this.props;
    const listData = data.sort(this.getSorting(order!, orderBy!));
    const filteredData = this.filterListData(listData);
    return (
      <Paper className={classes.root}>
        {data.length > 0 ? (
          <Aux>
            <ListToolbar
              listName={listName}
              listType={listType}
              numSelected={numSelected}
              data={data}
              applyFilters={this.applyFilters}
              filters={this.buildFilters()}
              filterable={filterable}
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
              data={filteredData}
              user={user}
              sortable={sortable}
              transactions={transactions}
              contacts={contacts}
            />
          </Aux>
        ) : (
          <Placeholder
            imgSrc={placeholderImage}
            title={placeholderText}
          />
        )}
      </Paper>
    );
  }
}

export default withStyles(styles)(ListContainer)