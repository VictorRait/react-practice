import { useState } from "react";
import Modal from "./components/Modal";
import StarRating from "./components/StarRating";
import Search from "./components/Search";

function App() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	return (
		<div>
			Hello World!
			<StarRating />
			<button
				className='cursor-pointer'
				onClick={() => setIsOpenModal(true)}>
				Modal
			</button>
			{isOpenModal && (
				<Modal
					isOpenModal={isOpenModal}
					setIsOpenModal={setIsOpenModal}
				/>
			)}
			<Search />
		</div>
	);
}

export default App;
