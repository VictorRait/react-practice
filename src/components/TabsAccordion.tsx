// import { createContext, useContext, useState } from "react";

// type TabsContextType = {
// 	activeTab: string;
// 	setActiveTab: (val: string) => void;
// };

// const TabsContext = createContext<TabsContextType | null>(null);

// function useTabs() {
// 	const context = useContext(TabsContext);

// 	if (!context) throw new Error("Used tabs out of context");

// 	return context;
// }

// type ContentProps = {
// 	value: string;
// 	children: React.ReactNode;
// };

// type TriggerProps = {
// 	value: string;
// 	children: React.ReactNode;
// };
// function TabsAccordion({
// 	defaultValue,
// 	children,
// }: {
// 	defaultValue: string;
// 	children: React.ReactNode;
// }) {
// 	const [activeTab, setActiveTab] = useState(defaultValue);

// 	return (
// 		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
// 			<div className='w-[400px]'>{children}</div>
// 		</TabsContext.Provider>
// 	);
// }

// function List({ children }: { children: React.ReactNode }) {
// 	return (
// 		<div className='relative flex  border w-fit border-b-0 border-slate-400 z-10 1 bg-white -mb-[1px]'>
// 			{children}
// 		</div>
// 	);
// }

// function Content({ value, children }: ContentProps) {
// 	const { activeTab } = useTabs();

// 	if (activeTab !== value) return;

// 	return (
// 		<div className=' border border-slate-400 w-full p-2 bg-amber-50 z-0'>
// 			{children}
// 		</div>
// 	);
// }

// function Trigger({ value, children }: TriggerProps) {
// 	const { activeTab, setActiveTab } = useTabs();

// 	return (
// 		<button
// 			className={`px-2  ${activeTab === value ? "border border-amber-300 bg-amber-50 text-amber-700" : "bg-slate-200"}`}
// 			onClick={() => setActiveTab(value)}>
// 			{children}
// 		</button>
// 	);
// }

// TabsAccordion.List = List;
// TabsAccordion.Content = Content;
// TabsAccordion.Trigger = Trigger;

// export default TabsAccordion;
