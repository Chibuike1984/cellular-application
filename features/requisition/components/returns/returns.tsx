"use client";

import { startTransition, useEffect, useState, useMemo } from "react";
import {
    Bell,
    Download,
    ListFilter,
    Plus,
    Search,
    SquarePen,
    Trash2,
    ChevronRight,
    ChevronLeft,
} from "lucide-react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { DeleteDialog } from "@/components/shared/delete-dialog";
import { ApproveRequestDialog } from "@/components/shared/approve-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import Link from "next/link";
import { useSetBreadcrumbs } from "@/lib/stores/breadcrumb-store";
import {
    format,
    subDays,
    isSameDay,
    isSameWeek,
    isSameMonth,
} from "date-fns";

interface RequestItem {
    id: string;
    date: Date;
    returnedBy: string;
    category: string;
    itemsCount: number;
    value: number;
    priority: "High" | "Medium" | "Low";
    department: string;
    approvedBy: string;
    approvalDate: Date | null;
    status: "Approved" | "Pending" | "Disapproved";
    notes: string;
}

const STATIC_REQUESTS: RequestItem[] = [
    {
        id: "RET-001",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-002",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-003",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-004",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-005",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-006",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-007",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-008",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-009",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-010",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-011",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-012",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-013",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-014",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-015",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-016",
        date: new Date(),
        returnedBy: "Adebayo Olawale",
        category: "Cleaning Supplies",
        itemsCount: 12,
        value: 25000,
        priority: "High",
        department: "Housekeeping",
        approvedBy: "John Doe",
        approvalDate: new Date(),
        status: "Approved",
        notes: "Excess stock return"
    },
    {
        id: "RET-002",
        date: subDays(new Date(), 1),
        returnedBy: "Sarah Johnson",
        category: "Kitchen Equipment",
        itemsCount: 2,
        value: 145000,
        priority: "Medium",
        department: "Kitchen",
        approvedBy: "Jane Smith",
        approvalDate: new Date(),
        status: "Pending",
        notes: "Damaged on arrival"
    },
    {
        id: "RET-003",
        date: subDays(new Date(), 2),
        returnedBy: "Michael Chen",
        category: "Office Stationery",
        itemsCount: 50,
        value: 12000,
        priority: "Low",
        department: "Administration",
        approvedBy: "Pending",
        approvalDate: null,
        status: "Pending",
        notes: "Wrong item ordered"
    },
    {
        id: "RET-004",
        date: subDays(new Date(), 3),
        returnedBy: "Emeka Obi",
        category: "Food & Beverage",
        itemsCount: 5,
        value: 85000,
        priority: "High",
        department: "Restaurant",
        approvedBy: "Samuel Green",
        approvalDate: subDays(new Date(), 1),
        status: "Approved",
        notes: "Near expiry"
    },
    {
        id: "RET-005",
        date: subDays(new Date(), 4),
        returnedBy: "Fatima Yusuf",
        category: "Linens",
        itemsCount: 10,
        value: 150000,
        priority: "Medium",
        department: "Housekeeping",
        approvedBy: "Rejected",
        approvalDate: subDays(new Date(), 2),
        status: "Disapproved",
        notes: "Past return window"
    }
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Approved":
            return "text-green-700";
        case "Pending":
            return "text-yellow-700";
        case "Disapproved":
            return "text-red-700";
        case "Draft":
            return "text-neutral-black";
        default:
            return "text-gray-700";
    }
};

const getDotColor = (status: string) => {
    switch (status) {
        case "Approved":
            return "bg-green-700";
        case "Pending":
            return "bg-yellow-700";
        case "Disapproved":
            return "bg-red-700";
        case "Draft":
            return "bg-neutral-black";
        default:
            return "bg-gray-700";
    }
};

