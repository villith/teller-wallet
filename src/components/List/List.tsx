import { StyleRulesCallback, Table, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import ListBody from './ListBody';
import { IListColumn, ListType, Order } from './ListContainer';
import ListHeader from './ListHeader';

export interface IListProps {
  columns: IListColumn[];
  currentData: Transaction | Contact;
  data: Array<Transaction | Contact>;
  listType: ListType;
  order: Order;
  orderBy: string;
  handleRequestSort: (property: any) => void;
  handleClick: (id: string) => void;
  user: IUser;
  numRows?: number;
  sortable: boolean;
  contacts?: Contact[];
  transactions?: Transaction[];
}

export interface IListState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class List extends React.Component<WithStyles<any> & IListProps, IListState> {
  public render() {
    const { classes, contacts, columns, currentData, data, numRows, sortable, handleClick, handleRequestSort, order, orderBy, transactions, user, listType } = this.props;
    return (
      <div className={classes.tableWrapper}>
        <Table padding='dense' style={{ tableLayout: 'fixed' }}>
          <ListHeader
            columns={columns}
            listType={listType}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            sortable={sortable}
          />
          <ListBody
            listType={listType}
            handleClick={handleClick}
            data={data}
            currentData={currentData}
            order={order}
            orderBy={orderBy}
            user={user}
            numRows={numRows}
            contacts={contacts}
            transactions={transactions}
          />
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(List)