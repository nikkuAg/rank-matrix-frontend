import axios from "axios";
import { apiURL } from "./general";
import * as qs from 'qs';

export const getRequest = (requestURL,payload) => {
	const url = `${apiURL}${requestURL}`;
	return axios.get(url,{
		params:payload,
		paramsSerializer:params => {
				return qs.stringify(params,{arrayFormat:'repeat'})
			  }
	}).then((resposne) => resposne);
};

export function getErrorBody(error) {
	let response = {};
	try {
		response = error.response;
	} catch (err) {
		response = {};
	}
	response = response || {};
	if (typeof response.data === "string") {
		if (response.data.includes("<!DOCTYPE html>")) {
			response = {};
		}
	}
	return {
		data: response.data,
		status: response.status ? response.status : 408,
	};
}

export function getErrorMessage(error) {
	let message = "";
	if (error.data) {
		if (error.data.detail) {
			message = error.data.detail;
		} else {
			message = error.data;
		}
	}
	if (message === "") {
		message = "Some error occured. Please refresh";
	}

	return message;
}
