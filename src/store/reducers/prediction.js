import produce from "immer";
import {
  FETCH_ALL_ALL_PREDICTION,
  FETCH_ALL_ALL_PREDICTION_ERROR,
  FETCH_ALL_ALL_PREDICTION_SUCCESS,
  FETCH_ALL_ONE_PREDICTION,
  FETCH_ALL_ONE_PREDICTION_ERROR,
  FETCH_ALL_ONE_PREDICTION_SUCCESS,
  FETCH_ONE_ALL_PREDICTION,
  FETCH_ONE_ALL_PREDICTION_ERROR,
  FETCH_ONE_ALL_PREDICTION_SUCCESS,
  FETCH_ONE_ONE_PREDICTION,
  FETCH_ONE_ONE_PREDICTION_ERROR,
  FETCH_ONE_ONE_PREDICTION_SUCCESS,
  FETCH_TEST_CHOICE,
  FETCH_TEST_CHOICE_ERROR,
  FETCH_TEST_CHOICE_SUCCESS,
} from "../actionTypes";

export const initialState = {
  all_all: {
    loading: false,
    error: false,
    data: {},
  },
  all_one: {
    loading: false,
    error: false,
    data: {},
  },
  one_all: {
    loading: false,
    error: false,
    data: {},
  },
  one_one: {
    loading: false,
    error: false,
    data: {},
  },
  test_choice: {
    loading: false,
    error: false,
    data: {},
  }
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_ALL_ALL_PREDICTION:
        draft.all_all.loading = true;
        draft.all_all.error = false;
        draft.all_all.data = {};
        break;
      case FETCH_ALL_ALL_PREDICTION_SUCCESS:
        draft.all_all.loading = false;
        draft.all_all.error = false;
        draft.all_all.data = action.response.data;;
        break;
      case FETCH_ALL_ALL_PREDICTION_ERROR:
        draft.all_all.loading = true;
        draft.all_all.error = false;
        draft.all_all.data = {};
        break;
      case FETCH_ALL_ONE_PREDICTION:
        draft.all_one.loading = true;
        draft.all_one.error = false;
        draft.all_one.data = {};
        break;
      case FETCH_ALL_ONE_PREDICTION_SUCCESS:
        draft.all_one.loading = false;
        draft.all_one.error = false;
        draft.all_one.data = action.response.data;;
        break;
      case FETCH_ALL_ONE_PREDICTION_ERROR:
        draft.all_one.loading = true;
        draft.all_one.error = false;
        draft.all_one.data = {};
        break;
      case FETCH_ONE_ALL_PREDICTION:
        draft.one_all.loading = true;
        draft.one_all.error = false;
        draft.one_all.data = {};
        break;
      case FETCH_ONE_ALL_PREDICTION_SUCCESS:
        draft.one_all.loading = false;
        draft.one_all.error = false;
        draft.one_all.data = action.response.data;;
        break;
      case FETCH_ONE_ALL_PREDICTION_ERROR:
        draft.one_all.loading = true;
        draft.one_all.error = false;
        draft.one_all.data = {};
        break;
      case FETCH_ONE_ONE_PREDICTION:
        draft.one_one.loading = true;
        draft.one_one.error = false;
        draft.one_one.data = {};
        break;
      case FETCH_ONE_ONE_PREDICTION_SUCCESS:
        draft.one_one.loading = false;
        draft.one_one.error = false;
        draft.one_one.data = action.response.data;;
        break;
      case FETCH_ONE_ONE_PREDICTION_ERROR:
        draft.one_one.loading = true;
        draft.one_one.error = false;
        draft.one_one.data = {};
        break;
      case FETCH_TEST_CHOICE:
        draft.test_choice.loading = true;
        draft.test_choice.error = false;
        draft.test_choice.data = {};
        break;
      case FETCH_TEST_CHOICE_SUCCESS:
        draft.test_choice.loading = false;
        draft.test_choice.error = false;
        draft.test_choice.data = action.response.data;
        break;
      case FETCH_TEST_CHOICE_ERROR:
        draft.test_choice.loading = true;
        draft.test_choice.error = false;
        draft.test_choice.data = {};
        break;
      default:
        break;
    }
  });

export default reducer;
