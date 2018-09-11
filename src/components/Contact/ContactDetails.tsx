import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Grid,
  StyleRulesCallback,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@material-ui/icons';
import * as jdenticon from 'jdenticon';
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
  cardBody: {
    padding: theme.spacing.unit
  },
  cardHeader: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  cardIcon: {
    padding: theme.spacing.unit
  },
  spacer: {
    flex: '1 1 100%',
  },
  cardTitle: {
    flex: '0 0 auto',
    '&:hover': {
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
    // @ts-ignore
    const svg = jdenticon.toSvg(contact.id, 48);
    return (
      <Card>
        <CardContent>
          <div className={classes.cardHeader}>
            <div className={classes.cardIcon}>
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </div>
            <div className={classes.cardTitle}>
              <Typography variant={'display1'}>
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
          <Grid container={true} className={classes.cardBody}>
            <Typography component='p'>
              {contact.description}
            </Typography>
          </Grid>
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