const parser = new DOMParser();

export const parseIndex = (htmlText) => {
	const doc = parser.parseFromString(htmlText, "text/html");
	const scriptTags = doc.getElementsByTagName("script");
	const scriptSources = Array.from(scriptTags).map((script) => script.src);
	console.log(scriptSources);
	return scriptSources;
};

export const fetchDesk = (deskId) => {
	const url1 = `http://localhost:8080/apps/${deskId}`;

	fetch(url1, {
		credentials: "include",
	})
		.then((res) => {
			return res.text();
		})
		.then((indexPage) => {
			const scriptSources = parseIndex(indexPage);
			scriptSources.map(source => injectPage(source));
		})
		.catch((error) => {
			console.error("Error:", error);
		});
};

export const injectPage = (scriptSource) => {
	fetch(scriptSource, {
		credentials: "include",
	}).then((res) => {
		return res.text();
	})
	.then(scriptContent => {
	const scriptElement = document.createElement('script');
	scriptElement.textContent = scriptContent;
	document.head.appendChild(scriptElement);
	console.log('Script added to the web app.');
	})
	.catch(error => {
	console.error('Error:', error);
	});
}
