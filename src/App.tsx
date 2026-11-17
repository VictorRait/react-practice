import { useState } from "react";
import Modal from "./components/Modal";
import StarRating from "./components/StarRating";
import Search2 from "./components/Search2";
import TabsAccordion from "./components/TabsAccordion";

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
			<Search2 />
			<TabsAccordion defaultValue='account'>
				<TabsAccordion.List>
					<TabsAccordion.Trigger value='account'>Account</TabsAccordion.Trigger>
					<TabsAccordion.Trigger value='password'>
						Password
					</TabsAccordion.Trigger>
					<TabsAccordion.Trigger value='settings'>
						Settings
					</TabsAccordion.Trigger>
				</TabsAccordion.List>

				<TabsAccordion.Content value='account'>
					<p>This is your Account information.</p>
				</TabsAccordion.Content>

				<TabsAccordion.Content value='password'>
					<p>Here you can change your password.</p>
				</TabsAccordion.Content>

				<TabsAccordion.Content value='settings'>
					<p>Adjust your notification settings here.</p>
				</TabsAccordion.Content>
			</TabsAccordion>
		</div>
	);
}

export default App;
