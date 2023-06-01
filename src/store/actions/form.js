import {
    FETCH_INSTITUTE_TYPE,
    FETCH_INSTITUTE_TYPE_ERROR,
    FETCH_INSTITUTE_TYPE_SUCCESS,
    FETCH_YEAR,
    FETCH_YEAR_ERROR,
    FETCH_YEAR_SUCCESS,
    FETCH_ROUND,
    FETCH_ROUND_ERROR,
    FETCH_ROUND_SUCCESS,
    FETCH_CATEGORY,
    FETCH_CATEGORY_ERROR,
    FETCH_CATEGORY_SUCCESS,
    FETCH_GENDER,
    FETCH_GENDER_ERROR,
    FETCH_GENDER_SUCCESS,
    FETCH_QUOTA,
    FETCH_QUOTA_ERROR,
    FETCH_QUOTA_SUCCESS,
    FETCH_INSTITUTE_FORM_LIST,
    FETCH_INSTITUTE_FORM_LIST_SUCCESS,
    FETCH_INSTITUTE_FORM_LIST_ERROR,
    FETCH_BRANCH_FORM_LIST,
    FETCH_BRANCH_FORM_LIST_SUCCESS,
    FETCH_BRANCH_FORM_LIST_ERROR,
    FETCH_BRANCH_ONE_ONE_LIST,
    FETCH_BRANCH_ONE_ONE_LIST_SUCCESS,
    FETCH_BRANCH_ONE_ONE_LIST_ERROR,
} from "../actionTypes";

export const fetchInstituteType = (payload) => {
    return {
        type: FETCH_INSTITUTE_TYPE,
        payload,
    };
};

export const fetchInstituteTypeSuccess = (response) => {
    return {
        type: FETCH_INSTITUTE_TYPE_SUCCESS,
        response,
    };
};

export const fetchInstituteTypeError = (errorBody) => {
    return {
        type: FETCH_INSTITUTE_TYPE_ERROR,
        errorBody,
    }
}

export const fetchYear = () => {
    return {
        type: FETCH_YEAR,
    };
};

export const fetchYearSuccess = (response) => {
    return {
        type: FETCH_YEAR_SUCCESS,
        response,
    };
};

export const fetchYearError = (errorBody) => {
    return {
        type: FETCH_YEAR_ERROR,
        errorBody,
    }
}

export const fetchRound = (payload) => {
    return {
        type: FETCH_ROUND,
        payload
    };
};

export const fetchRoundSuccess = (response) => {
    return {
        type: FETCH_ROUND_SUCCESS,
        response,
    };
};

export const fetchRoundError = (errorBody) => {
    return {
        type: FETCH_ROUND_ERROR,
        errorBody,
    }
}

export const fetchCategory = (payload) => {
    return {
        type: FETCH_CATEGORY,
        payload
    };
};

export const fetchCategorySuccess = (response) => {
    return {
        type: FETCH_CATEGORY_SUCCESS,
        response,
    };
};

export const fetchCategoryError = (errorBody) => {
    return {
        type: FETCH_CATEGORY_ERROR,
        errorBody,
    }
}

export const fetchGender = (payload) => {
    return {
        type: FETCH_GENDER,
        payload
    };
};

export const fetchGenderSuccess = (response) => {
    return {
        type: FETCH_GENDER_SUCCESS,
        response,
    };
};

export const fetchGenderError = (errorBody) => {
    return {
        type: FETCH_GENDER_ERROR,
        errorBody,
    }
}

export const fetchQuota = (payload) => {
    return {
        type: FETCH_QUOTA,
        payload
    };
};

export const fetchQuotaSuccess = (response) => {
    return {
        type: FETCH_QUOTA_SUCCESS,
        response,
    };
};

export const fetchQuotaError = (errorBody) => {
    return {
        type: FETCH_QUOTA_ERROR,
        errorBody,
    }
}

export const fetchInstituteList = (payload) => {
    return {
        type: FETCH_INSTITUTE_FORM_LIST,
        payload
    };
};

export const fetchInstituteListSuccess = (response) => {
    return {
        type: FETCH_INSTITUTE_FORM_LIST_SUCCESS,
        response,
    };
};

export const fetchInstituteListError = (errorBody) => {
    return {
        type: FETCH_INSTITUTE_FORM_LIST_ERROR,
        errorBody,
    }
}

export const fetchBranchList = (payload) => {
    return {
        type: FETCH_BRANCH_FORM_LIST,
        payload
    };
};

export const fetchBranchListSuccess = (response) => {
    return {
        type: FETCH_BRANCH_FORM_LIST_SUCCESS,
        response,
    };
};

export const fetchBranchListError = (errorBody) => {
    return {
        type: FETCH_BRANCH_FORM_LIST_ERROR,
        errorBody,
    }
}

export const fetchBranchOneOneList = (payload) => {
    return {
        type: FETCH_BRANCH_ONE_ONE_LIST,
        payload
    };
};

export const fetchBranchOneOneListSuccess = (response) => {
    return {
        type: FETCH_BRANCH_ONE_ONE_LIST_SUCCESS,
        response,
    };
};

export const fetchBranchOneOneListError = (errorBody) => {
    return {
        type: FETCH_BRANCH_ONE_ONE_LIST_ERROR,
        errorBody,
    }
}