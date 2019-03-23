import fetchJsonP from 'fetch-jsonp';
import qs from 'qs';
import { replace } from 'react-router-redux';
import config from '../env';

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking';

const startRequest = (category) => {
  return {
    type: 'START_REQUEST',
    payload: { category }
  };
}

const recieveData = (category, error, response) => {
  return {
    type: 'RECIEVE_REQUEST',
    payload: { category, error, response }
  };
}

const finishRequest = (category) => {
  return {
    type: 'FINISH_REQUEST',
    payload: { category }
  };
}

const fetchRanking = (categoryId) => {
  return async (dispatch, getState) => {
    const categories = getState().shopping.categories
    const category = categories.find((category) => (category.id === categoryId))
    if (typeof category === 'undefined') {
      dispatch(replace('/'))
      return;
    }

    dispatch(startRequest(category));
    const queryString = qs.stringify({
      appid: config.APP_ID,
      category_id: category.id
    });

    try {
      const response = await fetchJsonP(`${API_URL}?${queryString}`);
      const data = await response.json();
      dispatch(recieveData(category, null, data))
    } catch (error) {
      dispatch(recieveData(category, error))
    }

    dispatch(finishRequest(category))
  }
}

export default fetchRanking;
