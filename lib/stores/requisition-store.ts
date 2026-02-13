import { create } from 'zustand';
import { startOfDay, subDays } from 'date-fns';

export interface RequestItem {
    id: string;
    department: string;
    items: string;
    category: string;
    orderLevels: string;
    status: "Approved" | "Cancelled" | "Pending";
    date: Date;
}

interface RequisitionStore {
    requests: RequestItem[];
    addRequest: (request: RequestItem) => void;
}

// Initial Mock Data
const today = startOfDay(new Date());
const yesterday = subDays(today, 1);
const lastWeek = subDays(today, 5);
const lastMonth = subDays(today, 20);
const twoMonthsAgo = subDays(today, 40);

const initialRequests: RequestItem[] = [
    {
        id: "#1023",
        department: "Kitchen",
        items: "Fresh Vegetables +4",
        category: "Inventory Items",
        orderLevels: "25 kg",
        status: "Approved",
        date: today,
    },
    {
        id: "#1024",
        department: "Kitchen",
        items: "Fresh Vegetables +4",
        category: "Inventory Items",
        orderLevels: "25 kg",
        status: "Approved",
        date: yesterday,
    },
    {
        id: "#1033",
        department: "IT",
        items: "Mouse",
        category: "Non-Inventory Items",
        orderLevels: "5 kg",
        status: "Cancelled",
        date: lastWeek,
    },
    {
        id: "#1034",
        department: "Housekeeping",
        items: "Tissue, Air Freshener +3",
        category: "Inventory Items",
        orderLevels: "50 kilo",
        status: "Cancelled",
        date: lastMonth,
    },
    {
        id: "#1035",
        department: "Kitchen",
        items: "Fresh Vegetables +4",
        category: "Inventory Items",
        orderLevels: "25 kg",
        status: "Approved",
        date: today,
    },
    {
        id: "#1036",
        department: "Bar",
        items: "Cocktail +20",
        category: "Inventory Items",
        orderLevels: "10 kg",
        status: "Cancelled",
        date: twoMonthsAgo,
    },
    {
        id: "#1037",
        department: "Housekeeping",
        items: "Tissue, Air Freshener +3",
        category: "Inventory Items",
        orderLevels: "50 kilo",
        status: "Cancelled",
        date: today,
    },
    {
        id: "#1038",
        department: "Logistics",
        items: "Diesel",
        category: "10 Packs",
        orderLevels: "10 packs",
        status: "Pending",
        date: today,
    },
    {
        id: "#1039",
        department: "Maintenance",
        items: "Oil",
        category: "20 Packs",
        orderLevels: "20 packs",
        status: "Cancelled",
        date: yesterday,
    },
    {
        id: "#1040",
        department: "Kitchen",
        items: "Tomatoes, Oil +10",
        category: "25 litres",
        orderLevels: "25 litres",
        status: "Pending",
        date: lastWeek,
    },
    {
        id: "#1041",
        department: "Logistics",
        items: "Diesel",
        category: "10 Packs",
        orderLevels: "10 packs",
        status: "Pending",
        date: lastMonth,
    },
    {
        id: "#1042",
        department: "Human Resource",
        items: "Mouse Pad",
        category: "30 kilo",
        orderLevels: "30 kilo",
        status: "Pending",
        date: twoMonthsAgo,
    },
    {
        id: "#1043",
        department: "Logistics",
        items: "Diesel",
        category: "10 Packs",
        orderLevels: "10 packs",
        status: "Pending",
        date: today,
    },
    {
        id: "#1044",
        department: "Kitchen",
        items: "Tomatoes, Oil +10",
        category: "25 litres",
        orderLevels: "25 litres",
        status: "Pending",
        date: yesterday,
    },
    {
        id: "#1045",
        department: "Kitchen",
        items: "Tomatoes, Oil +10",
        category: "25 litres",
        orderLevels: "25 litres",
        status: "Pending",
        date: lastWeek,
    },
    {
        id: "#1046",
        department: "Kitchen",
        items: "Tomatoes, Oil +10",
        category: "25 litres",
        orderLevels: "25 litres",
        status: "Pending",
        date: lastMonth,
    },
];

export const useRequisitionStore = create<RequisitionStore>((set) => ({
    requests: initialRequests,
    addRequest: (request) => set((state) => ({ requests: [request, ...state.requests] })),
}));
