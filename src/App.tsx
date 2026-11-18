import { useState } from "react";
import Modal from "./components/Modal";
import StarRating from "./components/StarRating";
import Search2 from "./components/Search2";

import Tabs from "./components/Tabs";
import InfiniteScroll from "./components/InfiniteScroll";

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
			<Tabs defaultValue='tab1'>
				<Tabs.List>
					<Tabs.Trigger value='tab1'>Tab1</Tabs.Trigger>
					<Tabs.Trigger value='tab2'>Tab2</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value='tab1'>
					<div>This is the content for tab 1</div>
				</Tabs.Content>
				<Tabs.Content value='tab2'>
					<div>This is the content for tab 2</div>
				</Tabs.Content>
			</Tabs>
			<InfiniteScroll />
		</div>
	);
}

export default App;

/* <TabsAccordion defaultValue='account'>
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
			</TabsAccordion> */
