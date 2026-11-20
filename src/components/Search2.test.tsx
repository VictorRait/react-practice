import { describe, it, vi, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search2 from "./Search2";

describe("Search2 Component", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("fetches and displays products after typing", async () => {
		const user = userEvent.setup();

		const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
			ok: true,
			json: async () => ({
				products: [
					{
						id: 1,
						title: "Mock Phone X",
						description: "",
						category: "",
						price: 500,
					},
				],
			}),
		} as Response);

		render(<Search2 />);

		const input = await screen.findByRole("textbox");

		await user.type(input, "phone");

		expect(await screen.findByText("Mock Phone X")).toBeInTheDocument();

		expect(fetchSpy).toHaveBeenCalledTimes(1);
		expect(fetchSpy).toHaveBeenCalledWith(
			"https://dummyjson.com/products/search?q=phone",
			expect.objectContaining({ signal: expect.any(AbortSignal) }),
		);
		//
	});
});
