"use client";

import { supabase } from "@/lib/lib/supabaseClient";

import { startTransition, useEffect, useState, useMemo } from "react";
import {
    Bell,
    Download,
    ListFilter,
    Plus,
    Search,
    SquarePen,
    Trash2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
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
import Link from "next/link";
import { useSetBreadcrumbs } from "@/lib/stores/breadcrumb-store";
import {
    format,
    subDays,
    isSameDay,
    isSameWeek,
    isSameMonth,
    startOfDay,
} from "date-fns";

interface RequestItem {
    id: string;
    department: string;
    items: string;
    category: string;
    orderLevels: string;
    status: "Approved" | "Cancelled" | "Pending";
    date: Date;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "Approved":
            return "bg-green-50 border-[#CCCCCC] text-[#194D30]";
        case "Cancelled":
            return "bg-red-50 border-[#CCCCCC] text-red-800";
        case "Pending":
            return "bg-yellow-50 border-[#CCCCCC] text-yellow-800";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

export function MyRequest() {
    const [selectedTab, setSelectedTab] = useState("all");
    const [dateRange, setDateRange] = useState("month");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 5;

    const setBreadcrumbs = useSetBreadcrumbs();







    //Fetch all from supabase requisition_table
    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            
                const { data, error } = await supabase
                    .from("requisition_table")
                    .select(`
                        id,
                        items,
                        order_level,
                        status,
                        created_at,
                        department:requisition_department(name),
                        category:requisition_requisition_type(name)
                    `)
                    .order('created_at', { ascending: false });

                

            if (error) {
                console.error("Error fetching requisitions:", error);
                setRequests([]);
            } else if (data) {
                const formatted: RequestItem[] = data.map((d: any) => {
               
                    const rawStatus = (d.status ?? "").toString().trim().toLowerCase();
                    let status: "Approved" | "Pending" | "Cancelled" = "Pending";

                    if (rawStatus === "approve") status = "Approved";   
                    else if (rawStatus === "pending") status = "Pending";
                    else if (rawStatus === "cancelled") status = "Cancelled";

                    return {
                        id: d.id,
                        items: d.items,
                        orderLevels: d.order_level,
                        status,
                        date: new Date(d.created_at),
                        department: d.department?.name || "N/A",
                        category: d.category?.name || "N/A",
                    };
                });
                setRequests(formatted);
            }
            setLoading(false);
        };

        fetchRequests();
    }, []);






    //Delete from supabase by row id
    const handleDelete = async (id: string) => {
    const { error } = await supabase
        .from("requisition_table")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
    } else {

        setRequests(prev => prev.filter(item => item.id !== id));
    }
    };






    // Derived lists for filters
    const uniqueDepartments = useMemo(() => Array.from(new Set(requests.map(item => item.department))), [requests]);
    const uniqueCategories = useMemo(() => Array.from(new Set(requests.map(item => item.category))), [requests]);

    // Filter Logic
    const filteredData = useMemo(() => {
        return requests.filter((item) => {
            // Status Filter
            if (selectedTab !== "all" && item.status.toLowerCase() !== selectedTab.toLowerCase()) {
                return false;
            }

            // Date Filter
            const itemDate = item.date;
            if (dateRange === "day") {
                if (!isSameDay(itemDate, new Date())) return false;
            } else if (dateRange === "week") {
                if (!isSameWeek(itemDate, new Date())) return false;
            } else if (dateRange === "month") {
                if (!isSameMonth(itemDate, new Date())) return false;
            }

            // Department Filter
            if (selectedDepartments.length > 0 && !selectedDepartments.includes(item.department)) {
                return false;
            }

            // Category Filter
            if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
                return false;
            }

            return true;
        });
    }, [requests, selectedTab, dateRange, selectedDepartments, selectedCategories]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedTab, dateRange, selectedDepartments, selectedCategories]);

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
        { id: "approved", label: "Approved", count: requests.filter(item => item.status === "Approved").length },
        { id: "pending", label: "Pending", count: requests.filter(item => item.status === "Pending").length },
        { id: "cancelled", label: "Cancelled", count: requests.filter(item => item.status === "Cancelled").length },
    ];

    const handleExport = () => {
        const headers = ["ID", "Date", "Department", "Items", "Category", "Order Levels", "Status"];
        const csvContent = [
            headers.join(","),
            ...filteredData.map(item => [
                item.id,
                format(item.date, "yyyy-MM-dd"),
                `"${item.department}"`,
                `"${item.items}"`,
                `"${item.category}"`,
                `"${item.orderLevels}"`,
                item.status
            ].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "my_requests.csv");
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Set breadcrumbs
    useEffect(() => {
        startTransition(() => {
            setBreadcrumbs([
                { href: "/dashboard", label: "Requisition" },
                { href: "/requisition/my-requests", label: "My Requests" },
            ]);
        });
    }, [setBreadcrumbs]);

    if (loading) {
        return <div className="p-6 text-center text-gray-500">Loading requests...</div>;
    }

    return (
        <div style={{ fontFamily: "Poppins" }}>
            <div className="bg-white shadow-sm rounded-lg">
                {/* Tabs and Actions */}
                <div className="px-6 py-7 ">
                    <div className="flex border-b border-gray-200 pb-3 items-center justify-between mb-4">
                        <div className="flex items-center gap-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`pb-2 text-sm font-medium transition-colors relative ${selectedTab === tab.id
                                        ? "text-neutral-black"
                                        : "text-[#919191]"
                                        }`}
                                >
                                    {tab.label}
                                    {tab.count && (
                                        <span className="ml-1">
                                            ({tab.count})
                                        </span>
                                    )}
                                    {selectedTab === tab.id && (
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500">
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className={`text-orange-500 hover:bg-orange-50 ${selectedDepartments.length > 0 || selectedCategories.length > 0 ? "bg-orange-50" : ""}`}
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
                                                            id={`cat-${cat}`}
                                                            checked={selectedCategories.includes(cat)}
                                                            onCheckedChange={() => handleCategoryToggle(cat)}
                                                        />
                                                        <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer">
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

                    {/* Date Range */}
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex gap-2">
                            {["Day", "Week", "Month"].map((range) => (
                                <Button
                                    key={range}
                                    variant={dateRange === range.toLowerCase()
                                        ? "default"
                                        : "outline"}
                                    style={{ width: "110px", height: "35px" }}
                                    onClick={() =>
                                        setDateRange(range.toLowerCase())}
                                    className={dateRange === range.toLowerCase()
                                        ? "bg-gray-800 text-white"
                                        : "border-gray-200"}
                                >
                                    {range}
                                </Button>
                            ))}
                        </div>

                        <div className="flex items-center gap-1">
                            <Button
                                variant="ghost"
                                className="text-[#666666] bg-[#F2F2F2] border border-[#E6E6E6]"
                            >
                                {"<"}
                            </Button>
                            <Button
                                style={{
                                    fontSize: "14px",
                                    fontWeight: "400",
                                    lineHeight: "20px",
                                }}
                                className="bg-[#F4F5F7] text-[#666666]"
                            >
                                Today
                            </Button>
                            <Button
                                variant="ghost"
                                className="text-[#666666] bg-[#F2F2F2] border border-[#E6E6E6]"
                            >
                                {">"}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="px-6 py-4 overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F2F2F2]">
                            <tr>
                                <th
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        lineHeight: "100%",
                                    }}
                                    className="text-center py-4 px-4 text-[#262626] rounded-tl-lg"
                                >
                                    ID
                                </th>
                                <th
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        lineHeight: "100%",
                                    }}
                                    className="text-center py-4 px-4 text-[#262626]"
                                >
                                    Date
                                </th>
                                <th
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        lineHeight: "100%",
                                    }}
                                    className="text-center py-4 px-4 text-[#262626]"
                                >
                                    Department
                                </th>
                                <th
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        lineHeight: "100%",
                                    }}
                                    className="text-center py-4 px-4 text-[#262626]"
                                >
                                    Items
                                </th>
                                <th
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        lineHeight: "100%",
                                    }}
                                    className="text-center py-4 px-4 text-[#262626]"
                                >
                                    Requisition Type 
                                </th>
                                <th
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        lineHeight: "100%",
                                    }}
                                    className="text-center py-4 px-4 text-[#262626]"
                                >
                                    Order Levels
                                </th>
                                <th
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        lineHeight: "100%",
                                    }}
                                    className="text-center py-4 px-4 text-[#262626]"
                                >
                                    Status
                                </th>
                                <th
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        lineHeight: "100%",
                                        
                                    }}
                                    className="text-center py-4 px-4 text-[#262626] rounded-tr-lg"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className={`hover:bg-gray-50 ${idx % 2 === 0
                                        ? "bg-white"
                                        : "bg-[#F4F5F7]"
                                        }`}
                                >
                                    <td
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "400",
                                        }}
                                        className="py-3 px-4 text-[#5B5B5B] text-center"
                                    >
                                        {"#" + item.id.slice(0, 8)}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "400",
                                        }}
                                        className="py-3 px-4 text-[#5B5B5B] text-center"
                                    >
                                        {format(item.date, "dd MMM yyyy")}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "400",
                                        }}
                                        className="py-3 px-4 text-[#5B5B5B] text-center"
                                    >
                                        {item.department}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "400",
                                        }}
                                        className="py-3 px-4 text-neutral-black text-center"
                                    >
                                        {item.items}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "400",
                                        }}
                                        className="py-3 px-4 text-neutral-black text-center"
                                    >
                                        {item.category}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: "12px",
                                            fontWeight: "400",
                                        }}
                                        className="py-3 px-4 text-neutral-black text-center"
                                    >
                                        {item.orderLevels}
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <span
                                            className={`inline-block w-[94px] text-center px-3 py-2 text-xs ${getStatusColor(
                                                item.status,
                                            )
                                                }`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex items-center gap-3">
                                            <SquarePen className="w-4 h-4" />
                                            {/* <Trash2 className="w-4 h-4 cursor-pointer" /> */}
                                             <Trash2
                                                    className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-600"
                                                    onClick={() => handleDelete(item.id)}
                                                />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-8 text-center text-gray-500 text-sm">
                                        No requests found for the selected filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
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

                        {/* Simple page numbers */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            // Logic to show a window of pages could go here, for now just show first 5 or logic around current
                            // Simplified for demo:
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
            </div>
        </div>
    );
}
