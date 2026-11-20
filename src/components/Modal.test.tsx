import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe("Modal component", () => {
	it("closes when close button is clicked", async () => {
		const user = userEvent.setup();
		const mockSetIsOpen = vi.fn();

		render(
			<Modal
				isOpenModal={true}
				setIsOpenModal={mockSetIsOpen}
			/>,
		);

		const closeBtn = await screen.findByRole("button", { name: /close modal/i });

		await user.click(closeBtn);
		expect(mockSetIsOpen).toHaveBeenCalledWith(false);
	});

	it("closes when esc button is pressed", async () => {
		const user = userEvent.setup();
		const mockSetIsOpen = vi.fn();

		render(
			<Modal
				isOpenModal={true}
				setIsOpenModal={mockSetIsOpen}
			/>,
		);

		await screen.findByRole("dialog");
		await user.keyboard("{Escape}");

		expect(mockSetIsOpen).toHaveBeenCalledWith(false);
		expect(mockSetIsOpen).toHaveBeenCalledTimes(1);
	});
});
