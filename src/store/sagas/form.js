import { put, takeLatest } from "redux-saga/effects"
import { getErrorBody, getErrorMessage, getRequest } from "../../constants/apis"
import { toastDuration } from "../../constants/general"
import {
	fetchBranchListError,
	fetchBranchListSuccess,
	fetchBranchOneOneListError,
	fetchBranchOneOneListSuccess,
	fetchCategoryError,
	fetchCategorySuccess,
	fetchGenderError,
	fetchGenderSuccess,
	fetchInstituteListError,
	fetchInstituteListSuccess,
	fetchInstituteTypeError,
	fetchInstituteTypeSuccess,
	fetchQuotaError,
	fetchQuotaSuccess,
	fetchRoundError,
	fetchRoundSuccess,
	fetchYearError,
	fetchYearSuccess,
} from "../actions/form"
import { showToast } from "../actions/toast"
import {
	FETCH_BRANCH_FORM_LIST,
	FETCH_BRANCH_ONE_ONE_LIST,
	FETCH_CATEGORY,
	FETCH_GENDER,
	FETCH_INSTITUTE_FORM_LIST,
	FETCH_INSTITUTE_TYPE,
	FETCH_QUOTA,
	FETCH_ROUND,
	FETCH_YEAR,
} from "../actionTypes"

export function* fetchInstituteType(action) {
	const requestURL = `/rankmatrix/api/college_type/?choice=${action.payload.choice}`
	try {
		const response = yield getRequest(requestURL)
		yield put(fetchInstituteTypeSuccess(response))
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchInstituteTypeError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchYear() {
	const requestURL = "/rankmatrix/api/year/list"
	try {
		const response = yield getRequest(requestURL)
		yield put(fetchYearSuccess(response))
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchYearError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchRound(action) {
	const requestURL = `/rankmatrix/api/rounds/?year=${action.payload.year}`
	try {
		const response = yield getRequest(requestURL)
		yield put(fetchRoundSuccess(response))
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchRoundError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchGender() {
	const requestURL = "/rankmatrix/api/gender/"
	try {
		const response = yield getRequest(requestURL)
		yield put(fetchGenderSuccess(response))
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchGenderError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchCategory() {
	const requestURL = "/rankmatrix/api/category/"
	try {
		const response = yield getRequest(requestURL)
		yield put(fetchCategorySuccess(response))
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchCategoryError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchQuota(action) {
	const requestURL = `/rankmatrix/api/quota/?${action.payload.institute_type
			? "institute_type=" + action.payload.institute_type
			: ""
		}${action.payload.institute_code
			? "&institute_code=" + action.payload.institute_code
			: ""
		}`
	try {
		const response = yield getRequest(requestURL)
		yield put(fetchQuotaSuccess(response))
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchQuotaError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchInstituteList(action) {
	const requestURL = `/rankmatrix/api/prediction/institute/list/?institute_type=${action.payload.institute_type}`
	try {
		const response = yield getRequest(requestURL)
		yield put(fetchInstituteListSuccess(response))
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchInstituteListError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchBranchList(action) {
	const requestURL = `/rankmatrix/api/one_all/branch_list/?institute_type=${action.payload.institute_type}`
	try {
		const response = yield getRequest(requestURL)
		yield put(fetchBranchListSuccess(response))
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchBranchListError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export function* fetchBranchOneOneList(action) {
	const requestURL = `/rankmatrix/api/one_one/branch_list/?institute_id=${action.payload.instituteId}`
	try {
		const response = yield getRequest(requestURL)
		yield put(fetchBranchOneOneListSuccess(response))
	} catch (err) {
		const errBody = getErrorBody(err)
		yield put(fetchBranchOneOneListError(errBody))
		yield put(showToast(getErrorMessage(errBody), "error", toastDuration))
	}
}

export const formSaga = [
	takeLatest(FETCH_INSTITUTE_TYPE, fetchInstituteType),
	takeLatest(FETCH_YEAR, fetchYear),
	takeLatest(FETCH_ROUND, fetchRound),
	takeLatest(FETCH_CATEGORY, fetchCategory),
	takeLatest(FETCH_GENDER, fetchGender),
	takeLatest(FETCH_QUOTA, fetchQuota),
	takeLatest(FETCH_INSTITUTE_FORM_LIST, fetchInstituteList),
	takeLatest(FETCH_BRANCH_FORM_LIST, fetchBranchList),
	takeLatest(FETCH_BRANCH_ONE_ONE_LIST, fetchBranchOneOneList),
]
