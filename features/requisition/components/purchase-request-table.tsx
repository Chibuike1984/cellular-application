'use client'

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";

interface RequisitionItem {
    id: string
    itemName: string
    currentStock?: string
    reorderLevel?: string
    requestedQty: string
    unit: string
    urgency: 'High' | 'Medium' | 'Low'
    notes: string
}

interface PurchaseRequestTableProps {
    items: RequisitionItem[]
    onRemoveItem: (id: string) => void
    onUpdateItem: (id: string, updated: Partial<RequisitionItem>) => void
    requisitionType: string
    contentNote: string
    setContentNote: (value: string) => void
}

const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
        case 'High':
            return 'bg-[#FBD0D9] text-red-700 border border-[#CCCCCC]'
        case 'Medium':
            return 'bg-yellow-100 text-yellow-800 border border-[#CCCCCC]'
        case 'Low':
            return 'bg-blue-100 text-blue-700'
        default:
            return 'bg-gray-100 text-gray-700'
    }
}

export function PurchaseRequestTable({
    items,
    onRemoveItem,
    onUpdateItem,
    requisitionType,
    contentNote,
    setContentNote
}: PurchaseRequestTableProps) {

    const isInventoryRequisition = requisitionType === 'inventory-req'
    const isRepairRequest = requisitionType === 'repair-req'

    const showQuantityColumn = !isRepairRequest
    const showStockColumns = isInventoryRequisition

    const [priority, setPriority] = useState<string>('')

    // Persist items only
    useEffect(() => {
        localStorage.setItem(requisitionType, JSON.stringify(items))
    }, [items, requisitionType])

    return (
        <div className='bg-white'>
            {/* Table header */}
            <div className='flex items-center justify-between bg-[#F4F5F7] h-[63px] px-5 border-t-2 border-b-2 border-grey-200 shadow-none'>
                <h2 className='text-[16px] font-semibold'>
                    {isInventoryRequisition ? 'Purchase Request Items' : 'Requested Items'}
                </h2>

                {showQuantityColumn && (
                    <div className='flex gap-2'>
                        <div className='px-3 py-1 text-[14px] font-normal'>
                            Quick Fill (Optional)
                        </div>

                        <div className='flex gap-5 items-center'>
                            <label className='text-[#3E3E3E] block mb-2 text-[12px] font-normal'>
                                Priority
                            </label>

                            <Select value={priority} onValueChange={setPriority}>
                                <SelectTrigger className='bg-white border-grey-200 rounded-full w-full'>
                                    <SelectValue placeholder='Select...' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='High'>High</SelectItem>
                                    <SelectItem value='Medium'>Medium</SelectItem>
                                    <SelectItem value='Low'>Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            size='sm'
                            className='bg-neutral-black h-[30px] w-[100px] text-white ml-3'
                            onClick={() => {
                                if (!priority) return
                                items.forEach(item =>
                                    onUpdateItem(item.id, { urgency: priority as any })
                                )
                            }}
                        >
                            Apply to all
                        </Button>
                    </div>
                )}
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='bg-[#FFF6F3] h-[52px]'>
                            <th className='text-center py-3 px-4 text-[12px]'>Item Name</th>
                            {showStockColumns && (
                                <>
                                    <th className='text-center py-3 px-4 text-[12px]'>Current Stock</th>
                                    <th className='text-center py-3 px-4 text-[12px]'>Reorder Level</th>
                                </>
                            )}
                            {showQuantityColumn && (
                                <th className='text-center py-3 px-4 text-[12px]'>Requested Qty*</th>
                            )}
                            <th className='text-center py-3 px-4 text-[12px]'>Urgency</th>
                            <th className='text-center py-3 px-4 text-[12px]'>Notes</th>
                            <th className='text-center py-3 px-4 text-[12px]'>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className='border-b border-gray-200 hover:bg-gray-50'>
                                <td className='py-4 px-4 text-center font-semibold text-[12px]'>
                                    {item.itemName}
                                </td>

                                {showStockColumns && (
                                    <>
                                        <td className='py-4 px-4 text-center text-sm text-[#DC143C]'>
                                            {item.currentStock}
                                        </td>
                                        <td className='py-4 px-4 text-center text-sm'>
                                            {item.reorderLevel}
                                        </td>
                                    </>
                                )}

                                {showQuantityColumn && (
                                    <td className='py-4 px-4 text-center'>
                                        <div className='flex items-center gap-2 justify-center'>
                                            <Input
                                                type='text'
                                                value={item.requestedQty}
                                                onChange={e =>
                                                    onUpdateItem(item.id, { requestedQty: e.target.value })
                                                }
                                                className='w-16 bg-white border-gray-200'
                                            />
                                            <span className='text-[#999999] text-sm'>
                                                {item.unit}
                                            </span>
                                        </div>
                                    </td>
                                )}

                                <td className='py-2 px-2 text-center'>
                                    <Select
                                        value={item.urgency}
                                        onValueChange={value =>
                                            onUpdateItem(item.id, { urgency: value as any })
                                        }
                                    >
                                        <SelectTrigger className={`w-[90px] h-[29px] ${getUrgencyColor(item.urgency)}`}>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='High'>High</SelectItem>
                                            <SelectItem value='Medium'>Medium</SelectItem>
                                            <SelectItem value='Low'>Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>

                                <td className='py-4 px-4 text-center text-xs text-[#1D69B5]'>
                                    {item.notes}
                                </td>

                                <td className='py-4 px-4 text-center'>
                                    {/* <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => onRemoveItem(item.id)}
                                        className='text-gray-400 hover:text-red-600 hover:bg-red-50'
                                    >
                                        <Trash2 className='w-4 h-4' />
                                    </Button> */}

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                            variant='ghost'
                                            size='sm'
                                            className='text-gray-400 hover:text-red-600 hover:bg-red-50'
                                            >
                                            <Trash2 className='w-4 h-4' />
                                            </Button>
                                        </DialogTrigger>

                                        <DialogContent>
                                            <DialogHeader>
                                            <DialogTitle>Confirm Delete</DialogTitle>
                                            <DialogDescription>
                                                Are you sure you want to remove this item from the requisition item? This action cannot be undone.
                                            </DialogDescription>
                                            </DialogHeader>

                                            <DialogFooter>
                                            <DialogClose asChild>
                                                <Button className='bg-gray-200 px-4 py-2 rounded'>Cancel</Button>
                                            </DialogClose>
                                            <Button
                                                className='bg-red-500 text-white px-4 py-2 rounded'
                                                onClick={() => onRemoveItem(item.id)}
                                            >
                                                Delete
                                            </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                        </Dialog>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Additional Notes */}
                <div className='mt-9 bg-white'>
                    <h3 className='text-sm font-semibold text-gray-900 mb-4'>
                        Add Notes
                    </h3>

                    <Textarea
                        placeholder='Add any additional notes...'
                        value={contentNote}
                        onChange={e => setContentNote(e.target.value)}
                        className='min-h-14 resize-none'
                    />
                </div>
            </div>
        </div>
    )
}