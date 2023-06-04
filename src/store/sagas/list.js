import { put, takeLatest } from "redux-saga/effects"
import { getErrorBody, getErrorMessage, getRequest } from "../../constants/apis"
import { toastDuration } from "../../constants/general"
import {
	fetchInstituteListError,
	fetchInstituteListSuccess,
	fetchRankListError,
	fetchRankListSuccess,
	fetchSeatMatrixError,
	fetchSeatMatrixSuccess,
} from "../actions/list"
import { showToast } from "../actions/toast"
import {
	FETCH_INSTITUTE_LIST,
	FETCH_RANK_LIST,
	FETCH_SEAT_MATRIX,
} from "../actionTypes"

export function* fetchInstituteList(action) {
	let requestURL = "/rankmatrix/api/institute/list/"
	let payload = action.payload
	if (payload.search.length === 0) { payload.search = null }
	if (!payload.orderField) {
		payload.ordering = null
	}
	else {
		payload.ordering === "asc" ? payload.ordering = `${payload.orderField}` : payload.ordering = `-${payload.orderField}`
		payload.orderField = null;
	}

	try {
		const response = yield getRequest(requestURL, payload)
		yield put(fetchInstituteListSuccess(response))
		if (response.data.results.length === 0) {
			yield put(showToast("No data found", "warning", toastDuration))
		}
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchInstituteListError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchSeatMatrix(action) {
	let requestURL = "/rankmatrix/api/seat/list/"
	let payload = action.payload
	if (payload.search.length === 0) { payload.search = null }
	if (!payload.orderField) {
		payload.ordering = null
	}
	else {
		payload.ordering === "asc" ? payload.ordering = `${payload.orderField}` : payload.ordering = `-${payload.orderField}`
		payload.orderField = null;
	}


	try {
		const response = yield getRequest(requestURL, payload)
		yield put(fetchSeatMatrixSuccess(response))
		if (response.data.results.length === 0) {
			yield put(showToast("No data found", "warning", toastDuration))
		}
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchSeatMatrixError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchRankList(action) {
	let requestURL = "/rankmatrix/api/rank/list/"
	let payload = action.payload
	if (payload.search.length === 0) { payload.search = null }
	if (!payload.orderField) {
		payload.ordering = null
	}
	else {
		payload.ordering === "asc" ? payload.ordering = `${payload.orderField}` : payload.ordering = `-${payload.orderField}`
		payload.orderField = null;
	}
	if (payload.year === 2015) {
		payload.round = 1;
	}


	try {
		const response = yield getRequest(requestURL, payload)
		yield put(fetchRankListSuccess(response))
		if (response.data.results.length === 0) {
			yield put(showToast("No data found", "warning", toastDuration))
		}
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchRankListError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export const instituteListSaga = [
	takeLatest(FETCH_INSTITUTE_LIST, fetchInstituteList),
	takeLatest(FETCH_SEAT_MATRIX, fetchSeatMatrix),
	takeLatest(FETCH_RANK_LIST, fetchRankList),
]
