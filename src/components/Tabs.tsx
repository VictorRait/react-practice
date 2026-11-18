import { createContext, useContext, useState, type SetStateAction } from "react";

type TabsType = {
	defaultValue: string;
	children: React.ReactNode;
};

type TabsContextType = {
	activeTab: string;
	setActiveTab: React.Dispatch<SetStateAction<string>>;
};

const TabsContext = createContext<TabsContextType | null>(null);

function useTabs() {
	const context = useContext(TabsContext);

	if (!context) throw new Error("Used context out of tabs");

	return context;
}

function Tabs({ defaultValue, children }: TabsType) {
	const [activeTab, setActiveTab] = useState(defaultValue);

	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>
			<div>{children}</div>
		</TabsContext.Provider>
	);
}

function TabsList({ children }: { children: React.ReactNode }) {
	return <div className='flex gap-2'>{children}</div>;
}

function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
	const { activeTab } = useTabs();

	if (value !== activeTab) return;

	return <div>{children}</div>;
}

function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
	const { setActiveTab } = useTabs();

	return <div onClick={() => setActiveTab(value)}>{children}</div>;
}

Tabs.List = TabsList;
Tabs.Content = TabsContent;
Tabs.Trigger = TabsTrigger;

export default Tabs;
