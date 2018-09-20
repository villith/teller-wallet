import {
  FormControl,
  IconButton,
  Input,
  StyleRulesCallback,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { FilterList as FilterListIcon } from '@material-ui/icons';
import * as React from 'react';

import { TransactionFilterables } from '../../classes/Transaction';
import { IFilter, ListType } from './ListContainer';

export interface IListToolbarProps {
  numSelected: number;
  listName: string;
  listType: ListType;
  filters: IFilter[];
  filter: boolean;
  filterBy: string;
  filterByValue: string;
}

export interface IListToolbarState {
  filtersVisible: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  actions: {
    display: 'flex',
    float: 'right'
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
  highlight:
  theme.palette.type === 'light'
    ? {
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        color: theme.palette.secondary.main,        
      }
    : {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.text.primary,
      },
  root: {
    paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  title: {
    flex: '0 0 auto',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

class ListToolbar extends React.Component<WithStyles<any> & IListToolbarProps, IListToolbarState> {
  public state = {
    filtersVisible: false
  }

  public buildFilterInputs = () => {
    const { classes } = this.props;
    return this.props.filters.filter(filter => filter.key in TransactionFilterables)
      .map((filter, index) => {
        return (
          <FormControl className={classes.formControl} key={index}>
            <InputLabel htmlFor={`filter-${filter.key}`}>{`${filter.key.charAt(0).toUpperCase()}${filter.key.substr(1)}`}</InputLabel>
            <Input />
          </FormControl>
        )
    })
  }

  public toggleFilters = () => {
    this.setState(prevState => ({ filtersVisible: !prevState.filtersVisible }));
  }
  
  public render() {
    const { filtersVisible } = this.state;
    const { classes, listName, numSelected } = this.props;
    return (
      <Toolbar>
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color='inherit' variant='subheading'>
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant='title' id='tableTitle'>
              {listName}
            </Typography>
          )}
        </div>
        <div className={classes.action}>
          <IconButton onClick={this.toggleFilters}>
            <FilterListIcon />
          </IconButton>
        </div>
        {filtersVisible &&
          <div className={classes.filters}>
            {this.buildFilterInputs()}
          </div>
        }
      </Toolbar>
    );
  }
}

export default withStyles(styles)(ListToolbar)