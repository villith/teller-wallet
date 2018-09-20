import { StyleRulesCallback, TableBody, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';
import { ListType, Order } from './ListContainer';
import ListRow from './ListRow';

export interface IListBodyProps {
  currentData: Transaction | Contact;
  data: Array<Transaction | Contact>;
  listType: ListType;
  order?: Order;
  orderBy?: string;
  handleClick: (id: string) => void;
  transactions?: Transaction[];
  user: IUser;
  numRows?: number;
  contacts?: Contact[];
}

export interface IListBodyState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class ListBody extends React.Component<WithStyles<any> & IListBodyProps, IListBodyState> {
  public render() {
    const { contacts, currentData, transactions, data, handleClick, listType, numRows, user } = this.props;
    return (
      <TableBody>
        {(numRows ? data.slice(0, numRows) : data)
          .map((d, index) => {
            return <ListRow
              key={index}
              currentData={currentData}
              data={d}
              listType={listType}
              handleClick={handleClick}
              user={user}
              contacts={contacts}
              transactions={transactions}
            />
          })
        }
      </TableBody>
    );
  }
}

export default withStyles(styles)(ListBody)