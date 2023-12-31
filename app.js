var root = am5.Root.new("chartdiv");

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([am5themes_Animated.new(root)]);

// Add wrapper container
var container = root.container.children.push(
	am5.Container.new(root, {
		width: am5.percent(100),
		height: am5.percent(100),
		layout: root.verticalLayout,
	})
);

var title = container.children.push(
	am5.Label.new(root, {
		text: "Number of Indigenous people able to speak an Indigenous language in 2021 and percentage change from 2016",
		fontSize: 13,
		fontStyle: "italic",
		fill: am5.color(0x898989),
		x: am5.percent(50),
		y: am5.percent(3),
		centerX: am5.percent(50),
		focusable: true,
	})
);
// Add series
// https://www.amcharts.com/docs/v5/charts/word-cloud/
var series = container.children.push(
	am5wc.WordCloud.new(root, {
		categoryField: "tag",
		minFontSize: 60, // Set your desired font size
		maxFontSize: 165, // Set your desired font size
		valueField: "weight",
		calculateAggregates: true, // This is needed for heat rules to work
		dataFields: {
			percentage: "percentage", // Add "percentage" data field
			// Add more data fields as needed
		},
	})
);
// Add chart title

// Set up heat rules
// https://www.amcharts.com/docs/v5/charts/word-cloud/#Via_heat_rules
series.set("heatRules", [
	{
		target: series.labels.template,
		dataField: "weight",
		key: "fill",
	},
]);

// Configure labels
series.labels.template.setAll({
	paddingTop: 25,
	paddingBottom: 25,
	paddingLeft: 7,
	paddingRight: 25,
	fontFamily: "Arial",
	templateField: "labelSettings",
	cursorOverStyle: "pointer",
	focusable: true,
	focusableGroup: "Series #1",
});

// Inside the click event handler for labels
// Inside the click event handler for labels
series.labels.template.events.on("click", (ev) => {
	const category = ev.target.dataItem.dataContext.category;
	const percentage = ev.target.dataItem.dataContext.percentage;
	const numOfSpeakers = ev.target.dataItem.dataContext.weight;
	const popupClose = document.getElementById("popup-close");

	const langaugeColorR = ev.target.dataItem.dataContext.labelSettings.fill.r;

	const langaugeColorG = ev.target.dataItem.dataContext.labelSettings.fill.g;

	const langaugeColorB = ev.target.dataItem.dataContext.labelSettings.fill.b;

	// Get a reference to the popup div and its child elements
	const popup = document.getElementById("popup");
	const popupCategory = document.getElementById("popupCategory");
	const popupPercentage = document.getElementById("popupPercentage");
	const popupDescription = document.getElementById("popup-description");

	// Set the content of the popup
	popupDescription.innerHTML = `<p>In 2021, there were <strong style="color:rgb(${langaugeColorR},${langaugeColorG},${langaugeColorB})
					">${numOfSpeakers}</strong> speakers of the <strong style="color:rgb(${langaugeColorR},${langaugeColorG},${langaugeColorB})
					";>${category}</strong> language in Canada. Since 2016, the number of speakers had changed by 
					<strong style="color:rgb(${langaugeColorR},${langaugeColorG},${langaugeColorB})">${percentage}%</strong>.</p>`;

	currentActiveElement = document.activeElement;

	// Check if ev.target.dom is defined before accessing it
	if (ev.target.dataItem.dataContext) {
		console.log(ev.target.dataItem.dataContext.labelSettings.fill.r);

		// Calculate the position relative to the clicked word
		const x = ev.target.pixelX;
		const y = ev.target.pixelY - 200; // Position 200px above the clicked word

		// Position the popup using CSS transforms
		popup.style.transform = `translate(${x}px, ${y}px)`;

		// Set the display property before showing the popup
		popup.style.display = "block";
		popup.style.zIndex = "1000";

		// Make the popup focusable and set focus
		popup.setAttribute("tabindex", "0");
		popup.focus();
	} else {
		console.log("not working");
		console.log(ev.target.dataItem.dataContext);
	}

	// Check if ev.event is defined before calling stopPropagation
	if (ev.event) {
		// Prevent the click event from propagating further
		ev.event.stopPropagation();
	}

	// Handle keyboard interactions for the popup
	popup.addEventListener("keydown", (e) => {
		if (e.key === "Enter" || e.key === "Escape") {
			popup.style.display = "none";

			// Return focus to the clicked word cloud element
			currentActiveElement.focus();
		}
	});

	// Add a click event to the close button
	popupClose.addEventListener("click", () => {
		popup.style.display = "none";

		// Return focus to the clicked word cloud element
		currentActiveElement.focus();
	});
});

