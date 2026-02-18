'use client'

import { supabase } from "@/lib/lib/supabaseClient";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, ArrowLeft, CalendarDays, Clock, Cpu, FileText, Settings } from "lucide-react";
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

const requisitionTypesByDepartment: Record<string, Array<{ id: string; label: string; icon: ReactNode }>> = {
    inventory: [
        { id: "inventory-req", label: "Inventory Requisition", icon: <StarBadgeIcon /> },
        { id: "equipment-req", label: "Equipment Request", icon: <CopyIcon /> },
    ],
    maintenance: [
        { id: "office-supplies", label: "Office Supplies", icon: <FunnelIcon /> },
        { id: "equipment-req", label: "Equipment Request", icon: <CopyIcon /> },
        { id: "repair-req", label: "Repair Request", icon: <EditLinkIcon /> },
    ],
    kitchen: [
        { id: "inventory-req", label: "Inventory Requisition", icon: <MobileDeviceIcon /> },
    ],
    hr: [
        { id: "leave-req", label: "Leave Request", icon: <CalendarDays /> },
        { id: "permission-req", label: "Permission Request", icon: <Clock /> },
        { id: "emergency-absent", label: "Emergency Absent", icon: <AlertTriangle /> },
    ],
    finance: [
        { id: "expense-reimb", label: "Expense Reimbursement", icon: <CalendarDays /> },
        { id: "advance-payment", label: "Advance Payment", icon: <Clock /> },
        { id: "petty-cash", label: "Petty Cash Request", icon: <Clock /> },
    ],
    it: [
        { id: "equipment-repairs", label: "Equipment Repairs", icon: <CopyIcon /> },
        { id: "software-license", label: "Software License", icon: <Clock /> },
        { id: "maintenance-repair", label: "Maintenance/Repair", icon: <EditLinkIcon /> },
        { id: "system-access", label: "System Access", icon: <SupportIcon /> },
        { id: "hardware-upgrade", label: "Hardware Upgrade", icon: <Cpu /> },
    ],
    admin: [
        { id: "inventory-req", label: "Inventory Requisition", icon: <MobileDeviceIcon /> },
    ],
};

