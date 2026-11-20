// Group By Roles

// const users = [
// 	{ id: 1, name: "Alice", role: "admin" },
// 	{ id: 2, name: "Bob", role: "user" },
// 	{ id: 3, name: "Charlie", role: "admin" },
// 	{ id: 4, name: "Diana", role: "editor" },
// 	{ id: 5, name: "Evan", role: "user" },
// ];

// function groupByRoles(users) {
// 	const groupedUsers = {};

// 	for (const user of users) {
// 		const role = groupedUsers[user.role];
// 		if (role) {
// 			role.push(user.name);
// 		} else {
// 			groupedUsers[user.role] = [];
// 			groupedUsers[user.role].push(user.name);
// 		}
// 	}

// 	return groupedUsers;
// }

// console.log(groupByRoles(users));

// Debounce

function debounce(searchAPI, time) {
	let searchTimer;
	return function (...args) {
		clearTimeout(searchTimer);

		searchTimer = setTimeout(() => {
			searchAPI(...args);
		}, time);
	};
}

function searchAPI(query) {
	console.log("Fetching API for:", query);
}

const debouncedSearch = debounce(searchAPI, 500);

// Simulate typing "cat" quickly:
debouncedSearch("c");
debouncedSearch("ca");
debouncedSearch("cat");
