'use client'

import { useState } from 'react'
import {
    Search,
    Bell,
    Download,
    Plus,
    ListFilter,
    SquarePen,
    Trash2
} from 'lucide-react'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
interface MyRequestProps {
    onRaiseRequisition: () => void
}

interface RequestItem {
    id: string
    department: string
    items: string
    category: string
    orderLevels: string
    status: 'Approved' | 'Cancelled' | 'Pending'
}

const mockData: RequestItem[] = [
    {
        id: '#1023',
        department: 'Kitchen',
        items: 'Fresh Vegetables +4',
        category: 'Inventory Items',
        orderLevels: '25 kg',
        status: 'Approved'
    },
    {
        id: '#1033',
        department: 'IT',
        items: 'Mouse',
        category: 'Non-Inventory Items',
        orderLevels: '5 kg',
        status: 'Cancelled'
    },
    {
        id: '#1023',
        department: 'Bar',
        items: 'Cocktail +20',
        category: 'Inventory Items',
        orderLevels: '10 kg',
        status: 'Cancelled'
    },
    {
        id: '#1023',
        department: 'Housekeeping',
        items: 'Tissue, Air Freshener +3',
        category: 'Inventory Items',
        orderLevels: '50 kilo',
        status: 'Cancelled'
    },
    {
        id: '#1023',
        department: 'Maintenance',
        items: 'Oil',
        category: '20 Packs',
        orderLevels: '20 packs',
        status: 'Cancelled'
    },
    {
        id: '#1023',
        department: 'Logistics',
        items: 'Diesel',
        category: '10 Packs',
        orderLevels: '10 packs',
        status: 'Pending'
    },
    {
        id: '#1023',
        department: 'Human Resource',
        items: 'Mouse Pad',
        category: '30 kilo',
        orderLevels: '30 kilo',
        status: 'Pending'
    },
    {
        id: '#1023',
        department: 'Kitchen',
        items: 'Tomatoes, Oil +10',
        category: '25 litres',
        orderLevels: '25 litres',
        status: 'Pending'
    }
]

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Approved':
            return 'bg-green-50 border-[#CCCCCC] text-[#194D30]'
        case 'Cancelled':
            return 'bg-red-50 border-[#CCCCCC] text-red-800'
        case 'Pending':
            return 'bg-yellow-50 border-[#CCCCCC] text-yellow-800'
        default:
            return 'bg-gray-100 text-gray-700'
    }
}

