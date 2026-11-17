import { useEffect, useState } from "react";

type Product = {
	id: string;
	title: string;
	description: string;
	category: string;
	price: number;
};

function Search2() {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedTerm, setDebouncedTerm] = useState("");
	const [searchResults, setSearchResults] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showDropDown, setShowDropDown] = useState(false);

	const maxResults = searchResults.slice(0, 5);

	const [selectedIndex, setSelectedIndex] = useState(-1);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedTerm(searchTerm);
		}, 500);

		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		if (debouncedTerm.trim() === "") return;

		const controller = new AbortController();
		const { signal } = controller;

		const fetchSearchTerm = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(
					`https://dummyjson.com/products/search?q=${debouncedTerm}`,
					{ signal },
				);
				const data = await res.json();
				setSearchResults(data.products);
			} catch (error) {
				if (error instanceof Error && error.name !== "AbortError")
					console.log(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSearchTerm();
		return () => controller.abort();
	}, [debouncedTerm]);

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearchTerm(e.target.value);
		if (e.target.value.trim() === "") {
			setShowDropDown(false);
		} else {
			setShowDropDown(true);
		}
	}
	function handleKeydown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "ArrowDown") {
			setSelectedIndex(
				selectedIndex < maxResults.length - 1 ? selectedIndex + 1 : 0,
			);
		} else if (e.key === "ArrowUp") {
			setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : maxResults.length);
		} else if (e.key === "Enter") {
			if (searchResults.length === 0) return;
			setSearchTerm(searchResults[selectedIndex].title);
			setShowDropDown(false);
		}
	}

	return (
		<div className='relative w-[250px]'>
			<input
				className='relative border border-slate-600 w-full focus:outline-0 focus:border-0 focus:ring  ring-amber-300 z-50'
				placeholder='Search...'
				value={searchTerm}
				onChange={handleOnChange}
				onKeyDown={handleKeydown}
				onFocus={() => setShowDropDown(true)}
				onBlur={() => setShowDropDown(false)}
			/>
			{showDropDown && (
				<div className='bg-shell-400 w-full'>
					{isLoading ? (
						<span className='absolute top-full left-0 w-full bg-white border border-slate-600 border-t-0'>
							Loading...
						</span>
					) : (
						<ul className='absolute top-full left-0 w-full bg-white border border-slate-600 border-t-0 truncate'>
							{maxResults.map((product, index) => {
								console.log(showDropDown, isLoading, product.title);
								return (
									<li
										key={index}
										aria-label={product.title}
										className={`  ${selectedIndex === index ? " border border-amber-300" : ""}`}>
										{product.title}
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

export default Search2;
