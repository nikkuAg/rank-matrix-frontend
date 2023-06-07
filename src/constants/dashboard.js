import colleges from "../images/colleges.svg";
import prediction from "../images/prediction.svg";
import rank from "../images/ranks.svg";
import seats from "../images/seats.svg";
import testChoices from "../images/testChoices.svg";
import pdf from "../images/pdf.svg";

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
		title: "Important Documents",
		image: pdf,
		link: "/pdfs",
	}
];

export const impDates = [
	{
		id: 1,
		title: "Registration for JEE (Advanced) 2023",
		startDate: "2023-04-30",
		endDate: "2023-05-07"
	},
	{
		id: 2,
		title: "Last date for fee payment of registered candidates",
		startDate: "2023-05-08",
		endDate: null
	},
	{
		id: 3,
		title: "Admit card available for download",
		startDate: "2023-05-29",
		endDate: "2023-06-04"
	},
	{
		id: 4,
		title: "Choosing of scribe for PwD candidates",
		startDate: "2023-06-03",
		endDate: null
	},
	{
		id: 5,
		title: "JEE (Advanced) 2023 Exam",
		startDate: "2023-06-04",
		endDate: null
	},
	{
		id: 6,
		title: "Copy of candidate responses to be available on the JEE (Advanced) 2023 website",
		startDate: "2023-06-09",
		endDate: null
	},
	{
		id: 7,
		title: "Online display of provisional answer keys",
		startDate: "2023-06-11",
		endDate: null
	},
	{
		id: 8,
		title: "Feedback and comments on provisional answer keys from the candidates",
		startDate: "2023-06-11",
		endDate: "2023-06-12"
	},
	{
		id: 9,
		title: "Online declaration of final answer keys",
		startDate: "2023-06-18",
		endDate: null
	},
	{
		id: 10,
		title: "Result of JEE (Advanced) 2023",
		startDate: "2023-06-18",
		endDate: null
	},
	{
		id: 11,
		title: "Online registration for Architecture Aptitude Test (AAT) 2023.",
		startDate: "2023-06-18",
		endDate: "2023-06-19"
	},
	{
		id: 12,
		title: "Candidate registration/choice filling for JoSAA 2023 starts.",
		startDate: "2023-06-19",
		endDate: null
	},
	{
		id: 13,
		title: "Display of Mock Seat Allocation-1 based on the choices filled.",
		startDate: "2023-06-25",
		endDate: null
	},
	{
		id: 14,
		title: "Display of Mock Seat Allocation-2 based on the choices filled.",
		startDate: "2023-06-27",
		endDate: null
	},
	{
		id: 15,
		title: "Candidate registration and choice filling for JoSAA 2023 ends.",
		startDate: "2023-06-25",
		endDate: null
	},
	{
		id: 16,
		title: "Seat Allocation Round 1",
		startDate: "2023-06-30",
		endDate: null
	},
	{
		id: 17,
		title: "Seat Allocation Round 2",
		startDate: "2023-07-06",
		endDate: null
	},
	{
		id: 18,
		title: "Seat Allocation Round 3",
		startDate: "2023-07-12",
		endDate: null
	},
	{
		id: 19,
		title: "Seat Allocation Round 4",
		startDate: "2023-07-16",
		endDate: null
	},
	{
		id: 20,
		title: "Seat Allocation Round 5",
		startDate: "2023-07-21",
		endDate: null
	},
	{
		id: 21,
		title: "Seat Allocation Round 6",
		startDate: "2023-07-26",
		endDate: null
	},
];

export const websites = [
	{
		name: "JOSAA",
		val: "https://josaa.nic.in/",
	},
	{
		name: "CSAB",
		val: "https://csab.nic.in/"
	},
	{
		name: "JEE Mains",
		val: "https://jeemain.nta.nic.in/"
	},
	{
		name: "JEE Advanced",
		val: "https://jeeadv.ac.in/"
	}
]

export const PdfsList = [
	{
		id: 1,
		title: "JEE Advanced 2023 Paper 1",
		link: "https://jeeadv.ac.in/documents/JEEAdv2023_Paper1.pdf",
	},
	{
		id: 2,
		title: "JEE Advanced 2023 Paper 2",
		link: "https://jeeadv.ac.in/documents/JEEAdv2023_Paper2.pdf",
	},
	{
		id: 3,
		title: "Business Rule for JoSAA 2023",
		link: "https://cdnbbsr.s3waas.gov.in/s313111c20aee51aeb480ecbd988cd8cc9/uploads/2023/06/2023060749.pdf",
	},
	{
		id: 4,
		title: "JoSAA 2023 Schedule",
		link: "https://cdnbbsr.s3waas.gov.in/s313111c20aee51aeb480ecbd988cd8cc9/uploads/2023/06/2023060766.pdf",
	}
]
