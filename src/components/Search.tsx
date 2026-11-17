import { useEffect, useState } from "react";

type TermResult = {
	id?: number;
	title: string;
	description: string;
	category: string;
	price: number;
};

function Search() {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedTerm, setDebouncedTerm] = useState("");
	const [termResults, setTermResults] = useState<TermResult[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const maxResults = termResults.slice(0, 5);
	const displayedResults = debouncedTerm.trim() === "" ? null : maxResults;
	const [showDropDown, setShowDropDown] = useState<boolean>(false);

	const [selectedIndex, setSelectedIndex] = useState<number>(-1);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedTerm(searchTerm);
		}, 500);

		// clearTimeout resets the timer before starting again
		return () => {
			clearTimeout(timer);
		};
	}, [searchTerm]);

	useEffect(() => {
		if (debouncedTerm.trim() === "") {
			return;
		}

		const controller = new AbortController();
		const signal = controller.signal;

		const fetchTerm = async () => {
			try {
				setIsLoading(true);
				const res = await fetch(
					`https://dummyjson.com/products/search?q=${debouncedTerm}`,
					{ signal },
				);
				const data = await res.json();
				setTermResults(data.products);
				console.log(data);
			} catch (err) {
				if (err instanceof Error && err.name === "AbortError") return;
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchTerm();
		return () => controller.abort();
	}, [debouncedTerm]);

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "ArrowDown") {
			setSelectedIndex(
				selectedIndex < maxResults.length - 1 ? selectedIndex + 1 : 0,
			);
		} else if (e.key === "ArrowUp") {
			setSelectedIndex(
				selectedIndex > 0 ? selectedIndex - 1 : maxResults.length - 1,
			);
		} else if (e.key === "Enter" && selectedIndex >= 0) {
			if (termResults.length === 0) return;

			setSearchTerm(maxResults[selectedIndex].title);
			setShowDropDown(false);
		}
	}

	function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
		e.preventDefault();
		setSearchTerm(e.target.value);
		setShowDropDown(true);
	}

	return (
		<div className='relative w-37.5'>
			<input
				className='border border-slate-800 focus:outline-0 focus:ring  focus:border-0 focus:ring-amber-400 text-slate-600 w-full'
				type='text'
				placeholder='Search...'
				value={searchTerm}
				onKeyDown={handleKeyDown}
				onChange={handleInputFocus}
			/>
			{showDropDown && (
				<div className='absolute top-full left-0 w-full z-10 border border-slate-800 border-t-0'>
					{isLoading && <p>Loading...</p>}
					{debouncedTerm && termResults.length === 0 && !isLoading && (
						<p className='text-slate-600'>No results found</p>
					)}
					{displayedResults && (
						<ul className='focus:outline-0 focus:ring focus:ring-offset-2 focus:border-0 focus:ring-amber-400 text-slate-600'>
							{maxResults.map((t, index) => {
								return (
									<li
										key={index}
										className={`max-w-full cursor-pointer truncate ${selectedIndex === index ? " border border-amber-400" : ""}`}
										onClick={() => setSearchTerm(t.title)}>
										{t.title}
									</li>
								);
							})}
						</ul>
					)}
				</div>
			)}
		</div>
	);
}

export default Search;
