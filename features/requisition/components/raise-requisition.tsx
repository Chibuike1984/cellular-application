"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertTriangle,
    ArrowLeft,
    CalendarDays,
    Clock,
    Cpu,
    FileText,
    Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddItemsPanel } from "./add-items-panel";
import { PurchaseRequestTable } from "./purchase-request-table";
import { HRRequestForm } from "./hr-request-form";
import { FinanceRequestForm } from "./finance-request-form";
import { ITRequestForm } from "./it-request-form";
import { StarBadgeIcon } from "@features/assets/react-icon/inventory-requisition-icon";
import { SignalIcon } from "@features/assets/react-icon/human-resource-icon";
import { CameraIcon } from "@features/assets/react-icon/finance-icon";
import { MobileTableIcon } from "@features/assets/react-icon/it-icon";
import { ShieldUserIcon } from "@features/assets/react-icon/admin-icon";
import { CopyIcon } from "@features/assets/react-icon/request-icon";
import { FunnelIcon } from "@features/assets/react-icon/supplies-icon";
import { EditLinkIcon } from "@features/assets/react-icon/repair-icon";
import { MobileDeviceIcon } from "@features/assets/react-icon/kitchen-icon";
import { SupportIcon } from "@features/assets/react-icon/access-icon";
import Link from "next/link";
import { useRequisitionStore } from "@/lib/stores/requisition-store";

interface RequisitionItem {
    id: string;
    itemName: string;
    currentStock?: string;
    reorderLevel?: string;
    requestedQty: string;
    unit: string;
    urgency: "High" | "Medium" | "Low";
    notes: string;
}

interface DepartmentTab {
    id: string;
    label: string;
    icon: ReactNode;
}

const departments: DepartmentTab[] = [
    { id: "inventory", label: "Inventory", icon: <StarBadgeIcon /> },
    { id: "kitchen", label: "Kitchen", icon: <MobileDeviceIcon /> },
    { id: "maintenance", label: "Maintenance", icon: <Settings /> },
    { id: "hr", label: "Human Resource", icon: <SignalIcon /> },
    { id: "finance", label: "Accounts / Finance", icon: <CameraIcon /> },
    { id: "it", label: "IT Department", icon: <MobileTableIcon /> },
    { id: "admin", label: "Management / Admin", icon: <ShieldUserIcon /> },
];

const requisitionTypesByDepartment: Record<
    string,
    Array<{ id: string; label: string; icon: ReactNode }>
> = {
    inventory: [
        {
            id: "inventory-req",
            label: "Inventory Requisition",
            icon: <StarBadgeIcon />,
        },
        { id: "equipment-req", label: "Equipment Request", icon: <CopyIcon /> },
    ],
    maintenance: [
        {
            id: "office-supplies",
            label: "Office Supplies",
            icon: <FunnelIcon />,
        },
        { id: "equipment-req", label: "Equipment Request", icon: <CopyIcon /> },
        { id: "repair-req", label: "Repair Request", icon: <EditLinkIcon /> },
    ],
    kitchen: [
        {
            id: "inventory-req",
            label: "Inventory Requisition",
            icon: <MobileDeviceIcon />,
        },
    ],
    hr: [
        { id: "leave-req", label: "Leave Request", icon: <CalendarDays /> },
        { id: "permission-req", label: "Permission Request", icon: <Clock /> },
        {
            id: "emergency-absent",
            label: "Emergency Absent",
            icon: <AlertTriangle />,
        },
    ],
    finance: [
        {
            id: "expense-reimb",
            label: "Expense Reimbursement",
            icon: <CalendarDays />,
        },
        { id: "advance-payment", label: "Advance Payment", icon: <Clock /> },
        { id: "petty-cash", label: "Petty Cash Request", icon: <Clock /> },
    ],
    it: [
        {
            id: "equipment-repairs",
            label: "Equipment Repairs",
            icon: <CopyIcon />,
        },
        { id: "software-license", label: "Software License", icon: <Clock /> },
        {
            id: "maintenance-repair",
            label: "Maintenance/Repair",
            icon: <EditLinkIcon />,
        },
        { id: "system-access", label: "System Access", icon: <SupportIcon /> },
        { id: "hardware-upgrade", label: "Hardware Upgrade", icon: <Cpu /> },
    ],
    admin: [{
        id: "inventory-req",
        label: "Inventory Requisition",
        icon: <MobileDeviceIcon />,
    }],
};