const colorMapping = {
	"-40%": 0x3e080f, //ranges lesser than -40% so numbers like -50 -60
	"-40%-30%": 0x60131d, //ranges between -40% and 30%
	"-30%-20%": 0x87303c, //ranges between -30% and -20%
	"-20%-10%": 0xab7e85, //ranges between -20% and -10%
	"-10%-0%": 0xfedaac, //ranges between -10% and 0%
	"0-10%": 0xafbbd3, //ranges between 0% and 10%
	"10%-20%": 0x5f75a8, //ranges between 10% and 20%
	"20%-30%": 0x385391, //ranges between 20% and 30%
	"30%-+": 0x1c2a49, //ranges greater than 30% .. such as  33% ..40%
};
var data = [
	{
		category: "Cree languages",
		weight: 86475,
		percentage: -6.1,

		labelSettings: { fill: am5.color(colorMapping["-10%-0%"]) },
	},
	{
		category: "Inuktitut",
		weight: 40320,
		labelSettings: { fill: am5.color(colorMapping["0-10%"]) },

		percentage: 1.4,
	},
	{
		category: "Ojibway languages",
		weight: 25440,
		labelSettings: { fill: am5.color(colorMapping["-10%-0%"]) },
		percentage: -5.4,
	},
	{
		category: "Oji-Cree",
		labelSettings: { fill: am5.color(colorMapping["-10%-0%"]) },
		weight: 15210,
		percentage: -1.1,
	},
	{
		category: "Innu (Montagnais) and Naskapi languages",
		weight: 11605,
		labelSettings: { fill: am5.color(colorMapping["-10%-0%"]) },
		percentage: -0.4,
	},
	{
		category: "Dene",
		weight: 11375,
		labelSettings: { fill: am5.color(colorMapping["-20%-10%"]) },
		percentage: -10.9,
	},
	{
		category: "Mi’kmaq",
		weight: 9000,
		labelSettings: { fill: am5.color(colorMapping["0-10%"]) },
		percentage: 8.0,
	},
	{
		category: "Atikamekw",
		weight: 6740,
		labelSettings: { fill: am5.color(colorMapping["0-10%"]) },
		percentage: 2.2,
	},
	{
		category: "Blackfoot",
		weight: 6585,
		labelSettings: { fill: am5.color(colorMapping["10%-20%"]) },
		percentage: 19.1,
	},
	{
		category: "Slavey-Hare languages",
		weight: 2215,
		labelSettings: { fill: am5.color(colorMapping["-30%-20%"]) },

		percentage: -20.3,
	},
	{
		category: "Tlicho (Dogrib)",
		weight: 2115,
		labelSettings: { fill: am5.color(colorMapping["-10%-0%"]) },

		percentage: -10.0,
	},
	{
		category: "Anicinabemowin (Algonquin)",
		weight: 1925,
		labelSettings: { fill: am5.color(colorMapping["-30%-20%"]) },
		percentage: -21.1,
	},
	{
		category: "Michif",
		weight: 1845,
		labelSettings: { fill: am5.color(colorMapping["30%-+"]) },
		percentage: 57.7,
	},
	{
		category: "Dakelh (Carrier)",
		weight: 1530,
		labelSettings: { fill: am5.color(colorMapping["-30%-20%"]) },
		percentage: -25.9,
	},
	{
		category: "Dakota",
		weight: 1505,
		labelSettings: { fill: am5.color(colorMapping["0-10%"]) },
		percentage: 0.7,
	},
	{
		category: "Mohawk",
		weight: 1435,
		labelSettings: { fill: am5.color(colorMapping["10%-20%"]) },
		percentage: 11.7,
	},
	{
		category: "Halkomelem",
		weight: 1335,
		labelSettings: { fill: am5.color(colorMapping["20%-30%"]) },
		percentage: 29.6,
	},
	{
		category: "Gitxsan (Gitksan)",
		labelSettings: { fill: am5.color(colorMapping["-20%-10%"]) },
		weight: 1110,
		percentage: -14.0,
	},
	{
		category: "Nisga’a",
		weight: 1080,
		labelSettings: { fill: am5.color(colorMapping["0-10%"]) },
		percentage: 4.3,
	},
	{
		category: "Secwepemctsin (Shuswap)",
		weight: 1050,
		labelSettings: { fill: am5.color(colorMapping["-20%-10%"]) },
		percentage: -12.9,
	},
	{
		category: "Stoney",
		weight: 915,
		labelSettings: { fill: am5.color(colorMapping["10%-20%"]) },
		percentage: 14.4,
	},
	{
		category: "Tsilhqot’in (Chilcotin)",
		weight: 855,
		labelSettings: { fill: am5.color(colorMapping["-20%-10%"]) },
		percentage: -15.3,
	},
	{
		category: "Wolastoqewi (Malecite)",
		weight: 790,
		labelSettings: { fill: am5.color(colorMapping["0-10%"]) },
		percentage: 6.8,
	},
	{
		category: "Kwak’wala (Kwakiutl)",
		weight: 760,
		labelSettings: { fill: am5.color(colorMapping["20%-30%"]) },
		percentage: 29.9,
	},
	{
		category: "Inuinnaqtun",
		weight: 750,
		labelSettings: { fill: am5.color(colorMapping["-40%"]) },
		percentage: -43.2,
	},
	{
		category: "Syilx (Okanagan)",
		weight: 665,
		labelSettings: { fill: am5.color(colorMapping["-20%-10%"]) },
		percentage: -18.4,
	},
	{
		category: "Nuu-chah-nulth (Nootka)",
		weight: 665,
		labelSettings: { fill: am5.color(colorMapping["20%-30%"]) },
		percentage: 25.5,
	},
	{
		category: "Lillooet",
		weight: 580,
		labelSettings: { fill: am5.color(colorMapping["-30%-20%"]) },
		percentage: -24.7,
	},
	{
		category: "Ntlakapamux (Thompson)",
		weight: 470,
		labelSettings: { fill: am5.color(colorMapping["10%-20%"]) },
		percentage: 11.9,
	},
	{
		category: "Tsimshian",
		weight: 445,
		labelSettings: { fill: am5.color(colorMapping["0-10%"]) },
		percentage: 7.2,
	},
	{
		category: "Inuvialuktun",
		weight: 350,
		labelSettings: { fill: am5.color(colorMapping["-40%"]) },
		percentage: -45.3,
	},
	{
		category: "Assiniboine",
		weight: 350,
		labelSettings: { fill: am5.color(colorMapping["-10%-0%"]) },
		percentage: 0,
	},
	{
		category: "Squamish",
		weight: 345,
		labelSettings: { fill: am5.color(colorMapping["20%-30%"]) },
		percentage: 23.2,
	},
	{
		category: "Heiltsuk",
		weight: 325,
		labelSettings: { fill: am5.color(colorMapping["30%-+"]) },
		percentage: 160.0,
	},
	{
		category: "Haisla",
		weight: 285,
		labelSettings: { fill: am5.color(colorMapping["30%-+"]) },
		percentage: 62.9,
	},
	{
		category: "Straits",
		weight: 280,
		labelSettings: { fill: am5.color(colorMapping["-30%-20%"]) },
		percentage: -21.1,
	},
	{
		category: "Gwich’in",
		weight: 275,
		labelSettings: { fill: am5.color(colorMapping["-30%-20%"]) },
		percentage: -22.5,
	},
	{
		category: "Dane-zaa (Beaver)",
		weight: 270,
		labelSettings: { fill: am5.color(colorMapping["-30%-20%"]) },
		percentage: -18.2,
	},
	{
		category: "Tutchone languages",
		weight: 255,
		labelSettings: { fill: am5.color(colorMapping["-40%-30%"]) },
		percentage: -36.3,
	},
	{
		category: "Wetsuwet’en-Babine",
		weight: 240,
		labelSettings: { fill: am5.color(colorMapping["10%-20%"]) },
		percentage: 17.1,
	},
	{
		category: "Tahltan",
		weight: 235,
		labelSettings: { fill: am5.color(colorMapping["-10%-0%"]) },
		percentage: -9.6,
	},
	{
		category: "Kaska (Nahani)",
		weight: 225,
		labelSettings: { fill: am5.color(colorMapping["-40%-30%"]) },
		percentage: -36.6,
	},
	{
		category: "Haida",
		weight: 220,
		labelSettings: { fill: am5.color(colorMapping["-40%"]) },
		percentage: -51.1,
	},
	{
		category: "Cayuga",
		weight: 220,
		labelSettings: { fill: am5.color(colorMapping["30%-+"]) },
		percentage: 76.0,
	},
	{
		category: "Ktunaxa (Kutenai)",
		weight: 210,
		labelSettings: { fill: am5.color(colorMapping["20%-30%"]) },
		percentage: 23.5,
	},
	{
		category: "Oneida",
		weight: 200,
		labelSettings: { fill: am5.color(colorMapping["10%-20%"]) },
		percentage: 14.3,
	},
	{
		category: "Tsuu T’ina (Sarsi)",
		weight: 175,
		labelSettings: { fill: am5.color(colorMapping["30%-+"]) },
		percentage: 66.7,
	},
	{
		category: "Tse’khene (Sekani)",
		weight: 135,
		labelSettings: { fill: am5.color(colorMapping["-30%-20%"]) },
		percentage: -25.0,
	},
	{
		category: "Tlingit",
		weight: 120,
		labelSettings: { fill: am5.color(colorMapping["-40%"]) },
		percentage: -52.9,
	},
];

