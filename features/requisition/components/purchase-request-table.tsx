'use client'
import { useState } from 'react'
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
    requisitionType
}: PurchaseRequestTableProps) {
    const isInventoryRequisition = requisitionType === 'inventory-req'
    const isOfficeSupplies = requisitionType === 'office-supplies'
    const isEquipmentRequest = requisitionType === 'equipment-req'
    const isRepairRequest = requisitionType === 'repair-req'
    const [priority, setPriority] = useState<string>('')

    const showQuantityColumn = !isRepairRequest
    const showStockColumns = isInventoryRequisition

    const [addNotesText, setAddNotesText] = useState('')

    const tableTitle = isInventoryRequisition
        ? 'Purchase Request Items'
        : 'Requested Items'

    return (
        <div className=' bg-white'>
            <div className='flex items-center justify-between bg-[#F4F5F7] h-[63px] px-5 border-t-2 border-b-2 border-grey-200 shadow-none'>
                <h2 style={{ fontSize: '16px', fontWeight: '600', lineHeight: '20px' }}>
                    {tableTitle}
                </h2>
                {showQuantityColumn && (
                    <div className='flex gap-2'>
                        <div
                            style={{ fontSize: '14px', fontWeight: '400' }}
                            className='px-3 py-1 '
                        >
                            Quick Fill (Optional)
                        </div>

                        <div className='flex flex-inline gap-5 items-center'>
                            <label
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                className='text-[#3E3E3E] block mb-2'
                            >
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
                        >
                            Apply to all
                        </Button>
                    </div>
                )}
            </div>

            <div className='overflow-x-auto'>
                <table className='w-full text-sm'>
                    <thead>
                        <tr className='bg-[#FFF6F3] h-[52px]'>
                            <th
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                className='text-nowrap text-center py-3 px-4 text-[#3E3E3E]'
                            >
                                Item Name
                            </th>
                            {showStockColumns && (
                                <>
                                    <th
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            lineHeight: '100%'
                                        }}
                                        className='text-nowrap text-center py-3 px-4 text-[#3E3E3E]'
                                    >
                                        Current Stock
                                    </th>
                                    <th
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            lineHeight: '100%'
                                        }}
                                        className='text-nowrap text-center py-3 px-4 text-[#3E3E3E]'
                                    >
                                        Reorder Level
                                    </th>
                                </>
                            )}
                            {showQuantityColumn && (
                                <th
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '400',
                                        lineHeight: '100%'
                                    }}
                                    className='text-center py-3 px-4 text-[#3E3E3E]'
                                >
                                    Requested Qty*
                                </th>
                            )}
                            <th
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                className='text-center py-3 px-4 text-[#3E3E3E]'
                            >
                                Urgency
                            </th>
                            <th
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                className='text-center py-3 px-4 text-[#3E3E3E]'
                            >
                                Notes
                            </th>
                            <th
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                className='text-center py-3 px-4 text-[#3E3E3E]'
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr
                                key={item.id}
                                className='border-b border-gray-200 hover:bg-gray-50'
                            >
                                <td className='py-4 px-4'>
                                    <p
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            lineHeight: '100%'
                                        }}
                                        className=' text-[#3E3E3E] text-nowrap text-center'
                                    >
                                        {item.itemName}
                                    </p>
                                </td>
                                {showStockColumns && (
                                    <>
                                        <td className='py-4 px-4 text-[#DC143C] text-sm text-center'>
                                            {item.currentStock}
                                        </td>
                                        <td className='py-4 px-4 text-neutral-black text-sm text-center'>
                                            {item.reorderLevel}
                                        </td>
                                    </>
                                )}
                                {showQuantityColumn && (
                                    <td className='py-4 px-4'>
                                        <div className='flex items-center gap-2'>
                                            <Input
                                                type='text'
                                                value={item.requestedQty}
                                                onChange={e =>
                                                    onUpdateItem(item.id, {
                                                        requestedQty: e.target.value
                                                    })
                                                }
                                                className='w-16 bg-white border-gray-200'
                                            />
                                            <span className='text-[#999999] text-sm'>
                                                {item.unit}
                                            </span>
                                        </div>
                                    </td>
                                )}
                                <td className='py-2 px-2'>
                                    <Select
                                        value={item.urgency}
                                        onValueChange={value =>
                                            onUpdateItem(item.id, { urgency: value as any })
                                        }
                                    >
                                        <SelectTrigger
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                lineHeight: '100%'
                                            }}
                                            className={`w-[90px] h-[29px] ${getUrgencyColor(
                                                item.urgency
                                            )}`}
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='High'>High</SelectItem>
                                            <SelectItem value='Medium'>Medium</SelectItem>
                                            <SelectItem value='Low'>Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                                <td className='py-4 px-4 text-[#1D69B5] text-center text-xs'>
                                    {item.notes}
                                </td>
                                <td className='py-4 px-4'>
                                    <Button
                                        variant='ghost'
                                        size='sm'
                                        onClick={() => onRemoveItem(item.id)}
                                        className='text-gray-400 hover:text-red-600 hover:bg-red-50'
                                    >
                                        <Trash2 className='w-4 h-4' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='mt-9  bg-white'>
                    <h3 className='text-sm font-semibold text-gray-900 mb-4'>
                        Add Notes
                    </h3>
                    <Textarea
                        placeholder='Add any additional notes...'
                        value={addNotesText}
                        onChange={e => setAddNotesText(e.target.value)}
                        className='min-h-14 resize-none'
                    />
                </div>

                {/* {selectedRequisitionType && !usesFormLayout && (
          <>
            <div className='mb-8 p-6 bg-white'>
              <h3 className='text-sm font-semibold text-gray-900 mb-4'>
                Add Notes
              </h3>
              <Textarea
                placeholder='Add any additional notes...'
                value={addNotesText}
                onChange={e => setAddNotesText(e.target.value)}
                className='min-h-24 resize-none'
              />
            </div>
          </>
        )} */}
            </div>
        </div>
    )
}
