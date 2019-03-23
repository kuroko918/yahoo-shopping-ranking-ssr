import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class Ranking extends React.Component {
  componentWillMount() {
    this.props.onMount(this.props.categoryId)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categoryId !== nextProps.categoryId) {
      this.props.onUpdate(nextProps.categoryId)
    }
  }

  render() {
    const { category, ranking, error } = this.props;

    return(
      <div>
        <h2>
          {(() => {
            if (typeof category !== 'undefined') {
              return `${category.name}のランキング`
            } else {
              return ''
            }
          })()}
        </h2>

        {(() => {
          if (error) {
            return <p>エラーが発生しました。リロードしてください。</p>;
          } else if (typeof ranking === 'undefined') {
            return <p>読み込み中...</p>
          } else {
            return (
              <div>
                {ranking.map((item, i) => (
                  <Card key={`ranking-item-${item.code}`} style={{ maxWidth: '500px', margin: '32px auto' }}>
                    <CardMedia component="img" image={item.imageUrl} title={`${i + 1}位${item.name}`} style={{ objectFit: "cover" }}　/>
                    <CardContent>
                      <Typography type="title">
                        {`${i + 1}位${item.name}`}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button raised="true" color="secondary" fullwidth="true" href={item.url}>
                        商品ページへ
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            );
          }
        })()}
      </div>
    );
  }
}

Ranking.propTypes = {
  categoryId: PropTypes.string.isRequired,
  onMount: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  ranking: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  ),
  error: PropTypes.bool.isRequired
};

Ranking.defaultProps = {
  categoryId: '1'
};

export default Ranking;
