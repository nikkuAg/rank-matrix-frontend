export const instituteListHeader = [
	{
		id: "code",
		label: "Institute Code",
		order: true,
		filterName: "INSTITUTE_CODE_FILTERS"
	},
	{
		id: "name",
		label: "Institute Name",
		order: true,
		filterName :"INSTITUTE_NAME_FILTERS"
	},
	{
		id: "state",
		label: "State",
		order: true,
		filterName :"INSTITUTE_STATE_FILTERS"
	},
	{
		id: "nirf_1",
		label: "NIRF Ranking",
		order: true,
		filterName :"INSTITUTE_NIRF_FILTERS"
	},
	{
		id: "website",
		label: "Website",
		order: true,
		filterName :"INSTITUTE_WEBSITE_FILTERS"
	},
];

export const seatMatrixHeader = [
	{
		id: "institute_code__name",
		label: "Institute Name",
		order: true,
		filterName:"INSTITUTE_FILTER"
	},
	{
		id: "branch_code__branch_name",
		label: "Branch Name",
		order: true,
		filterName:"BRANCH_FILTER"
	},
	{
		id: "branch_code__duration",
		label: "Duration",
		order: true,
		filterName:"BRANCH_DURATION_FILTER"

	},
	{
		id: "degree",
		label: "Degree",
		order: true,
		filterName:"BRANCH_DEGREE_FILTER"
	},
	{
		id: "seat_pool",
		label: "Seat Pool",
		order: true,
		filterName:"SEAT_POOL_FILTER"
	},
	{
		id: "category",
		label: "Category",
		order: true,
		filterName:"CATEGORY_FILTER"
	},
	{
		id: "quota",
		label: "Quota",
		order: true,
		filterName:"QUOTA_FILTER"
	},
	{
		id: "seats",
		label: "Seats",
		order: true,
		filterName:"SEATS_FILTER"
	},
];

export const rankHeader = [
	{
		id: "institute_code__name",
		label: "Institute Name",
		order: true,
		filterName:"INSTITUTE_FILTER"
	},
	{
		id: "branch_code__branch_name",
		label: "Branch Name",
		order: true,
		filterName:"BRANCH_FILTER"
	},
	{
		id: "category",
		label: "Category",
		order: true,
		filterName:"CATEGORY_FILTER"
	},
	{
		id: "quota",
		label: "Quota",
		order: true,
		filterName:"QUOTA_FILTER"
	},
	{
		id: "seat_pool",
		label: "Seat Pool",
		order: true,
		filterName:"SEAT_POOL_FILTER"
	},
	{
		id: "opening_rank",
		label: "Opening Rank",
		order: true,
		filterName:"OPENING_RANK_FILTER"
	},
	{
		id: "closing_rank",
		label: "Closing Rank",
		order: true,
		filterName:"CLOSING_RANK_FILTER"
	},
];

export const choicesHeader = [
	{
		label: "Institute Type",
	},
	{
		label: "Institute Name",
	},
	{
		label: "Branch Name",
	},
	{
		label: "Quota",
	},
	{
		label: "Gender",
	},
	{
		label: "Opening Rank",
	},
	{
		label: "Closing Rank",
	},
];

export const download_headers = [
	{ label: "Institute Type", key: "institute_type" },
	{ label: "Institute Name", key: "institute_name" },
	{ label: "Branch Name", key: "branch_name" },
	{ label: "Category", key: "category" },
	{ label: "Quota", key: "quota" },
	{ label: "Seat Pool", key: "seat_pool" },
	{ label: "Opening Rank", key: "opening_rank" },
	{ label: "Closing Rank", key: "closing_rank" },
];
