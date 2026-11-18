import { useEffect, useRef, useState } from "react";

function InfiniteScroll() {
	const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	const [isLoading, setIsLoading] = useState(false);

	function addMoreItems() {
		if (isLoading) return;
		const maxAddNum = 5;

		// fake loading
		setIsLoading(true);
		setTimeout(() => {
			// so prevItems always stay the freshest value
			setItems((prevItems) => {
				const arr = [...prevItems];
				const lastItem = arr[prevItems.length - 1];
				for (let i = 0; i < maxAddNum; i++) {
					arr.push(lastItem + (i + 1));
				}

				return arr;
			});
			setIsLoading(false);
		}, 1000);
	}

	const loaderRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!loaderRef.current || isLoading) return;

		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				addMoreItems();
			}
		});

		observer.observe(loaderRef.current);

		return () => observer.disconnect();
	}, [isLoading]);

	return (
		<div>
			<ul>
				{items.map((item, index) => {
					return (
						<li
							key={index}
							className='h-28 border p-4 mb-2 bg-slate-100'>{`Item #${item}`}</li>
					);
				})}
			</ul>
			<div
				ref={loaderRef}
				onClick={addMoreItems}>
				Loading More...
			</div>
		</div>
	);
}

export default InfiniteScroll;
