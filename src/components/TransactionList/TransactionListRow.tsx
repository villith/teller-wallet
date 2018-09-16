import { StyleRulesCallback, TableCell, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { IUser } from '../../interfaces/User';

export interface ITransactionListRowProps {
  isSelected: boolean;
  transaction: Transaction;
  handleClick: ((event: any, id: string) => void);
  user: IUser;
  contact?: Contact;
}

export interface ITransactionListRowState {
  placeholder?: string;
}

const positiveAmountColor = 'rgba(112, 168, 0, 1)';
const negativeAmountColor = 'rgba(234, 0, 112, 1)';

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  selected: {
    backgroundColor: 'rgba(194, 219, 255, 0.8) !important',
  },
  row: {
    '&:hover': {
      backgroundColor: 'rgba(194, 219, 255, 1) !important'
    },
  },
  root: {},
  cell: {
    overflowX: 'hidden',
  },
});

class TransactionListRow extends React.Component<WithStyles<any> & ITransactionListRowProps, ITransactionListRowState> {
  public getAmountDetails = () => {
    const { transaction, user } = this.props;
    const incoming = transaction.to === user.address;
    const amountDetails = {
      color: incoming ? positiveAmountColor : negativeAmountColor,
      sign: incoming ? '+' : '-'
    };
    return amountDetails;
  }

  public render() {
    const { classes, contact, isSelected, transaction, handleClick, user } = this.props;
    const amountDetails = this.getAmountDetails();
    const incoming = transaction.to === user.address;
    return (
      <TableRow
        hover={true}
        // tslint:disable-next-line:jsx-no-lambda
        onClick={(event) => handleClick(event, transaction.id)}
        className={classNames(classes.row, isSelected ? classes.selected : '')}
        role={'checkbox'}
        tabIndex={-1}
        key={transaction.id}
        selected={isSelected}
      >
        <TableCell className={classes.cell}>
          {moment(transaction.timestamp).format('MMM DD, YY - HH:mm:ss')}
        </TableCell>
        <TableCell className={classes.cell}>
          {contact ? `${contact.firstName} ${contact.lastName}`
            : incoming ? transaction.from : transaction.to
          }
        </TableCell>
        <TableCell numeric={true} className={classes.cell} style={{ color: amountDetails.color }}>
          {amountDetails.sign}{transaction.amount}
        </TableCell>
      </TableRow>
    );
  }
}

export default withStyles(styles)(TransactionListRow)