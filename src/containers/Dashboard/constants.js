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
		link: "/pdfs",
	}
];

export const impDates=[
	{
		id:1,
		title:"Registration for JEE (Advanced) 2023 ",
		startDate:"2023-04-30",
		endDate:"2023-05-07"
	},
	{
		id:2,
		title:"Last date for fee payment of registered candidates ",
		startDate:"2023-05-08",
		endDate: null
	},
	{
		id:3,
		title:"Admit card available for download ",
		startDate:"2023-05-29",
		endDate:"2023-06-04"
	},
	{
		id:4,
		title:"Choosing of scribe for PwD candidates ",
		startDate:"2023-06-03",
		endDate: null
	},
	{
		id:5,
		title:"JEE (Advanced) 2023 Exam ",
		startDate:"2023-06-04",
		endDate: null
	},
	{
		id:6,
		title:"Copy of candidate responses to be available on the JEE (Advanced) 2023 website ",
		startDate:"2023-06-09",
		endDate: null
	},
	{
		id:7,
		title:"Online display of provisional answer keys ",
		startDate:"2023-06-11",
		endDate: null
	},
	{
		id:8,
		title:"Feedback and comments on provisional answer keys from the candidates ",
		startDate:"2023-06-11",
		endDate:"2023-06-12"
	},
	{
		id:9,
		title:"Online declaration of final answer keys ",
		startDate:"2023-06-18",
		endDate: null
	},
	{
		id:10,
		title:"Result of JEE (Advanced) 2023 ",
		startDate:"2023-06-18",
		endDate: null
	},
	{
		id:11,
		title:"Online registration for Architecture Aptitude Test (AAT) 2023 ",
		startDate:"2023-06-18",
		endDate:"2023-06-19"
	}
	
];

export const websites=[
	{
		name:"JOSAA",
		val:"https://josaa.nic.in/",
	},
	{
		name:"CSAB",
		val:"https://csab.nic.in/"
	},
	{
		name:"JEE Main",
		val:"https://jeemain.nta.nic.in/about-jeemain-2023/"
	},
	{
		name:"JEE Advances",
		val:"https://jeeadv.ac.in/"
	}
]
