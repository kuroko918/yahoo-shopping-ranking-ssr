import { connect } from 'react-redux';
import Ranking from '../components/Ranking'
import fetchRanking from '../actions/Ranking';

const mapStateToProps = (state, ownProps) => {
  return {
    categoryId: ownProps.categoryId,
    category: state.Ranking.category,
    ranking: state.Ranking.ranking,
    error: state.Ranking.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMount: (categoryId) => { dispatch(fetchRanking(categoryId)) },
    onUpdate: (categoryId) => { dispatch(fetchRanking(categoryId)) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
