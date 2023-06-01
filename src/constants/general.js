import { createTheme } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
export const websiteName = "Rank Matrix";
export const fileName = `${websiteName}_your_choices`;

export const colorCode = {
	green: "Very High probability for getting the branch/college.",
	yellow:
		"Probable to get the branch/college even in case cut-off of current year decreases.",
	orange:
		"Probable to get the branch/college only if cut-off of current year increases.",
	red: "Very Low probability for getting the branch/college.",
};

export const howToUse = [
	{
		option: "Participating Colleges",
		rule: "to view list of all colleges particiapting in JoSAA Counselling.",
	},
	{
		option: "Seat Matrix",
		rule: "to view the seat matrix of JoSAA from year 2019 onwards.",
	},
	{
		option: "Opening and Closing Ranks",
		rule: "to view the opening/closing rank from year 2015 onwards.",
	},
	{
		option: "Prediction",
		rule: "to view prediction of specific college and branch on the basis of past opening/closing ranks.",
		ruleDescription: [
			{
				option: "All Available Choices",
				rule: "to view prediction for all colleges and all the branches.",
			},
			{
				option: "Specific College",
				rule: "to view prediction for all the branches offered by a specific college.",
			},
			{
				option: "Specific Branch",
				rule: "to view prediction for a specific branches offered by all the colleges.",
			},
			{
				option: "Specific Branch and College",
				rule: "to view prediction for a specifc branch offered by the specific college.",
			},
		],
	},
	{
		option: "Test Your JoSAA Choices",
		rule: "to view prediction for a combination of choices you want to fill in JoSAA Counselling.",
	},
	{
		rule: "On submitting various forms, prediciton will be shown in a table, based on past opening/closing ranks, highlighted in following color codes:",
		ruleDescription: [
			{
				color: "Green",
				rule: colorCode.green,
				code: "#4bcf6f",
			},
			{
				color: "Yellow",
				rule: colorCode.yellow,
				code: "#fbbc05",
			},
			{
				color: "Orange",
				rule: colorCode.orange,
				code: "#f27844",
			},
			{
				color: "Red",
				rule: colorCode.red,
				code: "#f95656",
			},
		],
	},
];

export const customtheme = createTheme({
	palette: {
		primary: {
			main: "#6096FC",
			contrastText: "#ffffff",
		},
		secondary: {
			main: "#6096fc",
			light: "#6096fc",
			contrastText: "#ffffff",
		},
		black: {
			main: "#002942",
			contrastText: "#ffffff",
			light: "#002942",
		},
		white: {
			main: "#ffffff",
			contrastText: "#002942",
			light: "#ffffff",
		},
		chips: {
			main: "#D4E3FF",
			contrastText: "#6096FC",
			light: "#6096FC",
		},
	},
	breakpoints: {
		values: {
			xs: 450,
			sm: 600,
			md: 1000,
			lg: 1200,
			xl: 1536,
		},
	},
});

export const LightTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "#ffffff",
		color: "#6096fc",
		boxShadow: theme.shadows[1],
		fontSize: 15,
	},
}));

export const LightRankTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "#ffffff",
		color: "#6096fc",
		boxShadow: theme.shadows[1],
		fontSize: 12,
		textAlign: "center",
	},
}));

export const apiURL = "http://localhost:8000";

export const toastDuration = 2000;

export const optionsList = ["Opening Rank", "Closing Rank"];

export const choicesList = [
	{
		value: "mains",
		title: "Only JEE Main",
	},
	{
		value: "advance",
		title: "Only JEE Advanced",
	},
	{
		value: "both",
		title: "Both JEE Main and JEE Advanced",
	},
];