series.data.setAll(data);
var scrollbarLabels = document.querySelectorAll(".scrollbar-label");
var draggableCircle = document.getElementById("draggable-circle");
var scrollbar = document.getElementById("scrollbar");
scrollbarLabels.forEach(function (label) {
	label.addEventListener("click", () => {
		console.log("clicked");
	});

	label.addEventListener("keydown", (event) => {
		if (event.key === "Enter" || event.keyCode === 13) {
			// Your code to handle the "Enter" key press goes here
			handleLabelClick(event);
		}
	});
});

// Define the color stops and their corresponding percentages
var colorStops = [
	{ color: "rgba(62, 8, 15, 1)", percentage: -40 },
	{ color: "rgba(96, 19, 29, 1)", percentage: -30 },
	{ color: "rgba(135, 48, 60, 1)", percentage: -20 },
	{ color: "rgba(171, 126, 133, 1)", percentage: -10 },
	{ color: "rgba(254, 218, 172, 1)", percentage: 0 },
	{ color: "rgba(175, 187, 211, 1)", percentage: 15 },
	{ color: "rgba(95, 117, 168, 1)", percentage: 20 },
	{ color: "rgba(58, 117, 168, 1)", percentage: 35 },
	{ color: "rgba(28, 42, 73, 1)", percentage: 160 },
];
var isDragging = false;
var isAnimating = false; // Flag to indicate animation
var initialX;
var draggableCircle = document.getElementById("draggable-circle");
var scrollbar = document.getElementById("scrollbar");
var lastPercentage = -40; // Initialize with the initial percentage