function MyRequestSkeleton() {
    return (
        <div style={{ fontFamily: "Poppins" }}>
            <div className="bg-white shadow-sm rounded-lg">
                <div className="px-6 py-7">
                    <div className="flex border-b border-gray-200 pb-3 items-center justify-between mb-4">
                        <div className="flex items-center gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="h-4 w-16" />
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-9 w-9" />
                            <Skeleton className="h-9 w-[105px]" />
                            <Skeleton className="h-9 w-[120px]" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <Skeleton key={i} className="h-[35px] w-[110px]" />
                            ))}
                        </div>
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-9 w-9" />
                            <Skeleton className="h-9 w-20" />
                            <Skeleton className="h-9 w-9" />
                        </div>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <div className="w-full border rounded-lg overflow-hidden">
                        <div className="bg-[#F2F2F2] h-12 flex items-center px-4 gap-4">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <Skeleton key={i} className="h-4 flex-1" />
                            ))}
                        </div>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <div key={row} className="h-12 flex items-center px-4 gap-4 border-t border-gray-100">
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
                                    <Skeleton key={col} className="h-3 flex-1" />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Returns() {
    const [selectedTab, setSelectedTab] = useState("all");
    const [dateRange, setDateRange] = useState("month");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Dropdown Filter States
    const [selectedPriorityDropdown, setSelectedPriorityDropdown] = useState("all");
    const [selectedCategoryDropdown, setSelectedCategoryDropdown] = useState("all");
    const [selectedDepartmentDropdown, setSelectedDepartmentDropdown] = useState("all");
    const [selectedReturnedByDropdown, setSelectedReturnedByDropdown] = useState("all");
    const [selectedApprovedByDropdown, setSelectedApprovedByDropdown] = useState("all");

    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [approveDialogOpen, setApproveDialogOpen] = useState(false);
    const [selectedRequestForApproval, setSelectedRequestForApproval] = useState<RequestItem | null>(null);

    const itemsPerPage = 10;
    const setBreadcrumbs = useSetBreadcrumbs();

    useEffect(() => {
        const timer = setTimeout(() => {
            setRequests(STATIC_REQUESTS);
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const confirmDelete = () => {
        if (!itemToDelete) return;
        setRequests(prev => prev.filter(item => item.id !== itemToDelete));
        setDeleteDialogOpen(false);
        setItemToDelete(null);
    };

    const handleDeleteClick = (id: string) => {
        setItemToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleApproveClick = (item: RequestItem) => {
        setSelectedRequestForApproval(item);
        setApproveDialogOpen(true);
    };

    const handleApproveSubmit = (items: any[]) => {
        // Here you would typically send the data to Supabase
        console.log("Submitting approval for items:", items);
        setApproveDialogOpen(false);
    };

    const uniqueReturnedBy = useMemo(() => Array.from(new Set(requests.map(item => item.returnedBy))), [requests]);
    const uniqueCategories = useMemo(() => Array.from(new Set(requests.map(item => item.category))), [requests]);
    const uniqueDepartments = useMemo(() => Array.from(new Set(requests.map(item => item.department))), [requests]);
    const uniquePriorities = useMemo(() => Array.from(new Set(requests.map(item => item.priority))), [requests]);
    const uniqueApprovedBy = useMemo(() => Array.from(new Set(requests.map(item => item.approvedBy))), [requests]);
    const uniqueStatuses = useMemo(() => Array.from(new Set(requests.map(item => item.status))), [requests]);

    const filteredData = useMemo(() => {
        return requests.filter((item) => {
            // Tab filter based on Status
            if (selectedTab !== "all" && item.status !== selectedTab) {
                return false;
            }

            // Dropdown filters
            if (selectedPriorityDropdown !== "all" && item.priority !== selectedPriorityDropdown) return false;
            if (selectedCategoryDropdown !== "all" && item.category !== selectedCategoryDropdown) return false;
            if (selectedDepartmentDropdown !== "all" && item.department !== selectedDepartmentDropdown) return false;
            if (selectedReturnedByDropdown !== "all" && item.returnedBy !== selectedReturnedByDropdown) return false;
            if (selectedApprovedByDropdown !== "all" && item.approvedBy !== selectedApprovedByDropdown) return false;

            const itemDate = item.date;
            if (dateRange === "day" && !isSameDay(itemDate, new Date())) return false;
            if (dateRange === "week" && !isSameWeek(itemDate, new Date())) return false;
            if (dateRange === "month" && !isSameMonth(itemDate, new Date())) return false;

            if (selectedDepartments.length > 0 && !selectedDepartments.includes(item.department)) return false;
            if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) return false;

            return true;
        });
    }, [requests, selectedTab, dateRange, selectedDepartments, selectedCategories, selectedPriorityDropdown, selectedCategoryDropdown, selectedDepartmentDropdown, selectedReturnedByDropdown, selectedApprovedByDropdown]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTab, dateRange, selectedDepartments, selectedCategories, selectedPriorityDropdown, selectedCategoryDropdown, selectedDepartmentDropdown, selectedReturnedByDropdown, selectedApprovedByDropdown]);

    const handleDepartmentToggle = (dept: string) => {
        setSelectedDepartments(prev =>
            prev.includes(dept) ? prev.filter(d => d !== dept) : [...prev, dept]
        );
    };

    const handleCategoryToggle = (cat: string) => {
        setSelectedCategories(prev =>
            prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
        );
    };

    const tabs = [
        { id: "all", label: "All", count: requests.length },
        { id: "Approved", label: "Approved", count: requests.filter(item => item.status === "Approved").length },
        { id: "Pending", label: "Pending", count: requests.filter(item => item.status === "Pending").length },
    ];

    const handleExport = () => {
        const headers = ["Return ID", "Date Initiated", "Returned By", "Category", "Items", "Value(NGN)", "Priority", "Department", "Approved By", "Status"];
        const csvContent = [
            headers.join(","),
            ...filteredData.map(item => [
                item.id,
                format(item.date, "yyyy-MM-dd"),
                `"${item.returnedBy}"`,
                `"${item.category}"`,
                item.itemsCount,
                item.value,
                item.priority,
                `"${item.department}"`,
                `"${item.approvedBy}"`,
                item.status
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "departmental_requests.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    useEffect(() => {
        startTransition(() => {
            setBreadcrumbs([
                { href: "/dashboard", label: "Requisition" },
                { href: "/requisition/returns", label: "Returns" },
            ]);
        });
    }, [setBreadcrumbs]);

    if (loading) {
        return <MyRequestSkeleton />;
    }

    return (
        <div style={{ fontFamily: "Poppins" }}>
            <div className="bg-white shadow-sm rounded-lg">
                {/* Tabs and Actions Header */}
                <div className="px-6 py-7">
                    <div className="flex border-b border-gray-200 pb-3 items-center justify-between mb-4">
                        <div className="flex items-center gap-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`pb-2 text-sm font-medium transition-colors relative ${selectedTab === tab.id ? "text-neutral-black" : "text-[#919191]"
                                        }`}
                                >
                                    {tab.label}
                                    {tab.count !== undefined && <span className="ml-1">({tab.count})</span>}
                                    {selectedTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className={`text-orange-500 hover:bg-orange-50 ${selectedDepartments.length > 0 || selectedCategories.length > 0 ? "bg-orange-50" : ""
                                            }`}
                                    >
                                        <ListFilter className="w-6 h-6" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-4" align="end">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <h4 className="font-medium text-sm text-gray-900">Departments</h4>
                                            <div className="grid gap-2 max-h-40 overflow-y-auto">
                                                {uniqueDepartments.map(dept => (
                                                    <div key={dept} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`dept-${dept}`}
                                                            checked={selectedDepartments.includes(dept)}
                                                            onCheckedChange={() => handleDepartmentToggle(dept)}
                                                        />
                                                        <Label htmlFor={`dept-${dept}`} className="text-sm font-normal cursor-pointer">
                                                            {dept}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-medium text-sm text-gray-900">Categories</h4>
                                            <div className="grid gap-2 max-h-40 overflow-y-auto">
                                                {uniqueCategories.map(cat => (
                                                    <div key={cat} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={`category-${cat}`}
                                                            checked={selectedCategories.includes(cat)}
                                                            onCheckedChange={() => handleCategoryToggle(cat)}
                                                        />
                                                        <Label htmlFor={`category-${cat}`} className="text-sm font-normal cursor-pointer">
                                                            {cat}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        {(selectedDepartments.length > 0 || selectedCategories.length > 0) && (
                                            <Button
                                                variant="ghost"
                                                className="w-full text-xs text-red-500 hover:text-red-600 h-8"
                                                onClick={() => {
                                                    setSelectedDepartments([]);
                                                    setSelectedCategories([]);
                                                }}
                                            >
                                                Clear Filters
                                            </Button>
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-[105px] h-[35px] text-[#3E3E3E] border border-[#CCCCCC] hover:text-gray-900"
                                onClick={handleExport}
                            >
                                <Download className="w-4 h-4 mr-1" />
                                Export
                            </Button>
                            <Link href="/dashboard/requisition/raise-requisition">
                                <Button
                                    size="sm"
                                    className="bg-orange-500 text-white hover:bg-orange-600 gap-1"
                                >
                                    <Plus className="w-4 h-4 stroke-3" />
                                    Raise Request
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Filter Bar with Selectors and Navigation */}
                    <div className="flex justify-between items-center gap-4 bg-[#F9FAFB] border border-gray-100 p-3">
                        <div className="flex flex-wrap gap-4">
                            <Select value={selectedPriorityDropdown} onValueChange={setSelectedPriorityDropdown}>
                                <SelectTrigger className="w-[150px] h-[35px] border-gray-200 bg-white">
                                    <SelectValue placeholder="Priority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Priority</SelectItem>
                                    {uniquePriorities.map(p => (
                                        <SelectItem key={p} value={p}>{p}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedCategoryDropdown} onValueChange={setSelectedCategoryDropdown}>
                                <SelectTrigger className="w-[150px] h-[35px] border-gray-200 bg-white">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Category</SelectItem>
                                    {uniqueCategories.map(c => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedDepartmentDropdown} onValueChange={setSelectedDepartmentDropdown}>
                                <SelectTrigger className="w-[150px] h-[35px] border-gray-200 bg-white">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Department</SelectItem>
                                    {uniqueDepartments.map(d => (
                                        <SelectItem key={d} value={d}>{d}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedReturnedByDropdown} onValueChange={setSelectedReturnedByDropdown}>
                                <SelectTrigger className="w-[150px] h-[35px] border-gray-200 bg-white">
                                    <SelectValue placeholder="Returned By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Returned By</SelectItem>
                                    {uniqueReturnedBy.map(name => (
                                        <SelectItem key={name} value={name}>{name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedApprovedByDropdown} onValueChange={setSelectedApprovedByDropdown}>
                                <SelectTrigger className="w-[150px] h-[35px] border-gray-200 bg-white">
                                    <SelectValue placeholder="Approved By" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Approved By</SelectItem>
                                    {uniqueApprovedBy.map(name => (
                                        <SelectItem key={name} value={name}>{name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#666666] bg-[#F2F2F2] border border-[#E6E6E6]"
                            >
                                {"<"}
                            </Button>
                            <Button
                                size="sm"
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    lineHeight: "20px",
                                }}
                                className="bg-[#F4F5F7] text-[#666666] hover:bg-[#EAEBED]"
                            >
                                Today
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#666666] bg-[#F2F2F2] border border-[#E6E6E6]"
                            >
                                {">"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="px-6 py-4 overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F2F2F2]">
                            <tr>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626] rounded-tl-lg">Return ID</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626]">Items</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626]">Approved By</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626]">Returned By</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626]">Department</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626]">Date Initiated</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626]">Value</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626]">Status</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626]">Category</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626]">Notes</th>
                                <th style={{ fontSize: "12px", fontWeight: "600", lineHeight: "100%" }} className="text-center py-4 px-4 text-[#262626] rounded-tr-lg">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, idx) => (
                                <tr
                                    key={item.id}
                                    className={`hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-[#F4F5F7]"}`}
                                >
                                    <td style={{ fontSize: "12px", fontWeight: "400" }} className="py-3 px-4 text-[#5B5B5B] text-center">
                                        {item.id}
                                    </td>
                                    <td style={{ fontSize: "12px", fontWeight: "400" }} className="py-3 px-4 text-[#5B5B5B] text-center text-nowrap">
                                        {item.itemsCount} Items
                                    </td>
                                    <td style={{ fontSize: "12px", fontWeight: "400" }} className="py-3 px-4 text-[#5B5B5B] text-center">
                                        {item.approvedBy}
                                    </td>
                                    <td style={{ fontSize: "12px", fontWeight: "400" }} className="py-3 px-4 text-neutral-black text-center">
                                        {item.returnedBy}
                                    </td>
                                    <td style={{ fontSize: "12px", fontWeight: "400" }} className="py-3 px-4 text-neutral-black text-center">
                                        {item.department}
                                    </td>
                                    <td style={{ fontSize: "12px", fontWeight: "400" }} className="py-3 px-4 text-neutral-black text-center">
                                        {format(item.date, "dd MMM yyyy")}
                                    </td>
                                    <td style={{ fontSize: "12px", fontWeight: "400" }} className="py-3 px-4 text-neutral-black text-center">
                                        {new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(item.value)}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex justify-center">
                                            <span className={`inline-flex items-center justify-center gap-1.5 text-nowrap h-[32px] text-center px-3 py-2 text-xs border border-[#CCCCCC] rounded-full ${getStatusColor(item.status)}`}>
                                                <span className={`w-2 h-2 rounded-full ${getDotColor(item.status)}`}></span>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ fontSize: "12px", fontWeight: "400" }} className="py-3 px-4 text-neutral-black text-center">
                                        {item.category}
                                    </td>
                                    <td style={{ fontSize: "12px", fontWeight: "400" }} className="py-3 px-4 text-neutral-black text-center">
                                        {item.notes}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex items-center gap-3 justify-center">
                                            <SquarePen
                                                className="w-4 h-4 cursor-pointer text-blue-500 hover:text-blue-600"
                                                onClick={() => handleApproveClick(item)}
                                            />
                                            <Trash2
                                                className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-600"
                                                onClick={() => handleDeleteClick(item.id)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={12} className="py-8 text-center text-gray-500 text-sm">
                                        No requests found for the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                        Page {currentPage} of {Math.max(1, totalPages)}
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-600 bg-transparent"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                        </Button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let p = i + 1;
                            if (totalPages > 5 && currentPage > 3) {
                                p = currentPage - 3 + i;
                            }
                            if (p > totalPages) return null;

                            return (
                                <Button
                                    key={p}
                                    size="sm"
                                    variant={currentPage === p ? "default" : "outline"}
                                    onClick={() => setCurrentPage(p)}
                                    className={currentPage === p ? "bg-orange-500 text-white hover:bg-orange-600" : "text-gray-600 bg-transparent"}
                                >
                                    {p}
                                </Button>
                            );
                        })}

                        <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-600 bg-transparent"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                    </div>
                </div>

                <DeleteDialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                    onConfirm={confirmDelete}
                />

                {selectedRequestForApproval && (
                    <ApproveRequestDialog
                        key={selectedRequestForApproval.id}
                        open={approveDialogOpen}
                        onOpenChange={setApproveDialogOpen}
                        onSubmit={handleApproveSubmit}
                        requestId={selectedRequestForApproval.id}
                        requestedBy={selectedRequestForApproval.returnedBy}
                        date={format(selectedRequestForApproval.date, "yyyy-MM-dd")}
                        viewType="return"
                        // Mocking initial items for demonstration
                        initialItems={[
                            {
                                id: "1",
                                itemName: "Cleaning Supplies",
                                sku: "CS-001",
                                category: "Cleaning",
                                currentStock: "0",
                                reorderLevel: "0",
                                reqQty: "12",
                                urgency: "High",
                                reason: "Excess stock from previous project",
                                action: "pending",
                                notes: ""
                            }
                        ]}
                    />
                )}
            </div>
        </div>
    );
}