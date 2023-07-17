const parser = new DOMParser();

export const parseIndex = (htmlText) => {
	const doc = parser.parseFromString(htmlText, "text/html");
	const scriptTags = doc.getElementsByTagName("script");
	const scriptSources = Array.from(scriptTags).map((script) => script.src);
	console.log(scriptSources);
	return scriptSources;
};

export const fetchDesk = (addDesk, deskID) => {
	// const url1 = `http://localhost:8080/apps/${deskID}/cosmos.js`;
	const url1 = 'http://localhost:8081/cosmos.js';

	fetch(url1, {
		// credentials: "include",
	})
		.then((res) => {
			return res.text();
		})
		.then((jsSource) => {
			const scriptElement = document.createElement('script');
			scriptElement.textContent = jsSource;
			document.head.appendChild(scriptElement);
			addDesk(eval(`window['___${deskID}']`));
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};
