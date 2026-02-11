'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface AddItemsPanelProps {
    onAddItem: (item: any) => void
    requisitionType: string
}

const inventoryItems = [
    { name: 'Rice (50kg bags)', stock: '2 bags', reorder: '10 bags' },
    { name: 'Cooking Oil (5L)', stock: '8 gallons', reorder: '20 gallons' },
    { name: 'Flour (25kg bags)', stock: '5 bags', reorder: '15 bags' },
    { name: 'Sugar (kg)', stock: '10 kg', reorder: '20 kg' }
]
const officeSuppliesItems = ['A4 Paper', 'Biro', 'Tape', 'Folders', 'Notebooks']
const equipmentItems = ['Refrigerator', 'Bike', 'Laptop', 'Monitor', 'Printer']

export function AddItemsPanel({
    onAddItem,
    requisitionType
}: AddItemsPanelProps) {
    const [selectedItem, setSelectedItem] = useState<string>('')
    const [itemDescription, setItemDescription] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [priority, setPriority] = useState<string>('')
    const [notes, setNotes] = useState<string>('')

    const isInventoryRequisition = requisitionType === 'inventory-req'
    const isOfficeSupplies = requisitionType === 'office-supplies'
    const isEquipmentRequest = requisitionType === 'equipment-req'
    const isRepairRequest = requisitionType === 'repair-req'

    const showQuantityField = !isRepairRequest

    const handleAdd = () => {
        if (isInventoryRequisition) {
            const selectedInventoryItem = inventoryItems.find(
                item => item.name === selectedItem
            )
            if (selectedItem && quantity && selectedInventoryItem) {
                onAddItem({
                    itemName: selectedItem,
                    currentStock: selectedInventoryItem.stock,
                    reorderLevel: selectedInventoryItem.reorder,
                    requestedQty: quantity,
                    unit: 'unit',
                    urgency: (priority || 'Medium') as 'High' | 'Medium' | 'Low',
                    notes: notes
                })
                // Reset form
                setSelectedItem('')
                setQuantity('')
                setPriority('')
                setNotes('')
            }
        } else {
            const itemName = isOfficeSupplies ? selectedItem : itemDescription
            const hasRequiredFields =
                itemName && (showQuantityField ? quantity : true)

            if (hasRequiredFields) {
                onAddItem({
                    itemName: itemName,
                    currentStock: '-',
                    reorderLevel: '-',
                    requestedQty: showQuantityField ? quantity : '-',
                    unit: showQuantityField ? 'unit' : '-',
                    urgency: (priority || 'Medium') as 'High' | 'Medium' | 'Low',
                    notes: notes
                })
                // Reset form
                setSelectedItem('')
                setItemDescription('')
                setQuantity('')
                setPriority('')
                setNotes('')
            }
        }
    }

    return (
        <div className='bg-white border border-grey-200'>
            <div className='flex items-center justify-between mb-6 bg-[#F2F2F2] h-[62px] px-5'>
                <h2 style={{ fontSize: '16px', fontWeight: '600', lineHeight: '20px' }}>
                    Add Items
                </h2>
            </div>

            <div className='space-y-4 px-5'>
                {isInventoryRequisition ? (
                    <div>
                        <label
                            style={{
                                fontSize: '13px',
                                fontWeight: '400',
                                lineHeight: '100%'
                            }}
                            className='text-[#3E3E3E] block mb-2'
                        >
                            Select Item
                        </label>
                        <Select value={selectedItem} onValueChange={setSelectedItem}>
                            <SelectTrigger className='w-full  border-grey-200 rounded-full'>
                                <SelectValue
                                    className='text-black'
                                    placeholder='Select an item...'
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {inventoryItems.map(item => (
                                    <SelectItem key={item.name} value={item.name}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ) : isOfficeSupplies ? (
                    <div>
                        <label
                            style={{
                                fontSize: '13px',
                                fontWeight: '400',
                                lineHeight: '100%'
                            }}
                            className='text-[#3E3E3E] block mb-2'
                        >
                            Item Description
                        </label>
                        <Select value={selectedItem} onValueChange={setSelectedItem}>
                            <SelectTrigger className='w-full bg-white border-grey-200 rounded-full'>
                                <SelectValue placeholder='Select an item...' />
                            </SelectTrigger>
                            <SelectContent>
                                {officeSuppliesItems.map(item => (
                                    <SelectItem key={item} value={item}>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ) : (
                    <div>
                        <label
                            style={{
                                fontSize: '13px',
                                fontWeight: '400',
                                lineHeight: '100%'
                            }}
                            className='text-[#3E3E3E] block mb-2'
                        >
                            Item Description
                        </label>
                        <Input
                            placeholder='e.g., Refrigerator, Gas, Laptop'
                            value={itemDescription}
                            onChange={e => setItemDescription(e.target.value)}
                            className=' border-grey-200 rounded-full'
                        />
                    </div>
                )}

                {showQuantityField && (
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label
                                style={{
                                    fontSize: '13px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                className='text-[#3E3E3E] block mb-2'
                            >
                                Quantity
                            </label>
                            <Input
                                type='text'
                                placeholder='Enter quantity'
                                value={quantity}
                                onChange={e => setQuantity(e.target.value)}
                                className='bg-white border-grey-200 rounded-full'
                            />
                        </div>
                        <div>
                            <label
                                style={{
                                    fontSize: '13px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                className='text-[#3E3E3E] block mb-2'
                            >
                                Priority
                            </label>
                            <Select value={priority} onValueChange={setPriority}>
                                <SelectTrigger className=' border-grey-200 rounded-full w-full'>
                                    <SelectValue placeholder='Select...' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='High'>High</SelectItem>
                                    <SelectItem value='Medium'>Medium</SelectItem>
                                    <SelectItem value='Low'>Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {isRepairRequest && (
                    <div>
                        <label
                            style={{
                                fontSize: '13px',
                                fontWeight: '400',
                                lineHeight: '100%'
                            }}
                            className='text-[#3E3E3E] block mb-2'
                        >
                            Priority
                        </label>
                        <Select value={priority} onValueChange={setPriority}>
                            <SelectTrigger className=' border-grey-200 rounded-full w-full'>
                                <SelectValue placeholder='Select...' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='High'>High</SelectItem>
                                <SelectItem value='Medium'>Medium</SelectItem>
                                <SelectItem value='Low'>Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <div>
                    <label
                        style={{
                            fontSize: '13px',
                            fontWeight: '400',
                            lineHeight: '100%'
                        }}
                        className='text-[#3E3E3E] block mb-2'
                    >
                        Notes
                    </label>
                    <Textarea
                        placeholder='Optional notes'
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        className='min-h-14 bg-white border-grey-200 resize-none'
                    />
                </div>

                <Button
                    onClick={handleAdd}
                    style={{ fontSize: '16px', fontWeight: '600' }}
                    className='w-full bg-neutral-black rounded-sm text-white mb-6'
                >
                    Add
                </Button>
            </div>
        </div>
    )
}
