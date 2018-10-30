import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {
  AttachMoney as AttachMoneyIcon,
  ChevronLeft as ChevronLeftIcon,
  Contacts as ContactsIcon,
  Help as HelpIcon,
  Home as HomeIcon,
  Info as InfoIcon,
  Send as SendIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import * as classNames from 'classnames';
import { Location } from 'history';
import * as React from 'react';
import { Link } from 'react-router-dom';

export interface ISideMenuProps {
  closeMenu: () => void;
  location: Location<any>;
  open: boolean;
  openMenu: () => void;
}

export interface ISideMenuState {
  placeholder?: string;
}

export interface IListItem {
  linkTo: Pages;
  icon: JSX.Element;
  text: string;
  align?: 'bottom' | 'default';
}

export type Pages = '' | 'send' | 'transactions' | 'settings' | 'addressBook' | 'help' | 'info';

const drawerWidth = 240;

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  avatar: {
    borderRadius: 0
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden'
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  selected: {
    backgroundColor: lighten(theme.palette.primary.light, 0.75),
    borderRightWidth: theme.spacing.unit / 2,
    borderRightColor: theme.palette.primary.main,
    borderRightStyle: 'solid',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  alignBottom: {
    marginTop: 'auto'
  },
  drawerList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }
});

const listItems: IListItem[] = [
  {
    linkTo: '',
    icon: <HomeIcon />,
    text: 'Overview'
  },
  {
    linkTo: 'send',
    icon: <SendIcon />,
    text: 'Send'
  },
  {
    linkTo: 'transactions',
    icon: <AttachMoneyIcon />,
    text: 'Transactions'
  },
  {
    linkTo: 'addressBook',
    icon: <ContactsIcon />,
    text: 'Contacts'
  },
  {
    linkTo: 'settings',
    icon: <SettingsIcon />,
    text: 'Settings',
    align: 'bottom'
  },
  {
    linkTo: 'help',
    icon: <HelpIcon />,
    text: 'Help',
  },
  {
    linkTo: 'info',
    icon: <InfoIcon />,
    text: 'Info',
  }
];

class SideMenu extends React.Component<WithStyles<any> & ISideMenuProps, ISideMenuState> {
  public buildListItems = (items: IListItem[]) => {
    return items.map((item, index) => {
      const { classes, location } = this.props;
      const { align, linkTo, icon, text } = item;
      const alignmentClass = align && align === 'bottom' ? classes.alignBottom : undefined;
      return (
        <Link className={alignmentClass} key={index} to={`/${linkTo}`}>
          <ListItem
            button={true}
            className={classNames(classes.listItem, location.pathname === `/${linkTo}` && classes.selected)}
          >
            <ListItemIcon>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        </Link>
      );
      });
  }
  public render() {
    const { classes, closeMenu, open } = this.props;
    return (
      <Drawer
        open={open}
        variant='permanent'
        className={classes.drawer}
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={closeMenu}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.drawerList}>     
          {this.buildListItems(listItems)};
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideMenu)