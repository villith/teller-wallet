import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  StyleRulesCallback,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@material-ui/icons';
import * as React from 'react';

import { Contact } from '../../classes/Contact';
import { Transaction } from '../../classes/Transaction';
import { getFullName } from '../../helpers/utils';

export interface IContactDetailsProps {
  contact: Contact;
  currentTransaction: Transaction;
  toggleContactFavorite: (id: string) => void;
}

export interface IContactDetailsState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  actions: {
    float: 'right'
  },
  cardHeader: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  spacer: {
    flex: '1 1 100%',
  },
  cardTitle: {
    flex: '0 0 auto',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
});

class ContactDetails extends React.Component<WithStyles<any> & IContactDetailsProps, IContactDetailsState> {
  public handleToggleContactFavorite = () => {
    this.props.toggleContactFavorite(this.props.contact.id);
  }

  public render() {
    const { classes, contact } = this.props;
    return (
      <Card>
        <CardContent>
          <div className={classes.cardHeader}>
            <div className={classes.cardTitle}>
              <Typography variant={'headline'}>
                {getFullName(contact)}
              </Typography>
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
              <Checkbox
                icon={<FavoriteBorderIcon />}
                checkedIcon={<FavoriteIcon />}
                checked={contact.favorite}
                onClick={this.handleToggleContactFavorite}
                color='secondary'
              />
            </div>
          </div>
          <Typography component='p'>
            {contact.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.actions}>
          <Button size='small' color='primary'>
            Edit
          </Button>
          <Button size='small' color='secondary'>
            Delete
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ContactDetails)