export function RaiseRequisition() {
    const router = useRouter();

    const [selectedDepartment, setSelectedDepartment] = useState<string>("inventory");
    const [selectedRequisitionType, setSelectedRequisitionType] = useState<string | null>(null);

    const [inventoryItems, setInventoryItems] = useState<RequisitionItem[]>([]);
    const [officeSuppliesItems, setOfficeSuppliesItems] = useState<RequisitionItem[]>([]);
    const [equipmentItems, setEquipmentItems] = useState<RequisitionItem[]>([]);
    const [repairItems, setRepairItems] = useState<RequisitionItem[]>([]);

    const [hasLoaded, setHasLoaded] = useState(false);

    const availableRequisitionTypes = requisitionTypesByDepartment[selectedDepartment] || [];

    const isInventoryRequisition = selectedRequisitionType === "inventory-req";
    const isOfficeSupplies = selectedRequisitionType === "office-supplies";
    const isEquipmentRequisition = selectedRequisitionType === "equipment-req";
    const isRepairRequest = selectedRequisitionType === "repair-req";

    let currentItems: RequisitionItem[] = [];
    if (isInventoryRequisition) currentItems = inventoryItems;
    else if (isOfficeSupplies) currentItems = officeSuppliesItems;
    else if (isEquipmentRequisition) currentItems = equipmentItems;
    else if (isRepairRequest) currentItems = repairItems;

    // Load persisted items when requisition type changes
    useEffect(() => {
        if (!selectedRequisitionType) return;

        const saved = localStorage.getItem(selectedRequisitionType);
        if (saved) {
            const parsed: RequisitionItem[] = JSON.parse(saved);

            if (isInventoryRequisition) setInventoryItems(parsed);
            else if (isOfficeSupplies) setOfficeSuppliesItems(parsed);
            else if (isEquipmentRequisition) setEquipmentItems(parsed);
            else if (isRepairRequest) setRepairItems(parsed);
        }

        setHasLoaded(true);
    }, [selectedRequisitionType]);

    // Persist items when they change
    useEffect(() => {
        if (!hasLoaded || !selectedRequisitionType) return;

        if (isInventoryRequisition) localStorage.setItem(selectedRequisitionType, JSON.stringify(inventoryItems));
        else if (isOfficeSupplies) localStorage.setItem(selectedRequisitionType, JSON.stringify(officeSuppliesItems));
        else if (isEquipmentRequisition) localStorage.setItem(selectedRequisitionType, JSON.stringify(equipmentItems));
        else if (isRepairRequest) localStorage.setItem(selectedRequisitionType, JSON.stringify(repairItems));
    }, [inventoryItems, officeSuppliesItems, equipmentItems, repairItems, selectedRequisitionType, hasLoaded]);

    // Handlers
    const handleAddItem = (item: Omit<RequisitionItem, "id">) => {
        const newItem: RequisitionItem = { ...item, id: Date.now().toString() };
        if (isInventoryRequisition) setInventoryItems(prev => [...prev, newItem]);
        else if (isOfficeSupplies) setOfficeSuppliesItems(prev => [...prev, newItem]);
        else if (isEquipmentRequisition) setEquipmentItems(prev => [...prev, newItem]);
        else if (isRepairRequest) setRepairItems(prev => [...prev, newItem]);
    };

    const handleRemoveItem = (id: string) => {
        if (isInventoryRequisition) setInventoryItems(prev => prev.filter(i => i.id !== id));
        else if (isOfficeSupplies) setOfficeSuppliesItems(prev => prev.filter(i => i.id !== id));
        else if (isEquipmentRequisition) setEquipmentItems(prev => prev.filter(i => i.id !== id));
        else if (isRepairRequest) setRepairItems(prev => prev.filter(i => i.id !== id));
    };

    const handleUpdateItem = (id: string, updated: Partial<RequisitionItem>) => {
        const updateItems = (items: RequisitionItem[], setter: typeof setInventoryItems) =>
            setter(items.map(i => i.id === id ? { ...i, ...updated } : i));

        if (isInventoryRequisition) updateItems(inventoryItems, setInventoryItems);
        else if (isOfficeSupplies) updateItems(officeSuppliesItems, setOfficeSuppliesItems);
        else if (isEquipmentRequisition) updateItems(equipmentItems, setEquipmentItems);
        else if (isRepairRequest) updateItems(repairItems, setRepairItems);
    };

    const isHRDepartment = selectedDepartment === "hr";
    const isFinanceDepartment = selectedDepartment === "finance";
    const isITDepartment = selectedDepartment === "it";
    const usesFormLayout = isHRDepartment || isFinanceDepartment || isITDepartment;

    const handleSubmitRequest = async () => {
    if (!selectedDepartment || !selectedRequisitionType) {
        alert("Please select a department and requisition type.");
        return;
    }

    try {
        // Prepare the payload for Supabase
        const inserts = currentItems.map(item => ({
            org_id: "6892dc7e-ab35-4283-b327-5b00ac436b63",
            items: item.itemName,
            current_stock: item.currentStock || null,
            reorder_level: item.reorderLevel || null,
            requested_qty: parseInt(item.requestedQty, 10) || 0,
            order_level: item.urgency,
            notes: item.notes || "",
            department_id: "3317734c-c571-4e55-bdb5-e105be791f16",       // UUID
            requisition_type_id: "1f3a0e63-edf5-4878-983f-cd31cd3911d9", // UUID
        }));

        // Insert all items at once
        const { data, error } = await supabase
            .from("requisition_table")
            .insert(inserts);

        if (error) throw error;

        alert("Requisition submitted successfully!");
        router.push("/dashboard/requisition/raise-requisition");
    } catch (err) {
        console.error(err);
        alert("Failed to submit requisition. Please try again.");
    }
};


    return (
        <div>
            {/* Header */}
            <Link href="/dashboard/requisition/my-request">
                <Button variant="ghost" size="sm" className="text-grey-700 border border-[#CCCCCC] rounded-full bg-white w-23.75 h-9.75 mb-5">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Button>
            </Link>

            <div className="bg-white rounded-tr-md rounded-tl-md p-4 border border-[#E6E6E6]">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 border-b border-grey-100 pb-4">
                    <h1 className="text-neutral-black font-bold text-[20px]">Raise Requisition</h1>
                    <span className="text-neutral-black text-[12px]">#PR-2025-0847</span>
                </div>

                {/* Department */}
                <div className="mb-4">
                    <p className="text-[#3E3E3E] font-semibold text-[12px] mb-3">Select Department*</p>
                    <div className="flex flex-wrap gap-3">
                        {departments.map(dept => (
                            <button
                                key={dept.id}
                                onClick={() => { setSelectedDepartment(dept.id); setSelectedRequisitionType(null); }}
                                className={`px-3 py-1 rounded-lg flex items-center gap-2 text-[12px] font-normal ${selectedDepartment === dept.id ? "bg-orange-25 border border-grey-200" : "bg-white border border-grey-200 hover:border-grey-300"}`}
                            >
                                <span className={`${selectedDepartment === dept.id ? "bg-orange-500 text-white rounded-md p-1" : "bg-[#E6E6E6] rounded-md p-1"}`}>{dept.icon}</span>
                                {dept.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Requisition Type */}
                <div className="mb-8">
                    <p className="text-[#3E3E3E] font-semibold text-[12px] mb-3">Requisition Type *</p>
                    <div className="flex gap-3">
                        {availableRequisitionTypes.map(type => (
                            <button
                                key={type.id}
                                onClick={() => setSelectedRequisitionType(type.id)}
                                className={`px-3 py-1 rounded-lg flex items-center gap-2 text-sm font-medium ${selectedRequisitionType === type.id ? "bg-orange-25 border border-grey-200" : "bg-white border border-grey-200 hover:border-grey-300"}`}
                            >
                                <span className={`${selectedRequisitionType === type.id ? "bg-orange-500 text-white rounded-md p-1" : "bg-[#E6E6E6] rounded-md p-1"}`}>{type.icon}</span>
                                {type.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                {!selectedRequisitionType ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-[#F4F5F7] h-[70vh]">
                        <FileText className="w-12 h-12 text-[#999999] mb-4" />
                        <h2 className="text-[#3E3E3E] font-medium text-[24px] mb-2">Select Requisition Type</h2>
                        <p className="text-neutral-black text-[14px]">Choose a requisition type from the options above to continue</p>
                    </div>
                ) : usesFormLayout ? (
                    <div className="gap-6 mb-8">
                        {isHRDepartment && <HRRequestForm requisitionType={selectedRequisitionType} />}
                        {isFinanceDepartment && <FinanceRequestForm requisitionType={selectedRequisitionType} />}
                        {isITDepartment && <ITRequestForm requisitionType={selectedRequisitionType} />}
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="col-span-1">
                            <AddItemsPanel onAddItem={handleAddItem} requisitionType={selectedRequisitionType} />
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

            {/* Footer */}
            <div className="flex justify-between items-center bg-white border rounded-bl-md rounded-br-md border-[#E6E6E6] h-[70px] px-4">
                <Link href="/dashboard/requisition/my-request">
                    <Button variant="outline" className="px-3 py-2 border-grey-300 bg-transparent h-[30px] w-[109px]">Cancel</Button>
                </Link>
                <div className="flex gap-3">
                    {!usesFormLayout && (
                        <Button variant="secondary" className="px-3 py-2 bg-[#3E3E3E] h-[30px] w-[109px] border border-[#B3B3B3] text-white hover:bg-gray-900">
                            Save as Draft
                        </Button>
                    )}
                    {!usesFormLayout && (
                        <Button className="px-3 py-2 bg-orange-500 h-[30px] text-white hover:bg-orange-600"
                            onClick={handleSubmitRequest} disabled={!selectedRequisitionType}>
                            Submit for Approval
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
