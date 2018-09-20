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

import { IListColumn, ListType, Order } from './ListContainer';

export interface IListHeaderProps {
  columns: IListColumn[];
  listType: ListType;
  order: Order;
  orderBy: string;
  onRequestSort: (property: any) => void;
  rowCount: number;
  sortable: boolean;
}

export interface IListHeaderState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class ListHeader extends React.Component<WithStyles<any> & IListHeaderProps, IListHeaderState> {
  public createSortHandler = (property: any) => (event: any) => {
    if (this.props.sortable) {
      this.props.onRequestSort(property);
    }
  }

  public render() {
    const { columns, order, orderBy, sortable } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(column => {
            const { id, numeric, disablePadding, label } = column;
            return (
              <TableCell
                key={id}
                numeric={numeric}
                padding={disablePadding ? 'none' : 'default'}
                scope='col'
                sortDirection={orderBy === id ? order : false}
              >
                {sortable ? (
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
                ) : ( <div>{label}</div> )}
              </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default withStyles(styles)(ListHeader)