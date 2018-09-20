import { StyleRulesCallback, TableCell, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as classNames from 'classnames';
import * as moment from 'moment';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { getContact } from '../../helpers/utils';
import { IUser } from '../../interfaces/User';
import { Aux } from '../winAux';
import { ListType } from './ListContainer';

export interface IListRowProps {
  currentData: Transaction | Contact;
  listType: ListType;
  data: Transaction | Contact;
  handleClick: (id: string) => void;
  user: IUser;
  contact?: Contact;
  contacts?: Contact[];
  transactions?: Transaction[];
}

export interface IListRowState {
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

class ListRow extends React.Component<WithStyles<any> & IListRowProps, IListRowState> {
  public Cells = () => {
    const { classes, contacts, data, listType, user } = this.props;
    if (listType === 'Transaction') {
      const tx = data as Transaction;
      const incoming = tx.to === user.address;
      const amountDetails = this.getAmountDetails();
      const contactKey = incoming ? tx.from : tx.to;
      const contact = getContact(contacts, contactKey);
      return (
        <Aux>
          <TableCell className={classes.cell}>
            {moment(tx.timestamp).format('MMM DD, YY - HH:mm:ss')}
          </TableCell>
          <TableCell className={classes.cell}>
            {contact ? `${contact.firstName} ${contact.lastName}`
              : incoming ? tx.from : tx.to
            }
          </TableCell>
          <TableCell numeric={true} className={classes.cell} style={{ color: amountDetails.color }}>
            {amountDetails.sign}{tx.amount}
          </TableCell>
        </Aux>
      )
    }

    if (listType === 'Contact') {
      const contact = data as Contact;
      return (
        <Aux>
          <TableCell className={classes.cell}>
            {contact.firstName}
          </TableCell>
          <TableCell className={classes.cell}>
            {contact.lastName}
          </TableCell>
        </Aux>
      )
    }

    else {
      return <div />;
    }
  }
  public getAmountDetails = () => {
    const { data, user } = this.props;
    const transactionData = data as Transaction;
    const incoming = transactionData.to === user.address;
    const amountDetails = {
      color: incoming ? positiveAmountColor : negativeAmountColor,
      sign: incoming ? '+' : '-'
    };
    return amountDetails;
  }

  public handleLocalClick = () => {
    this.props.handleClick(this.props.data.id)
  }

  public render() {
    const { classes, currentData, data } = this.props;
    const isSelected = data.id === currentData.id;
    return (
      <TableRow
        hover={true}
        onClick={this.handleLocalClick}
        className={classNames(classes.row, isSelected ? classes.selected : '')}
        role={'checkbox'}
        tabIndex={-1}
        key={data.id}
        selected={isSelected}
      >
        <this.Cells />
      </TableRow>
    );
  }
}

export default withStyles(styles)(ListRow)