export const PredictionList = [
	{
		value: "all_all",
		title: "All Avaliable Choices",
		formData: [
			{
				title: "Institute Type",
				type: "select",
				list: "institute_type",
				name: "institute_type",
			},
			{
				title: "Category",
				type: "select",
				list: "category",
				name: "category",
			},
			{
				title: "Seat Pool",
				type: "select",
				list: "seatPool",
				name: "seatPool",
			},
			{
				title: "Quota",
				type: "select",
				list: "quota",
				name: "quota",
			},
			{
				title: "Rank",
				type: "number",
				name: "rank",
			},
			{
				title: "Variation in Cutoff(%)",
				type: "number",
				name: "cutoff",
			},
			// {
			// 	title: "Prediction Rank Boundary",
			// 	type: "select",
			// 	list: "option",
			// 	name: "option",
			// },
			// {
			// 	title: "Year",
			// 	type: "select",
			// 	list: "year",
			// 	name: "year",
			// },
			// {
			// 	title: "Round",
			// 	type: "select",
			// 	list: "round",
			// 	name: "round",
			// },
		],
	},
	{
		value: "all_one",
		title: "Specific College",
		formData: [
			{
				title: "Institute Type",
				type: "select",
				list: "institute_type",
				name: "institute_type",
			},
			{
				title: "Institute Name",
				type: "select",
				list: "institute_list",
				name: "institute_list",
			},
			{
				title: "Category",
				type: "select",
				list: "category",
				name: "category",
			},
			{
				title: "Seat Pool",
				type: "select",
				list: "seatPool",
				name: "seatPool",
			},
			{
				title: "Quota",
				type: "select",
				list: "quota",
				name: "quota",
			},
			{
				title: "Rank",
				type: "number",
				name: "rank",
			},
			{
				title: "Variation in Cutoff(%)",
				type: "number",
				name: "cutoff",
			},
		],
	},
	{
		value: "one_all",
		title: "Specific Branch",
		formData: [
			{
				title: "Institute Type",
				type: "select",
				list: "institute_type",
				name: "institute_type",
			},
			{
				title: "Branch Name",
				type: "select",
				list: "branch_list",
				name: "branch_list",
			},
			{
				title: "Category",
				type: "select",
				list: "category",
				name: "category",
			},
			{
				title: "Seat Pool",
				type: "select",
				list: "seatPool",
				name: "seatPool",
			},
			{
				title: "Quota",
				type: "select",
				list: "quota",
				name: "quota",
			},
			{
				title: "Rank",
				type: "number",
				name: "rank",
			},
			{
				title: "Variation in Cutoff(%)",
				type: "number",
				name: "cutoff",
			},
		],
	},
	{
		value: "one_one",
		title: "Specific Branch and College",
		formData: [
			{
				title: "Institute Type",
				type: "select",
				list: "institute_type",
				name: "institute_type",
			},
			{
				title: "Institute Name",
				type: "select",
				list: "institute_list",
				name: "institute_list",
			},
			{
				title: "Branch Name",
				type: "select",
				list: "branch_list",
				name: "branch_list",
			},
			{
				title: "Category",
				type: "select",
				list: "category",
				name: "category",
			},
			{
				title: "Seat Pool",
				type: "select",
				list: "seatPool",
				name: "seatPool",
			},
			{
				title: "Quota",
				type: "select",
				list: "quota",
				name: "quota",
			},
			{
				title: "Rank",
				type: "number",
				name: "rank",
			},
			{
				title: "Variation in Cutoff(%)",
				type: "number",
				name: "cutoff",
			},
		],
	},
];

export const TestYourChoice = {
	title: "Test Your JoSAA Choices",
	formTitle: "Details for testing your choices",
	formData: [
		{
			title: "Choices based on",
			type: "select",
			list: "choice_option",
			name: "choice_option",
		},
		{
			title: "Year",
			type: "select",
			list: "year",
			name: "year",
		},
		{
			title: "Round",
			type: "select",
			list: "round",
			name: "round",
		},
		{
			title: "Rank",
			type: "number",
			name: "rank",
		},
		{
			title: "Rank",
			type: "number",
			name: "rankMain",
			optional: true,
		},
		{
			title: "Variation in Cutoff(%)",
			type: "number",
			name: "cutoff",
		},
	],
};

export const AddChoice = {
	title: "Add your choice to test your choices",
	formTitle: "Details for testing your choices",
	formData: [
		{
			title: "Institute Type",
			type: "select",
			list: "institute_type",
			name: "institute_type",
		},
		{
			title: "Institute Name",
			type: "select",
			list: "institute_list",
			name: "institute_list",
		},
		{
			title: "Branch Name",
			type: "select",
			list: "branch_list",
			name: "branch_list",
		},
		{
			title: "Category",
			type: "select",
			list: "category",
			name: "category",
		},
		{
			title: "Seat Pool",
			type: "select",
			list: "seatPool",
			name: "seatPool",
		},
		{
			title: "Quota",
			type: "select",
			list: "quota",
			name: "quota",
		},
	],
};
