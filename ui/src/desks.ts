// export const deskStore = (set) => ({
// 	// STATE
// 	_desks: [
// 		{
// 			id: "hitler",
// 		},
// 	],
// });

const url2 = "http://localhost:8080/apps/hitler/static/js/698.6738f064.js";
const url3 = "http://localhost:8080/apps/hitler/static/js/main.a2734049.js";
const url4 = "http://localhost:8080/apps/hitler/static/js/myjs.js";

export const fetchDesk = (deskId) => {
	const url1 = `http://localhost:8080/apps/${deskId}`;
	fetch(url4, {
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

// 	fetch(url3, {
// 		credentials: "include",
// 	}).then((res) => {
// 		return res.text();
// 	})
// 	.then(scriptContent => {
//     const scriptElement = document.createElement('script');
//     scriptElement.textContent = scriptContent;
//     document.head.appendChild(scriptElement);
//     console.log('Script added to the web app.');
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
};
