import produce from "immer";
import {
  FETCH_INSTITUTE_LIST,
  FETCH_INSTITUTE_LIST_ERROR,
  FETCH_INSTITUTE_LIST_SUCCESS,
  FETCH_SEAT_MATRIX,
  FETCH_SEAT_MATRIX_ERROR,
  FETCH_SEAT_MATRIX_SUCCESS,
  FETCH_RANK_LIST,
  FETCH_RANK_LIST_ERROR,
  FETCH_RANK_LIST_SUCCESS,
  SET_COLLEGES_LIST_FILTERS,
  SET_SEAT_MATRIX_FILTERS,
  SET_RANK_LIST_FILTERS,
} from "../actionTypes";

export const initialState = {
  instituteList: {
    loading: false,
    error: false,
    data: [],
    total_pages: 0,
    search: false,
    filterValues:{},
  },
  seatMatrix: {
    loading: false,
    error: false,
    data: [],
    total_pages: 0,
    search: false,
    filterValues:{},
  },
  rankList: {
    loading: false,
    error: false,
    data: [],
    total_pages: 0,
    search: false,
    filterValues:{},
  }
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_INSTITUTE_LIST:
        draft.instituteList.loading = true;
        draft.instituteList.error = false;
        draft.instituteList.data = [];
        break;
      case FETCH_INSTITUTE_LIST_SUCCESS:
        draft.instituteList.loading = false;
        draft.instituteList.error = false;
        draft.instituteList.data = action.response.data.results;
        draft.instituteList.total_pages = action.response.data.total_pages;
        draft.instituteList.search = true;
        break;
      case FETCH_INSTITUTE_LIST_ERROR:
        draft.instituteList.loading = false;
        draft.instituteList.error = true;
        draft.instituteList.data = [];
        draft.instituteList.search = false;
        break;
      case FETCH_SEAT_MATRIX:
        draft.seatMatrix.loading = true;
        draft.seatMatrix.error = false;
        draft.seatMatrix.data = [];
        break;
      case FETCH_SEAT_MATRIX_SUCCESS:
        draft.seatMatrix.loading = false;
        draft.seatMatrix.error = false;
        draft.seatMatrix.data = action.response.data.results;
        draft.seatMatrix.total_pages = action.response.data.total_pages;
        draft.seatMatrix.search = true;
        break;
      case FETCH_SEAT_MATRIX_ERROR:
        draft.seatMatrix.loading = false;
        draft.seatMatrix.error = true;
        draft.seatMatrix.data = [];
        draft.seatMatrix.search = false;
        break;
      case FETCH_RANK_LIST:
        draft.rankList.loading = true;
        draft.rankList.error = false;
        draft.rankList.data = [];
        break;
      case FETCH_RANK_LIST_SUCCESS:
        draft.rankList.loading = false;
        draft.rankList.error = false;
        draft.rankList.data = action.response.data.results;
        draft.rankList.total_pages = action.response.data.total_pages;
        draft.rankList.search = true;
        break;
      case FETCH_RANK_LIST_ERROR:
        draft.rankList.loading = false;
        draft.rankList.error = true;
        draft.rankList.data = [];
        draft.rankList.search = false;
        break;
      case SET_COLLEGES_LIST_FILTERS:
        draft.instituteList.filterValues=action.payload;
        break;
      case SET_SEAT_MATRIX_FILTERS:
        draft.seatMatrix.filterValues=action.payload;
        break;
      case SET_RANK_LIST_FILTERS:
        draft.rankList.filterValues=action.payload;
        break;
      default:
        break;
    }
  });

export default reducer;