// Function to update the Word Cloud and circle position based on the percentage
function updateWordCloud(percentage) {
	if (percentage !== undefined) {
		series.data.clear(); // Clear existing data

		// Filter the data and add only languages with the percentage equal or lesser to 'percentage'
		var newData = data.filter((item) => item.percentage <= percentage);

		// Update the Word Cloud with the filtered data
		series.data.setAll(newData);
	}
}

// Function to handle label click
function handleLabelClick(event) {
	function updateData(percentage) {
		if (!isNaN(percentage)) {
			// Calculate the new position of the circle
			var scrollbarWidth = scrollbar.clientWidth;
			var circleWidth = draggableCircle.clientWidth;
			var adjustedWidth = scrollbarWidth - circleWidth;
			var newLeft = ((percentage + 40) / 80) * adjustedWidth;

			// Set the animation flag to true
			isAnimating = true;

			// Temporarily remove the transition property
			draggableCircle.style.transition = "none";

			// Update the circle's position
			draggableCircle.style.left = newLeft + "px";

			// Wait for a small time to ensure the position is updated before reapplying the transition
			setTimeout(() => {
				// Reapply the transition for smooth animation
				draggableCircle.style.transition = "left 0.3s ease";

				// Set the animation flag back to false
				isAnimating = false;
			}, 10);

			// Update the Word Cloud using the selected percentage
			updateWordCloud(percentage);
			lastPercentage = percentage; // Update the last percentage value
		}
	}

	// Extract the percentage from the clicked label's data attribute
	var percentage = parseFloat(event.target.getAttribute("data-percentage"));

	if (!isNaN(percentage)) {
		updateData(percentage);
	}
	function handleLabelClick(event) {
		function updateData(percentage) {
			if (!isNaN(percentage)) {
				// Calculate the new position of the circle
				var scrollbarWidth = scrollbar.clientWidth;
				var circleWidth = draggableCircle.clientWidth;
				var adjustedWidth = scrollbarWidth - circleWidth;
				var newLeft = ((percentage + 40) / 80) * adjustedWidth;

				// Set the animation flag to true
				isAnimating = true;

				// Temporarily remove the transition property
				draggableCircle.style.transition = "none";

				// Update the circle's position
				draggableCircle.style.left = newLeft + "px";

				// Wait for a small time to ensure the position is updated before reapplying the transition
				setTimeout(() => {
					// Reapply the transition for smooth animation
					draggableCircle.style.transition = "left 0.3s ease";

					// Set the animation flag back to false
					isAnimating = false;
				}, 10);

				// Update the Word Cloud using the selected percentage
				updateWordCloud(percentage);
				lastPercentage = percentage; // Update the last percentage value
			}
		}

		// Extract the percentage from the clicked label's data attribute
		var percentage = parseFloat(event.target.getAttribute("data-percentage"));

		if (!isNaN(percentage)) {
			updateData(percentage);
		}
	}

	const scrollbarLabels = document.querySelectorAll(".scrollbar-label");
}

