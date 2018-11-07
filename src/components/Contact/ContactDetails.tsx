import {
  Button,
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
import Placeholder from '../Placeholder/Placeholder';
import { Aux } from '../winAux';

export interface IContactDetailsProps {
  contact: Contact;
  deleteContact?: (id: string) => void;
  handleEditContact?: (contact: Contact) => void;
  handleDeleteContact?: (contact: Contact) => void;
  toggleContactFavorite?: (id: string) => void;
}

export interface IContactDetailsState {
  contact: Contact;
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
});

class ContactDetails extends React.Component<WithStyles<any> & IContactDetailsProps, IContactDetailsState> {
  public state = {
    editModeActive: false,
    contact: {} as Contact,
  }

  public componentDidMount() {
    const { contact } = this.props;
    this.setState({ contact });
  }

  public toggleEditMode = () => {
    this.setState(prevState => ({ editModeActive: !prevState.editModeActive }));
  }

  public handleToggleContactFavorite = () => {
    this.props.toggleContactFavorite!(this.props.contact.id);
  }

  public confirmDeleteContact = () => {
    const { contact } = this.state;
    const { handleDeleteContact } = this.props;

    if (handleDeleteContact) {
      handleDeleteContact(contact);
    }
  }

  public confirmEditContact = () => {
    const { contact } = this.state;
    const { handleEditContact } = this.props;

    if (handleEditContact) {
      handleEditContact(contact);
    }
  }

  public handleChange = (event: any) => {
    const { contact } = this.state;
    const { id, value } = event.target;
    contact[id] = value;
    this.setState({ contact });
  }

  public render() {
    const { editModeActive, contact: formContact } = this.state;
    const { classes, contact, deleteContact, handleEditContact, toggleContactFavorite } = this.props;
    // @ts-ignore
    const svg = jdenticon.toSvg(contact.id, 48);
    return (
      contact.id ? (
        <Aux>
          <div className={classes.cardHeader}>
            <div className={classes.cardIcon}>
              <div dangerouslySetInnerHTML={{ __html: svg }} />
            </div>
            {editModeActive ? (
              <div className={classes.cardTitleEdit}>
                <TextField
                  id='title'
                  value={formContact.title}
                  label='Title'
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id='firstName'
                  value={formContact.firstName}
                  label='First Name'
                  className={classes.textField}
                  onChange={this.handleChange}
                />
                <TextField
                  id='lastName'
                  value={formContact.lastName}
                  label='Last Name'
                  className={classes.textField}
                  onChange={this.handleChange}
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
        <Placeholder
          imgSrc='plane.svg'
          title='No Contact Selected'
        />
      )
    );
  }
}

export default withStyles(styles)(ContactDetails)