export function RaiseRequisition() {
    const router = useRouter();
    const { addRequest } = useRequisitionStore();

    const [selectedDepartment, setSelectedDepartment] = useState<string>(
        "inventory",
    );
    const [selectedRequisitionType, setSelectedRequisitionType] = useState<
        string | null
    >(null);

    const [inventoryItems, setInventoryItems] = useState<RequisitionItem[]>([
        {
            id: "1",
            itemName: "Rice (50kg bags)",
            currentStock: "2 bags",
            reorderLevel: "10 bags",
            requestedQty: "30",
            unit: "Bag",
            urgency: "High",
            notes: "Add",
        },
        {
            id: "2",
            itemName: "Cooking Oil (5L)",
            currentStock: "8 gallons",
            reorderLevel: "20 gallons",
            requestedQty: "20",
            unit: "gallons",
            urgency: "Medium",
            notes: "Add",
        },
    ]);

    const [officeSuppliesItems, setOfficeSuppliesItems] = useState<
        RequisitionItem[]
    >([
        {
            id: "1",
            itemName: "A4 Paper",
            requestedQty: "1",
            unit: "ream",
            urgency: "High",
            notes: "The old refrigerator is not cool enough",
        },
        {
            id: "2",
            itemName: "Biro",
            requestedQty: "2",
            unit: "box",
            urgency: "Medium",
            notes: "The gas is needed for the next week",
        },
    ]);

    const [equipmentItems, setEquipmentItems] = useState<RequisitionItem[]>([
        {
            id: "1",
            itemName: "Refrigerator",
            requestedQty: "1",
            unit: "unit",
            urgency: "High",
            notes: "The old refrigerator is not cool enough",
        },
        {
            id: "2",
            itemName: "Gas",
            requestedQty: "2",
            unit: "unit",
            urgency: "Medium",
            notes: "The gas is needed for the next week",
        },
    ]);

    const [repairItems, setRepairItems] = useState<RequisitionItem[]>([
        {
            id: "1",
            itemName: "Refrigerator",
            requestedQty: "-",
            unit: "-",
            urgency: "High",
            notes: "The old refrigerator is not cool enough",
        },
        {
            id: "2",
            itemName: "Bike",
            requestedQty: "-",
            unit: "-",
            urgency: "Medium",
            notes: "The gas is needed for the next week",
        },
    ]);

    const availableRequisitionTypes =
        requisitionTypesByDepartment[selectedDepartment] || [];

    let currentItems = inventoryItems;
    const isInventoryRequisition = selectedRequisitionType === "inventory-req";
    const isOfficeSupplies = selectedRequisitionType === "office-supplies";
    const isEquipmentRequisition = selectedRequisitionType === "equipment-req";
    const isRepairRequest = selectedRequisitionType === "repair-req";

    if (isInventoryRequisition) {
        currentItems = inventoryItems;
    } else if (isOfficeSupplies) {
        currentItems = officeSuppliesItems;
    } else if (isEquipmentRequisition) {
        currentItems = equipmentItems;
    } else if (isRepairRequest) {
        currentItems = repairItems;
    }

    const handleAddItem = (item: Omit<RequisitionItem, "id">) => {
        const newItem = { ...item, id: Date.now().toString() };
        if (isInventoryRequisition) {
            setInventoryItems([...inventoryItems, newItem]);
        } else if (isOfficeSupplies) {
            setOfficeSuppliesItems([...officeSuppliesItems, newItem]);
        } else if (isEquipmentRequisition) {
            setEquipmentItems([...equipmentItems, newItem]);
        } else if (isRepairRequest) {
            setRepairItems([...repairItems, newItem]);
        }
    };

    const handleRemoveItem = (id: string) => {
        if (isInventoryRequisition) {
            setInventoryItems(inventoryItems.filter((item) => item.id !== id));
        } else if (isOfficeSupplies) {
            setOfficeSuppliesItems(
                officeSuppliesItems.filter((item) => item.id !== id),
            );
        } else if (isEquipmentRequisition) {
            setEquipmentItems(equipmentItems.filter((item) => item.id !== id));
        } else if (isRepairRequest) {
            setRepairItems(repairItems.filter((item) => item.id !== id));
        }
    };

    const handleUpdateItem = (
        id: string,
        updated: Partial<RequisitionItem>,
    ) => {
        if (isInventoryRequisition) {
            setInventoryItems(
                inventoryItems.map((item) =>
                    item.id === id ? { ...item, ...updated } : item
                ),
            );
        } else if (isOfficeSupplies) {
            setOfficeSuppliesItems(
                officeSuppliesItems.map((item) =>
                    item.id === id ? { ...item, ...updated } : item
                ),
            );
        } else if (isEquipmentRequisition) {
            setEquipmentItems(
                equipmentItems.map((item) =>
                    item.id === id ? { ...item, ...updated } : item
                ),
            );
        } else if (isRepairRequest) {
            setRepairItems(
                repairItems.map((item) =>
                    item.id === id ? { ...item, ...updated } : item
                ),
            );
        }
    };

    const isHRDepartment = selectedDepartment === "hr";
    const isFinanceDepartment = selectedDepartment === "finance";
    const isITDepartment = selectedDepartment === "it";
    const usesFormLayout = isHRDepartment || isFinanceDepartment ||
        isITDepartment;

    const handleSubmitRequest = () => {
        if (usesFormLayout) return; // These are handled by their respective forms

        if (currentItems.length === 0) {
            // Can be replaced with a toast notification
            alert("Please add at least one item to the requisition.");
            return;
        }

        const deptLabel = departments.find(d => d.id === selectedDepartment)?.label || "General";
        const typeLabel = availableRequisitionTypes.find(t => t.id === selectedRequisitionType)?.label || "Requisition";

        // Improve item summary
        const itemSummary = currentItems.length > 2
            ? `${currentItems[0].itemName}, ${currentItems[1].itemName} +${currentItems.length - 2} more`
            : currentItems.map(i => i.itemName).join(", ");

        const newRequest = {
            id: `#${Math.floor(Math.random() * 10000)}`,
            department: deptLabel,
            items: itemSummary,
            category: typeLabel,
            orderLevels: "Normal", // Or derive from items' urgency logic
            status: "Pending" as const,
            date: new Date(),
        };

        addRequest(newRequest);
        router.push("/dashboard/my-request");
    };

    return (
        <div>
            <div>
                {/* Header */}
                <Link href="/dashboard/requisition/my-request">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-grey-700 border border-[#CCCCCC] rounded-full bg-white w-23.75 h-9.75 mb-5"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Button>
                </Link>

                <div className="bg-white rounded-tr-md rounded-tl-md p-4 border border-[#E6E6E6]">
                    <div className="flex items-center justify-between mb-5 border-b border-grey-100 pb-4 ">
                        <div className="flex items-center gap-4">
                            <h1
                                style={{
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    lineHeight: "100%",
                                }}
                                className="text-neutral-black"
                            >
                                Raise Requisition
                            </h1>
                        </div>
                        <span
                            style={{
                                fontSize: "12px",
                                fontWeight: "400",
                                lineHeight: "100%",
                            }}
                            className="text-neutral-black"
                        >
                            #PR-2025-0847
                        </span>
                    </div>

                    {/* Department Selection */}
                    <div className="mb-4">
                        <p
                            style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                lineHeight: "100%",
                            }}
                            className="text-[#3E3E3E] mb-3"
                        >
                            Select Department*
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {departments.map((dept) => (
                                <button
                                    key={dept.id}
                                    onClick={() => {
                                        setSelectedDepartment(dept.id);
                                        setSelectedRequisitionType(null);
                                    }}
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "400",
                                        lineHeight: "100%",
                                    }}
                                    className={`px-3 py-1 rounded-lg flex items-center gap-2 ${selectedDepartment === dept.id
                                            ? "bg-orange-25 text-neutral-black border border-grey-200"
                                            : "bg-white border border-grey-200 text-neutral-black hover:border-grey-300"
                                        }`}
                                >
                                    <span
                                        className={`${selectedDepartment === dept.id
                                                ? "bg-orange-500 text-white rounded-md p-1"
                                                : "bg-[#E6E6E6] rounded-md p-1"
                                            }`}
                                    >
                                        {dept.icon}
                                    </span>
                                    {dept.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Requisition Type Selection */}
                    <div className="mb-8">
                        <p
                            style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                lineHeight: "100%",
                            }}
                            className="text-[#3E3E3E] mb-3"
                        >
                            Requisition Type *
                        </p>
                        <div className="flex gap-3">
                            {availableRequisitionTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() =>
                                        setSelectedRequisitionType(type.id)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${selectedRequisitionType === type.id
                                            ? "bg-orange-25 text-neutral-black border border-grey-200"
                                            : "bg-white border border-grey-200 text-neutral-black hover:border-grey-300"
                                        }`}
                                >
                                    <span
                                        className={`${selectedRequisitionType === type.id
                                                ? "bg-orange-500 text-white rounded-md p-1"
                                                : "bg-[#E6E6E6] rounded-md p-1"
                                            }`}
                                    >
                                        {type.icon}
                                    </span>
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Main Content */}
                    {!selectedRequisitionType
                        ? (
                            <div className="flex flex-col items-center justify-center py-24 bg-[#F4F5F7] h-[70vh]">
                                <FileText className="w-12 h-12 text-[#999999] mb-4" />
                                <h2
                                    style={{
                                        fontSize: "24px",
                                        fontWeight: "500",
                                        lineHeight: "100%",
                                    }}
                                    className=" text-[#3E3E3E] mb-2"
                                >
                                    Select Requisition Type
                                </h2>
                                <p
                                    style={{
                                        fontSize: "14px",
                                        fontWeight: "400",
                                        lineHeight: "100%",
                                    }}
                                    className="text-neutral-black"
                                >
                                    Choose a requisition type from the options
                                    above to continue
                                </p>
                            </div>
                        )
                        : usesFormLayout
                            ? (
                                <div className="gap-6 mb-8">
                                    {isHRDepartment && (
                                        <HRRequestForm
                                            requisitionType={selectedRequisitionType}
                                        />
                                    )}
                                    {isFinanceDepartment && (
                                        <FinanceRequestForm
                                            requisitionType={selectedRequisitionType}
                                        />
                                    )}
                                    {isITDepartment && (
                                        <ITRequestForm
                                            requisitionType={selectedRequisitionType}
                                        />
                                    )}
                                </div>
                            )
                            : (
                                <div className="grid grid-cols-3 gap-6 mb-8">
                                    <div className="col-span-1">
                                        <AddItemsPanel
                                            onAddItem={handleAddItem}
                                            requisitionType={selectedRequisitionType}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <PurchaseRequestTable
                                            items={currentItems}
                                            onRemoveItem={handleRemoveItem}
                                            onUpdateItem={handleUpdateItem}
                                            requisitionType={selectedRequisitionType}
                                        />
                                    </div>
                                </div>
                            )}
                </div>

                {/* Footer Buttons */}
                <div className="flex justify-between items-center bg-white border rounded-bl-md rounded-br-md border-[#E6E6E6] h-[70px] px-4">
                    <Link href="/dashboard/requisition/my-request">
                        <Button
                            variant="outline"
                            className="px-3 py-2 border-grey-300 bg-transparent h-[30px] w-[109px]"
                        >
                            Cancel
                        </Button>
                    </Link>
                    <div className="flex gap-3">
                        {!usesFormLayout && (
                            <Button
                                variant="secondary"
                                className="px-3 py-2 bg-[#3E3E3E] h-[30px] w-[109px] border border-[#B3B3B3] text-white hover:bg-gray-900"
                            >
                                Save as Draft
                            </Button>
                        )}

                        {usesFormLayout ? (
                            // Form based tabs handle submission internally
                            <></>
                        ) : (
                            <Button
                                className="px-3 py-2 bg-orange-500 h-[30px] text-white hover:bg-orange-600"
                                onClick={handleSubmitRequest}
                                disabled={!selectedRequisitionType}
                            >
                                Submit for Approval
                            </Button>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
