import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import StarRating from "./StarRating";

// describe("Test Environment Check", () => {
// 	// Test 1: Can Vitest render basic HTML
// 	it("renders a simple div", async () => {
// 		render(<div>Hello Test</div>);

// 		expect(await screen.findByText("Hello Test")).toBeInTheDocument();
// 	});

// 	// Test 2: Does Star Rating render?
// 	it("renders StarRating", () => {
// 		const { container } = render(<StarRating />);
// 		console.log("RENDERED HTML", container.innerHTML);
// 	});
// });

describe("StarRating Component", () => {
	it("renders 5 stars initially", async () => {
		render(<StarRating />);

		// Look for all empty star characters on the screen
		const emptyStars = await screen.findAllByText("☆");
		expect(emptyStars).toHaveLength(5);
	});

	it("fills 3 stars when the 3rd star is clicked", async () => {
		const user = userEvent.setup();
		render(<StarRating />);

		const stars = await screen.findAllByRole("button");
		expect(stars).toHaveLength(5);

		await user.click(stars[2]);

		const filledStars = await screen.findAllByText("★");
		expect(filledStars).toHaveLength(3);

		const remainingEmptyStars = await screen.findAllByText("☆");
		expect(remainingEmptyStars).toHaveLength(2);
	});

	it("fills 4 stars when 4th star is hovered", async () => {
		const user = userEvent.setup();
		render(<StarRating />);

		const stars = await screen.findAllByRole("button");
		expect(stars).toHaveLength(5);

		await user.hover(stars[3]);

		const filledStars = await screen.findAllByText("★");
		expect(filledStars).toHaveLength(4);

		const remainingEmptyStars = await screen.findAllByText("☆");
		expect(remainingEmptyStars).toHaveLength(1);
	});
});
