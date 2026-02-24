"use client"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { XCircle, CheckCircle, Clock, XOctagon } from "lucide-react"
import { useState } from "react"

type ItemAction = "approved" | "rejected" | "pending"

interface RequestItem {
    id: string
    itemName: string
    sku: string
    category: string
    currentStock: string
    reorderLevel: string
    reqQty: string
    urgency: "High" | "Medium" | "Low"
    reqNotes?: string
    action: ItemAction
    notes?: string
}

interface ApproveRequestDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (items: RequestItem[]) => void
    requestId?: string
    requestedBy?: string
    date?: string
    requestNotes?: string
    initialItems?: RequestItem[]
}

const urgencyStyles: Record<string, string> = {
    High: "bg-red-100 text-red-600 border border-red-200",
    Medium: "bg-orange-100 text-orange-500 border border-orange-200",
    Low: "bg-green-100 text-green-600 border border-green-200",
}

export function ApproveRequestDialog({
    open,
    onOpenChange,
    onSubmit,
    requestId = "REQ-234-2025",
    requestedBy = "John Doe (Kitchen)",
    date = "2025-10-28",
    requestNotes = "Items needed for upcoming week operations and special catering event on Saturday.",
    initialItems = [
        {
            id: "1",
            itemName: "Rice (50kg bags)",
            sku: "PR-002-2025",
            category: "Supplies",
            currentStock: "2 bags",
            reorderLevel: "10 bags",
            reqQty: "50 bags",
            urgency: "High",
            reqNotes: "Don't add this t...",
            action: "approved",
        },
        {
            id: "2",
            itemName: "Cooking Oil (5L)",
            sku: "PR-003-2005",
            category: "Oils",
            currentStock: "8 gallons",
            reorderLevel: "20 gallons",
            reqQty: "30 gallons",
            urgency: "Medium",
            action: "rejected",
        },
        {
            id: "3",
            itemName: "Cooking Oil (5L)",
            sku: "PR-003-2005",
            category: "Oils",
            currentStock: "8 gallons",
            reorderLevel: "20 gallons",
            reqQty: "30 gallons",
            urgency: "Medium",
            reqNotes: "Don't add this t...",
            action: "pending",
        },
        {
            id: "4",
            itemName: "Cooking Oil (5L)",
            sku: "PR-003-2005",
            category: "Oils",
            currentStock: "8 gallons",
            reorderLevel: "20 gallons",
            reqQty: "30 gallons",
            urgency: "Medium",
            action: "approved",
        },
    ],
}: ApproveRequestDialogProps) {
    const [items, setItems] = useState<RequestItem[]>(initialItems)

    const approved = items.filter((i) => i.action === "approved").length
    const rejected = items.filter((i) => i.action === "rejected").length
    const pending = items.filter((i) => i.action === "pending").length

    const allResolved = items.every((i) => i.action !== "pending")

    const setAction = (id: string, action: ItemAction) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, action } : item
            )
        )
    }

    const resetAction = (id: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, action: "pending" } : item
            )
        )
    }

    const approveAllPending = () => {
        setItems((prev) =>
            prev.map((item) =>
                item.action === "pending" ? { ...item, action: "approved" } : item
            )
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="min-w-[900px] w-full p-0 overflow-hidden gap-0"
                showClose={false}
                style={{ fontFamily: "Poppins" }}
            >
                {/* Header */}
                <DialogHeader className="bg-neutral-black px-5 py-3 flex flex-row items-center justify-between">
                    <DialogTitle className="text-white text-lg leading-5 font-bold">
                        Approve Request
                    </DialogTitle>
                    <DialogClose className="text-white hover:text-gray-300 transition-colors">
                        <XCircle className="h-5 w-5" />
                    </DialogClose>
                </DialogHeader>

                {/* Body */}
                <div className="bg-white px-6 pt-5 pb-4 flex flex-col gap-4">
                    {/* Request meta */}
                    <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-xl text-neutral-900">{requestId}</span>
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-orange-300 text-orange-500 bg-orange-50">
                                    Pending Approval
                                </span>
                            </div>
                            <p className="text-xs text-neutral-600 max-w-sm">
                                <span className="font-semibold">Notes:</span> {requestNotes}
                            </p>
                        </div>
                        <div className="text-right text-sm text-neutral-700">
                            <div>
                                <span className="font-semibold">Requested by:</span> {requestedBy}
                            </div>
                            <div>
                                <span className="font-semibold">Date:</span> {date}
                            </div>
                        </div>
                    </div>

                    {/* Summary bar */}
                    <div className="flex items-center justify-between border border-neutral-200 rounded-md px-4 py-2.5">
                        <div className="flex items-center gap-5 text-sm font-medium">
                            <span className="text-neutral-700">
                                Total Items: <span className="font-bold">{items.length}</span>
                            </span>
                            <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="w-4 h-4" />
                                Approved <span className="font-bold">{approved}</span>
                            </span>
                            <span className="flex items-center gap-1 text-orange-500">
                                <Clock className="w-4 h-4" />
                                Pending <span className="font-bold">{pending}</span>
                            </span>
                            <span className="flex items-center gap-1 text-red-500">
                                <XOctagon className="w-4 h-4" />
                                Rejected <span className="font-bold">{rejected}</span>
                            </span>
                        </div>
                        <Button
                            onClick={approveAllPending}
                            disabled={pending === 0}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold h-8 px-3 rounded-md"
                        >
                            Approve all pending
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-neutral-200 text-neutral-500 text-xs font-semibold">
                                    <th className="text-left py-2 pr-4 font-semibold">Item Name</th>
                                    <th className="text-left py-2 pr-4 font-semibold">Current Stock</th>
                                    <th className="text-left py-2 pr-4 font-semibold">Reorder Level</th>
                                    <th className="text-left py-2 pr-4 font-semibold">Req. Qty</th>
                                    <th className="text-left py-2 pr-4 font-semibold">Urgency</th>
                                    <th className="text-left py-2 pr-4 font-semibold">Req. Notes</th>
                                    <th className="text-left py-2 pr-4 font-semibold">Action</th>
                                    <th className="text-left py-2 font-semibold">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-neutral-100 last:border-0"
                                    >
                                        <td className="py-3 pr-4">
                                            <div className="font-semibold text-neutral-900 text-sm">
                                                {item.itemName}
                                            </div>
                                            <div className="text-xs text-neutral-400">
                                                {item.sku} • {item.category}
                                            </div>
                                        </td>
                                        <td className="py-3 pr-4 text-red-500 font-medium text-sm">
                                            {item.currentStock}
                                        </td>
                                        <td className="py-3 pr-4 text-neutral-700 text-sm">
                                            {item.reorderLevel}
                                        </td>
                                        <td className="py-3 pr-4 text-neutral-700 text-sm">
                                            {item.reqQty}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <span
                                                className={`text-xs font-semibold px-2 py-0.5 rounded ${urgencyStyles[item.urgency]}`}
                                            >
                                                {item.urgency}
                                            </span>
                                        </td>
                                        <td className="py-3 pr-4 text-neutral-500 text-xs max-w-[100px] truncate">
                                            {item.reqNotes ?? "-"}
                                        </td>
                                        <td className="py-3 pr-4">
                                            <div className="flex items-center gap-1.5">
                                                {item.action === "approved" && (
                                                    <>
                                                        <span className="text-xs font-semibold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                                                            Approved
                                                        </span>
                                                        <Button
                                                            onClick={() => resetAction(item.id)}
                                                            className="h-6 px-2 text-xs bg-neutral-black text-white hover:bg-black rounded"
                                                        >
                                                            Reset
                                                        </Button>
                                                    </>
                                                )}
                                                {item.action === "rejected" && (
                                                    <>
                                                        <Button
                                                            onClick={() => resetAction(item.id)}
                                                            className="h-6 px-2 text-xs bg-neutral-black text-white hover:bg-black rounded"
                                                        >
                                                            Reset
                                                        </Button>
                                                        <span className="text-xs font-semibold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                                                            Rejected
                                                        </span>
                                                    </>
                                                )}
                                                {item.action === "pending" && (
                                                    <>
                                                        <Button
                                                            onClick={() => setAction(item.id, "approved")}
                                                            className="h-6 px-2 text-xs bg-green-600 hover:bg-green-700 text-white rounded"
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button
                                                            onClick={() => setAction(item.id, "rejected")}
                                                            className="h-6 px-2 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
                                                        >
                                                            Reject
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-3">
                                            <button className="text-xs text-blue-500 underline hover:text-blue-700">
                                                Add
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <DialogFooter className="bg-yellow-300 px-6 py-3 flex flex-row items-center justify-between sm:justify-between">
                    <p className="text-xs text-neutral-700 font-medium flex items-center gap-1">
                        <span className="text-base">ℹ️</span>
                        Please approve or reject all items before submitting your decision.
                    </p>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => onOpenChange(false)}
                            className="h-8 px-5 bg-white text-neutral-black border border-neutral-300 hover:bg-gray-50 text-sm font-medium rounded-md"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => allResolved && onSubmit(items)}
                            disabled={!allResolved}
                            className="h-8 px-5 bg-neutral-black text-white hover:bg-black text-sm font-medium rounded-md disabled:opacity-50"
                        >
                            Submit Decision
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}