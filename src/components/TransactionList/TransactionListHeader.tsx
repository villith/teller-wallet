import {
  StyleRulesCallback,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Theme,
  Tooltip,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

import { Order } from './TransactionListContainer';

export interface ITransactionListHeaderProps {
  order: Order;
  orderBy: string;
  onRequestSort: ((event: any, property: any) => void);
  rowCount: number;
}

export interface ITransactionListHeaderState {
  placeholder?: string;
}

const columnData = [
  { id: 'timestamp', numeric: false, disablePadding: false, label: 'Timestamp' },
  { id: 'to', numeric: false, disablePadding: false, label: 'Recipient' },
  { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
];

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class TransactionListHeader extends React.Component<WithStyles<any> & ITransactionListHeaderProps, ITransactionListHeaderState> {
  public createSortHandler = (property: any) => (event: any) => {
    this.props.onRequestSort(event, property);
  }

  public render() {
    const { order, orderBy } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columnData.map(column => {
            const { id, numeric, disablePadding, label } = column;
            return (
              <TableCell
                key={id}
                numeric={numeric}
                padding={disablePadding ? 'none' : 'default'}
                scope='col'
                sortDirection={orderBy === id ? order : false}
              >
                <Tooltip
                  title='Sort'
                  placement={numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === id}
                    direction={order}
                    onClick={this.createSortHandler(id)}
                  >
                    {label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(styles)(TransactionListHeader)