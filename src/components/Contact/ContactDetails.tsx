import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  StyleRulesCallback,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import Tooltip from '@material-ui/core/Tooltip';
import {
  Clear as ClearIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@material-ui/icons';
import * as jdenticon from 'jdenticon';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Contact } from '../../classes/Contact';
import { getFullName } from '../../helpers/utils';
import { Aux } from '../winAux';

export interface IContactDetailsProps {
  contact: Contact;
  deleteContact?: (id: string) => void;
  handleEditContact?: (contact: Contact) => void;
  toggleContactFavorite?: (id: string) => void;
}

export interface IContactDetailsState {
  editModeActive: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  actions: {
    display: 'flex',
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
  cancelButton: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
  },
  confirmButton: {
    backgroundColor: 'white',
    color: '#4caf50',
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    '&:hover': {
      backgroundColor: lighten('#4caf50', 0.85)
    }
  },
  textField: {
  },
  placeholder: {
    opacity: 0.25,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    textAlign: 'center',
    padding: theme.spacing.unit
  },
  placeholderImage: {
    height: '50%',
    width: '50%',
    margin: 'auto',
    padding: theme.spacing.unit * 2
  }
});

class ContactDetails extends React.Component<WithStyles<any> & IContactDetailsProps, IContactDetailsState> {
  public state = {
    editModeActive: false
  }

  public toggleEditMode = () => {
    this.setState(prevState => ({ editModeActive: !prevState.editModeActive }));
  }

  public handleToggleContactFavorite = () => {
    this.props.toggleContactFavorite!(this.props.contact.id);
  }

  public confirmDeleteContact = () => {
    console.log('asdasd');
  }

  public confirmEditContact = () => {
    console.log('abvc');
  }

  public render() {
    const { editModeActive } = this.state;
    const { classes, contact, deleteContact, handleEditContact, toggleContactFavorite } = this.props;
    console.log('HANDLE EDIT CONTACT');
    console.log(handleEditContact);
    // @ts-ignore
    const svg = jdenticon.toSvg(contact.id, 48);
    return (
      <Card>
        <CardContent>
          { contact.id ? (
            <Aux>
              <div className={classes.cardHeader}>
                <div className={classes.cardIcon}>
                  <div dangerouslySetInnerHTML={{ __html: svg }} />
                </div>
                {editModeActive ? (
                  <div className={classes.cardTitleEdit}>
                    <TextField
                      id='title'
                      value={contact.title}
                      label='Title'
                      className={classes.textField}
                    />
                    <TextField
                      id='firstName'
                      value={contact.firstName}
                      label='First Name'
                      className={classes.textField}
                    />
                    <TextField
                      id='lastName'
                      value={contact.lastName}
                      label='Last Name'
                      className={classes.textField}
                    />
                  </div>
                ) : (
                  <Link to='/addressBook' className={classes.cardTitle}>
                    <Typography variant={'display1'}>
                      {getFullName(contact)}
                    </Typography>
                  </Link>
                )}
                <div className={classes.spacer} />
                <div className={classes.actions}>
                  {handleEditContact ? (
                    editModeActive ? (
                      <Aux>
                        <Tooltip title='Confirm Changes'>
                          <Button variant='flat' className={classes.confirmButton} onClick={this.confirmEditContact}>
                            <DoneIcon />
                          </Button>
                        </Tooltip>
                        <Tooltip title='Cancel'>
                          <Button variant='flat' color='secondary' className={classes.cancelButton} onClick={this.toggleEditMode}>
                            <ClearIcon />
                          </Button>
                        </Tooltip> 
                      </Aux>
                    ) : (
                      <Tooltip title='Edit Contact'>
                        <Button variant='flat' color='primary' onClick={this.toggleEditMode}>
                          <EditIcon />
                        </Button>
                      </Tooltip>
                    )
                  ) : ( null )}
                  {toggleContactFavorite &&
                    <Tooltip title='Favorite'>
                      <Checkbox
                        icon={<FavoriteBorderIcon />}
                        checkedIcon={<FavoriteIcon />}
                        checked={contact.favorite}
                        onClick={this.handleToggleContactFavorite}
                        color='secondary'
                      />
                    </Tooltip>
                  }
                  {deleteContact &&
                    <Tooltip title='Delete'>
                      <Button variant='flat' color='secondary' className={classes.cancelButton} onClick={this.confirmDeleteContact}>
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  }
                </div>
              </div>
              <Grid container={true} className={classes.cardBody}>
                <Typography component='p'>
                  {contact.description}
                </Typography>
              </Grid>
            </Aux>
          ) : (
            <div className={classes.placeholder}>
              <img src='plane.svg' className={classes.placeholderImage} />
              <Typography variant='headline'>No Contact Selected</Typography>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(ContactDetails)