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

	const displayedResults = debouncedTerm.trim() === "" ? null : termResults.slice(0, 5);
	const showDropdown = isLoading || debouncedTerm.trim() !== "";
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
				console.error(err);
				if (err instanceof Error && err.name === "AbortError") return;
			} finally {
				setIsLoading(false);
			}
		};

		fetchTerm();
		return () => controller.abort();
	}, [debouncedTerm]);

	return (
		<div className='relative w-37.5'>
			<input
				className='border border-slate-800 focus:outline-0 focus:ring  focus:border-0 focus:ring-amber-400 text-slate-600 w-full'
				type='text'
				placeholder='Search...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			{showDropdown && (
				<div className='absolute top-full left-0 w-full z-10 border border-slate-800 border-t-0'>
					{isLoading && <p>Loading...</p>}
					{debouncedTerm && termResults.length === 0 && !isLoading && (
						<p className='text-slate-600'>No results found</p>
					)}
					{displayedResults && (
						<ul className='focus:outline-0 focus:ring focus:ring-offset-2 focus:border-0 focus:ring-amber-400 text-slate-600  '>
							{termResults.slice(0, 5).map((t, index) => {
								return (
									<li
										key={index}
										className='max-w-full cursor-pointer '
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
