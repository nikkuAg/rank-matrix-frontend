import colleges from "../../images/colleges.svg";
import prediction from "../../images/prediction.svg";
import rank from "../../images/ranks.svg";
import seats from "../../images/seats.svg";
import testChoices from "../../images/testChoices.svg";

export const featuresCard = [
	{
		title: "Participating Colleges",
		image: colleges,
		link: "/colleges_list",
	},
	{
		title: "Seat Matrix",
		image: seats,
		link: "/seat_matrix",
	},
	{
		title: "Opening and Closing Ranks",
		image: rank,
		link: "/rank",
	},
	{
		title: "Prediction",
		image: prediction,
		link: "/prediction",
	},
	{
		title: "Test Your JoSAA Choices",
		image: testChoices,
		link: "/choices",
	},
	{
		title: "Important pdfs",
		image: testChoices,
		link: "/choices",
	}
];

export const ImpDates=[
	{
		id:1,
		title:"Jee Main Phase 2 paper",
		date:"05-05-2023"
	},
	
];

export const Websites=[
	{
		name:"JOSAA",
		val:"https://josaa.nic.in/",
	},
	{
		name:"Certificate-format",
		val:"https://josaa.nic.in/certificate-format/"
	}
]