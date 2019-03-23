import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Nav from '../components/Nav';

const mapStateToProps = (state) => {
  return { categories: state.shopping.categories };
};

const mapDisptchToProps = (dispatch) => {
  return {
    onClick: (path) => { dispatch(push(path)); }
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(Nav);
