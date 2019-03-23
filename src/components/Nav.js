import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class Nav extends React.Component {
  render() {
    const to = (category) => {
      if (category.id === '1') {
        return '/all'
      } else {
        return `/category/${category.id}`
      }
    };

    return (
      <Drawer variant="permanent">
        <List style={{ width: 240 }}>
          {this.props.categories.map((category) => {
            return (
              <ListItem button key={`nav-item-${category.id}`} onClick={() => this.props.onClick(to(category)) }>
                <ListItemText primary={ category.name } />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    );
  }
}

Nav.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Nav;
