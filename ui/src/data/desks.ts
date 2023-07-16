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
	console.log(url1);

	fetch(url1, {
		// credentials: "include",
	})
		.then((res) => {
			// console.log(res);
			return res.text();
		})
		.then((jsSource) => {
			// console.log(jsSource);
			const scriptElement = document.createElement('script');
			scriptElement.textContent = jsSource;
			document.head.appendChild(scriptElement);
			// console.log(`${url1}Script added to the web app.`);
			// console.log(eval(`window`));
			// console.log(jsSource);
			// console.log(eval(`window.___${deskID}`));
			addDesk(eval(`window['___${deskID}']`));
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};
