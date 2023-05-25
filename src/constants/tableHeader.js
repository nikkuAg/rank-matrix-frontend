export const instituteListHeader = [
	{
		id: "code",
		label: "Institute Code",
		order: true,
		alignment: "left",
	},
	{
		id: "name",
		label: "Institute Name",
		order: true,
		alignment: "left",
	},
	{
		id: "state",
		label: "State",
		order: true,
		alignment: "left",
	},
	{
		id: "nirf_1",
		label: "NIRF Ranking",
		order: true,
		alignment: "center",
	},
	{
		id: "website",
		label: "Website",
		order: true,
		alignment: "left",
	},
];

export const seatMatrixHeader = [
	{
		id: "institute_code__name",
		label: "Institute Name",
		order: true,
	},
	{
		id: "branch_code__branch_name",
		label: "Branch Name",
		order: true,
	},
	{
		id: "branch_code__duration",
		label: "Duration",
		order: true,
	},
	{
		id: "degree",
		label: "Degree",
		order: true,
	},
	{
		id: "seat_pool",
		label: "Seat Pool",
		order: true,
	},
	{
		id: "category",
		label: "Category",
		order: true,
	},
	{
		id: "quota",
		label: "Quota",
		order: true,
	},
	{
		id: "seats",
		label: "Seats",
		order: true,
	},
];

export const rankHeader = [
	{
		id: "institute_code__name",
		label: "Institute Name",
		order: true,
	},
	{
		id: "branch_code__branch_name",
		label: "Branch Name",
		order: true,
	},
	{
		id: "category",
		label: "Category",
		order: true,
	},
	{
		id: "quota",
		label: "Quota",
		order: true,
	},
	{
		id: "seat_pool",
		label: "Seat Pool",
		order: true,
	},
	{
		id: "opening_rank",
		label: "Opening Rank",
		order: true,
	},
	{
		id: "closing_rank",
		label: "Closing Rank",
		order: true,
	},
];

export const choicesHeader = [
	//removed
	// {
	// 	label: "S.No.",
	// },
	{
		label: "Institute Type",
	},
	{
		label: "Institute Name",
	},
	{
		label: "Branch Name",
	},
	// removed
	// {
	// 	label: "Category",
	// },
	{
		label: "Quota",
	},
	// renamed
	// {
	// 	label: "Seat Pool",
	// },
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