export function Request({ onRaiseRequisition }: MyRequestProps) {
    const [selectedTab, setSelectedTab] = useState('all')
    const [dateRange, setDateRange] = useState('day')
    const [currentPage, setCurrentPage] = useState(1)

    const tabs = [
        { id: 'all', label: 'All', count: 2456 },
        { id: 'approved', label: 'Approved', count: undefined },
        { id: 'pending', label: 'Pending', count: undefined },
        { id: 'cancelled', label: 'Cancelled', count: undefined }
    ]

    const filteredData = mockData.filter(item => {
        if (selectedTab === 'all') return true
        return item.status.toLowerCase() === selectedTab.toLowerCase()
    })

    return (
        <div style={{ fontFamily: 'Poppins' }}>
            {/* Header */}
            <div className='px-6 py-2 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <span
                        style={{
                            color: '#999999',
                            fontSize: '18px',
                            fontWeight: '500',
                            lineHeight: '100%'
                        }}
                    >
                        Requisition
                    </span>
                    <span className='text-neutral-black'>{'>'}</span>
                    <span
                        style={{ fontSize: '20px', fontWeight: '700', lineHeight: '100%' }}
                        className='text-neutral-black'
                    >
                        My Requests
                    </span>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
                        <Input
                            placeholder='Search Menu'
                            className='pl-10 bg-white border-grey-100 rounded-full text-sm text-grey-300'
                        />
                    </div>

                    <div className='flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-full'>
                        <Switch
                            style={{ backgroundColor: '#695ACD' }}
                            className='scale-75'
                        />
                        <span
                            style={{
                                fontSize: '14px',
                                fontWeight: '400',
                                lineHeight: '20px'
                            }}
                            className=' text-purple-600'
                        >
                            AI Mode
                        </span>
                    </div>

                    <Button
                        className='bg-white rounded-full p-2 '
                        variant='ghost'
                        size='icon'
                    >
                        <Bell className='w-5 h-5' />
                    </Button>
                </div>
            </div>

            <div className='bg-white shadow-sm rounded-lg'>
                {/* Tabs and Actions */}
                <div className='px-6 py-7 '>
                    <div className='flex border-b border-gray-200 pb-3 items-center justify-between mb-4'>
                        <div className='flex items-center gap-8'>
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSelectedTab(tab.id)}
                                    className={`pb-2 text-sm font-medium transition-colors relative ${selectedTab === tab.id
                                        ? 'text-neutral-black'
                                        : 'text-[#919191]'
                                        }`}
                                >
                                    {tab.label}
                                    {tab.count && <span className='ml-1'>({tab.count})</span>}
                                    {selectedTab === tab.id && (
                                        <div className='absolute bottom-0 left-0 right-0 h-1 bg-orange-500'></div>
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className='flex items-center gap-3'>
                            <Button variant='ghost' className='text-orange-500 '>
                                <ListFilter className='w-6 h-6' />
                            </Button>
                            <Button
                                variant='ghost'
                                size='sm'
                                className='w-[105px] h-[35px] text-[#3E3E3E] border border-[#CCCCCC] hover:text-gray-900'
                            >
                                <Download className='w-4 h-4 mr-1' />
                                Export
                            </Button>
                            <Button
                                size='sm'
                                onClick={onRaiseRequisition}
                                className='bg-orange-500 text-white hover:bg-orange-600 gap-1'
                            >
                                <Plus className='w-4 h-4 stroke-3' />
                                Raise Request
                            </Button>
                        </div>
                    </div>

                    {/* Date Range */}
                    <div className='flex justify-between items-center gap-4'>
                        <div className='flex gap-2'>
                            {['Day', 'Week', 'Month'].map(range => (
                                <Button
                                    key={range}
                                    variant={
                                        dateRange === range.toLowerCase() ? 'default' : 'outline'
                                    }
                                    style={{ width: '110px', height: '35px' }}
                                    onClick={() => setDateRange(range.toLowerCase())}
                                    className={
                                        dateRange === range.toLowerCase()
                                            ? 'bg-gray-800 text-white'
                                            : 'border-gray-200'
                                    }
                                >
                                    {range}
                                </Button>
                            ))}
                        </div>

                        <div className='flex items-center gap-1'>
                            <Button
                                variant='ghost'
                                className='text-[#666666] bg-[#F2F2F2] border border-[#E6E6E6]'
                            >
                                {'<'}
                            </Button>
                            <Button
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    lineHeight: '20px'
                                }}
                                className='bg-[#F4F5F7] text-[#666666]'
                            >
                                Today
                            </Button>
                            <Button
                                variant='ghost'
                                className='text-[#666666] bg-[#F2F2F2] border border-[#E6E6E6]'
                            >
                                {'>'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className='px-6 py-4 overflow-x-auto'>
                    <table className='w-full'>
                        <thead className='bg-[#F2F2F2]'>
                            <tr>
                                <th
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        lineHeight: '100%'
                                    }}
                                    className='text-center py-4 px-4 text-[#262626] rounded-tl-lg'
                                >
                                    ID
                                </th>
                                <th
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        lineHeight: '100%'
                                    }}
                                    className='text-center py-4 px-4 text-[#262626]'
                                >
                                    Department
                                </th>
                                <th
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        lineHeight: '100%'
                                    }}
                                    className='text-center py-4 px-4 text-[#262626]'
                                >
                                    Items
                                </th>
                                <th
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        lineHeight: '100%'
                                    }}
                                    className='text-center py-4 px-4 text-[#262626]'
                                >
                                    Category
                                </th>
                                <th
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        lineHeight: '100%'
                                    }}
                                    className='text-center py-4 px-4 text-[#262626]'
                                >
                                    Order Levels
                                </th>
                                <th
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        lineHeight: '100%'
                                    }}
                                    className='text-center py-4 px-4 text-[#262626]'
                                >
                                    Status
                                </th>
                                <th
                                    style={{
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        lineHeight: '100%'
                                    }}
                                    className='text-center py-4 px-4 text-[#262626] rounded-tr-lg'
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className={`hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F4F5F7]'
                                        }`}
                                >
                                    <td
                                        style={{ fontSize: '12px', fontWeight: '400' }}
                                        className='py-3 px-4 text-[#5B5B5B] text-center'
                                    >
                                        {item.id}
                                    </td>
                                    <td
                                        style={{ fontSize: '12px', fontWeight: '400' }}
                                        className='py-3 px-4 text-[#5B5B5B] text-center'
                                    >
                                        {item.department}
                                    </td>
                                    <td
                                        style={{ fontSize: '12px', fontWeight: '400' }}
                                        className='py-3 px-4 text-neutral-black text-center'
                                    >
                                        {item.items}
                                    </td>
                                    <td
                                        style={{ fontSize: '12px', fontWeight: '400' }}
                                        className='py-3 px-4 text-neutral-black text-center'
                                    >
                                        {item.category}
                                    </td>
                                    <td
                                        style={{ fontSize: '12px', fontWeight: '400' }}
                                        className='py-3 px-4 text-neutral-black text-center'
                                    >
                                        {item.orderLevels}
                                    </td>
                                    <td className='py-3 px-4 text-center'>
                                        <span
                                            className={`inline-block w-[94px] text-center px-3 py-2 text-xs ${getStatusColor(
                                                item.status
                                            )}`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className='py-3 px-4 text-center'>
                                        <div className='flex items-center gap-3'>
                                            <SquarePen className='w-4 h-4' />
                                            <Trash2 className='w-4 h-4' />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className='px-6 py-4 flex  items-center justify-end gap-2'>
                    <Button
                        variant='outline'
                        size='sm'
                        className='text-gray-600 bg-transparent'
                    >
                        {'< Previous'}
                    </Button>
                    <Button
                        size='sm'
                        className='bg-orange-500 text-white hover:bg-orange-600'
                    >
                        1
                    </Button>
                    <Button
                        variant='outline'
                        size='sm'
                        className='text-gray-600 bg-transparent'
                    >
                        2
                    </Button>
                    <Button
                        variant='outline'
                        size='sm'
                        className='text-gray-600 bg-transparent'
                    >
                        3
                    </Button>
                    <Button
                        variant='outline'
                        size='sm'
                        className='text-gray-600 bg-transparent'
                    >
                        {'Next >'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
