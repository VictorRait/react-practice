import { useCallback, useEffect, useRef } from "react";

type setIsOpenModalProps = {
	setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	isOpenModal: boolean;
};

function Modal({ isOpenModal, setIsOpenModal }: setIsOpenModalProps) {
	const closeModal = useCallback(() => {
		setIsOpenModal(false);
	}, [setIsOpenModal]);

	const modalContent = useRef<HTMLDivElement>(null);

	// Close modal when clicking outside of it and focus on first button inside modal when it opens
	useEffect(() => {
		const previousActiveElement = document.activeElement as HTMLElement;

		modalContent.current?.querySelector("button")?.focus();

		function handleEsc(event: KeyboardEvent) {
			if (event.key === "Escape") {
				closeModal();
			}
		}

		window.addEventListener("keydown", handleEsc);

		return () => {
			window.removeEventListener("keydown", handleEsc);
			previousActiveElement?.focus();
		};
	}, [closeModal]);

	useEffect(() => {
		if (!isOpenModal) return;
		function handleTabKey(event: KeyboardEvent) {
			if (event.key === "Tab") {
				// if last keydown event was shift + tab, we need to check if the currently focused element is the first focusable element in the modal. If it is, we need to move focus to the last focusable element in the modal. If the currently focused element is the last focusable element in the modal, we need to move focus to the first focusable element in the modal.
				const focusableElements = modalContent.current?.querySelectorAll(
					"button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
				);
				if (!focusableElements || focusableElements.length === 0) return;

				if (event.shiftKey) {
					if (document.activeElement === focusableElements[0]) {
						event.preventDefault();
						(
							focusableElements[focusableElements.length - 1] as HTMLElement
						).focus();
					}
				} else if (
					document.activeElement ===
					focusableElements[focusableElements.length - 1]
				) {
					event.preventDefault();
					(focusableElements[0] as HTMLElement).focus();
				}
			}
		}

		window.addEventListener("keydown", handleTabKey);

		return () => {
			window.removeEventListener("keydown", handleTabKey);
		};
	}, [isOpenModal]);

	return (
		/* Faded full-screen background overlay */
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'>
			<div
				role='dialog'
				aria-modal='true'
				aria-labelledby='modal-title'
				ref={modalContent}
				className='h-[400px] w-[900px] bg-white flex flex-col items-center justify-center relative'>
				<div
					id='modal-title'
					className='text-2xl font-bold mb-4'>
					Hi Sample Modal
				</div>
				<button
					className='absolute top-0 right-0 px-4 pt-2 scale-150 cursor-pointer'
					onClick={closeModal}
					aria-label='close modal'>
					×
				</button>
				<form className='flex flex-col gap-4'>
					<label>
						Sample:
						<input
							className='border border-gray-300 rounded px-2 py-1 ml-2'
							type='text'
							name='sample'
						/>
					</label>
					<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default Modal;
