import { useState } from "react";

function StarRating() {
	const [hoverRating, setHoverRating] = useState(0);
	const [selectedRating, setSelectedRating] = useState(0);

	const maxRating = 5;
	const stars = [];

	for (let i = 0; i < maxRating; i++) {
		const starValue = i + 1;
		const activeRating = hoverRating || selectedRating;
		const isFilled = starValue <= activeRating;

		stars.push(
			<button
				type='button'
				className='cursor-pointer text-amber-300'
				key={starValue}
				aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""} out of ${maxRating}`}
				onMouseOver={() => setHoverRating(starValue)}
				onFocus={() => setHoverRating(starValue)}
				onClick={() => setSelectedRating(starValue)}>
				{isFilled ? "★" : "☆"}
			</button>,
		);
	}
	return (
		<div
			onBlur={() => setHoverRating(0)}
			onMouseLeave={() => setHoverRating(0)}>
			{stars}
		</div>
	);
}

export default StarRating;
