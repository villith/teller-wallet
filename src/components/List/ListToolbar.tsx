import { Grid, IconButton, StyleRulesCallback, Theme, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { FilterList as FilterListIcon } from '@material-ui/icons';
import * as React from 'react';
import { Contact, ContactFilterables } from 'src/classes/Contact';

import { Transaction, TransactionFilterables } from '../../classes/Transaction';
import FilterInput from '../Input/FilterInput';
import { Aux } from '../winAux';
import { IFilter, ListType } from './ListContainer';

export interface IListToolbarProps {
  applyFilters: (filter: IFilter, value: any) => void;
  data: Array<Transaction | Contact>;
  numSelected: number;
  listName: string;
  listType: ListType;
  filters: IFilter[];
  filterable: boolean;
}

export interface IListToolbarState {
  filtersVisible: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  actions: {
    position: 'absolute',
    right: 0
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
  titleRow: {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  filters: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
});

class ListToolbar extends React.Component<WithStyles<any> & IListToolbarProps, IListToolbarState> {
  public state = {
    filtersVisible: false
  }

  public buildFilterInputs = () => {
    const { applyFilters, data, filters, listType } = this.props;
    const filterables = listType === 'Transaction' ? TransactionFilterables : ContactFilterables;
    return filters.filter(filter => filter.key in filterables)
      .map((filter, index) => {
        const uniqueMap: { [index: string]: boolean } = {};
        const filterableData = data.map(item => {
          return { value: item[filter.key] }
        })
        .filter(item => {
          const { value } = item;
          if (uniqueMap.hasOwnProperty(item.value)) {
            return false;
          }
          else {
            uniqueMap[value] = true; 
            return true;
          }
        });
        return (
          <FilterInput
            key={index}
            data={filterableData}
            filter={filter}
            applyFilters={applyFilters}
          />
        )
    })
  }

  public toggleFilters = () => {
    this.setState(prevState => ({ filtersVisible: !prevState.filtersVisible }));
  }
  
  public render() {
    const { filtersVisible } = this.state;
    const { classes, filterable, listName, numSelected } = this.props;
    return (
      <Aux>
        <Toolbar>
          <div className={classes.titleRow}>
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
          </div>
          <div className={classes.actions}>
            { filterable &&
              <IconButton onClick={this.toggleFilters}>
                <FilterListIcon />
              </IconButton>
            }
          </div>
        </Toolbar>
        { filtersVisible &&
          <div className={classes.filters}>
            <Typography variant='subheading'>Filters</Typography>
            <Grid container={true} spacing={8}>
              {this.buildFilterInputs()}
            </Grid>
          </div>
        }
      </Aux>
    );
  }
}

export default withStyles(styles)(ListToolbar)