// Add event listeners to the scrollbar labels for click events
scrollbarLabels.forEach(function (label) {
	label.addEventListener("click", handleLabelClick);
});

// Add event listeners for dragging the circle
draggableCircle.addEventListener("mousedown", (e) => {
	isDragging = true;
	initialX = e.clientX - draggableCircle.getBoundingClientRect().left;
});

document.addEventListener("mousemove", (e) => {
	if (!isDragging) return;

	e.preventDefault();

	var newX = e.clientX - initialX - scrollbar.getBoundingClientRect().left;
	var scrollbarWidth = scrollbar.clientWidth;
	var circleWidth = draggableCircle.clientWidth;

	// Calculate the percentage based on the specified range
	var rangeMin = -40;
	var rangeMax = 160;
	var adjustedWidth = scrollbarWidth - circleWidth;
	var percentage = (newX / adjustedWidth) * (rangeMax - rangeMin) + rangeMin;

	// Ensure the percentage stays within the specified range
	percentage = Math.max(rangeMin, Math.min(rangeMax, percentage));

	// Temporarily remove the transition property if not animating
	if (!isAnimating) {
		draggableCircle.style.transition = "none";
	}

	// Update the circle's position

	// Reapply the transition if not animating for smooth animation
	if (!isAnimating) {
		var newLeft =
			((percentage - rangeMin) / (rangeMax - rangeMin)) * adjustedWidth;
		draggableCircle.style.left = newLeft + "px";
	}

	// Update the Word Cloud when dragging is finished
	document.addEventListener("mouseup", function mouseupListener() {
		isDragging = false;
		console.log("Current Value: " + lastPercentage.toFixed(2) + "%");
	});

	updateWordCloud(percentage); // Update the Word Cloud using the last selected percentage
});

updateWordCloud(-40); // Update the Word Cloud using the last selected percentage

document.addEventListener("DOMContentLoaded", function () {
	const hero = document.querySelector(".hero");
	const slider = document.querySelector(".slider");
	const logo = document.querySelector("#logo");
	const hamburger = document.querySelector(".hamburger");
	const headline = document.querySelector(".headline");
	const tl = gsap.timeline();

	tl.fromTo(
		hero,
		1,
		{ height: "0%" },
		{ height: "80%", ease: Power2.easeInOut }
	)
		.fromTo(
			hero,
			1.2,
			{ width: "100%" },
			{ width: "80%", ease: Power2.easeInOut }
		)
		.fromTo(
			slider,
			1.2,
			{ x: "-100%" },
			{ x: "0%", ease: Power2.easeInOut },
			"-=1.2"
		)
		.fromTo(logo, 0.5, { opacity: 0, x: 30 }, { opacity: 1, x: 0 }, "-=0.5")
		.fromTo(
			hamburger,
			0.5,
			{ opacity: 0, x: 30 },
			{ opacity: 1, x: 0 },
			"-=0.5"
		)
		.fromTo(
			headline,
			0.5,
			{ opacity: 0, x: 30 },
			{ opacity: 1, x: 0 },
			"-=0.5"
		);
});
