'use client'

import { useState } from 'react'
import * as React from 'react'
import { Upload } from 'lucide-react'
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

interface ITRequestFormProps {
    requisitionType: string
}

export function ITRequestForm({ requisitionType }: ITRequestFormProps) {
    const [softwareName, setSoftwareName] = useState('')
    const [licenseType, setLicenseType] = useState('')
    const [equipmentName, setEquipmentName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [priority, setPriority] = useState('')
    const [requiredDate, setRequiredDate] = useState('')
    const [specifications, setSpecifications] = useState('')
    const [businessJustification, setBusinessJustification] = useState('')
    const [infoTab, setInfoTab] = useState<
        'policy' | 'allocation' | 'docs' | 'sla'
    >('policy')

    const isSoftwareLicense = requisitionType === 'software-license'
    const isEquipmentRepairs = requisitionType === 'equipment-repairs'
    const isMaintenanceRepair = requisitionType === 'maintenance-repair'
    const isSystemAccess = requisitionType === 'system-access'
    const isHardwareUpgrade = requisitionType === 'hardware-upgrade'

    const getFieldLabel = () => {
        if (isSoftwareLicense) return 'Software Name*'
        if (isEquipmentRepairs || isMaintenanceRepair) return 'Equipment Name*'
        if (isSystemAccess) return 'System/Application Name*'
        if (isHardwareUpgrade) return 'Hardware Name*'
        return 'Item Name*'
    }

    const getLicenseTypeOptions = () => {
        if (isSoftwareLicense) {
            return [
                'Monthly Subscription',
                'Annual Subscription',
                'Perpetual Subscription',
                'Free / Trial'
            ]
        }
        return []
    }

    const getGuidelines = () => {
        if (isSoftwareLicense) {
            return [
                'All software requests must have manager approval',
                'Evaluate available free/open-source alternatives first',
                'License terms must include company proprietary usage and must be returned upon resignation',
                'Equipment remains company property and must be returned upon resignation',
                'Used or damaged equipment may result in replacement charges'
            ]
        } else if (isEquipmentRepairs || isMaintenanceRepair) {
            return [
                'All equipment requests must have manager approval',
                'Standard equipment replacement provided within 2-3 days',
                'Equipment remains company property and must be returned upon resignation',
                'Used or damaged equipment may result in replacement charges'
            ]
        } else if (isSystemAccess) {
            return [
                'System access requests must include manager approval',
                'Standard provisioning time is 2-3 business days',
                'Access will be revoked upon role change or resignation',
                'Each access level should follow principle of least privilege',
                'Periodic access reviews conducted quarterly'
            ]
        } else if (isHardwareUpgrade) {
            return [
                'Hardware upgrade requests must include manager approval',
                'Current hardware must be returned within 48 hours',
                'Equipment remains company property and must be returned upon resignation',
                'Old hardware may be repurposed or securely destroyed'
            ]
        }
        return []
    }

    const getHistoryLabel = () => {
        if (isSoftwareLicense) return 'Software Requests'
        if (isEquipmentRepairs || isMaintenanceRepair) return 'Equipment Requests'
        if (isSystemAccess) return 'System Access Requests'
        if (isHardwareUpgrade) return 'Hardware Upgrade Requests'
        return 'Requests'
    }

    return (
        <div className='grid grid-cols-3 gap-6 rounded-lg border border-grey-200 p-3'>
            {/* Request Form  */}
            <div className='col-span-2 border border-grey-200 rounded-lg'>
                <h2
                    style={{ fontSize: '16px', fontWeight: '600', lineHeight: '20px' }}
                    className='bg-[#F2F2F2] h-[41px] mb-6 py-2 px-6 text-neutral-black'
                >
                    Request Details
                </h2>

                <div className='space-y-4 px-6'>
                    {isSoftwareLicense && (
                        <>
                            <div className='grid grid-cols-6 gap-4'>
                                <div className='col-span-2'>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        Software Name*
                                    </label>
                                    <Input
                                        type='text'
                                        placeholder='e.g., Microsoft Office, Adobe Creative Suite'
                                        value={softwareName}
                                        onChange={e => setSoftwareName(e.target.value)}
                                        className='border rounded-full border-grey-200'
                                    />
                                </div>

                                <div className='col-span-1'>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        License Type*
                                    </label>
                                    <Select value={licenseType} onValueChange={setLicenseType}>
                                        <SelectTrigger className='border rounded-full w-full border-grey-200'>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {getLicenseTypeOptions().map(opt => (
                                                <SelectItem key={opt} value={opt}>
                                                    {opt}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='col-span-1'>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        Priority*
                                    </label>
                                    <Select value={priority} onValueChange={setPriority}>
                                        <SelectTrigger className='border rounded-full border-grey-200 w-full'>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='high'>High</SelectItem>
                                            <SelectItem value='medium'>Medium</SelectItem>
                                            <SelectItem value='low'>Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='col-span-2'>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        Required Date*
                                    </label>
                                    <Input
                                        type='date'
                                        value={requiredDate}
                                        onChange={e => setRequiredDate(e.target.value)}
                                        className='border rounded-full border-grey-200'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {(isEquipmentRepairs || isMaintenanceRepair || isHardwareUpgrade) && (
                        <>
                            <div className='grid grid-cols-6 gap-4'>
                                <div className='col-span-2'>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        {getFieldLabel()}
                                    </label>
                                    <Input
                                        type='text'
                                        placeholder='e.g., Dell Laptop, HP Printer'
                                        value={equipmentName}
                                        onChange={e => setEquipmentName(e.target.value)}
                                        className='border rounded-full border-grey-200'
                                    />
                                </div>

                                <div className='col-span-1'>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        {isHardwareUpgrade ? 'Quantity*' : 'Quantity'}
                                    </label>
                                    <Input
                                        type='number'
                                        value={quantity}
                                        onChange={e => setQuantity(e.target.value)}
                                        className='border rounded-full border-grey-200'
                                    />
                                </div>

                                <div className='col-span-1'>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        Priority*
                                    </label>
                                    <Select value={priority} onValueChange={setPriority}>
                                        <SelectTrigger className='border rounded-full border-grey-200 w-full'>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='high'>High</SelectItem>
                                            <SelectItem value='medium'>Medium</SelectItem>
                                            <SelectItem value='low'>Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className='col-span-2'>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        Required Date*
                                    </label>
                                    <Input
                                        type='date'
                                        value={requiredDate}
                                        onChange={e => setRequiredDate(e.target.value)}
                                        className='border rounded-full border-grey-200'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {isSystemAccess && (
                        <>
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        System/Application Name*
                                    </label>
                                    <Input
                                        type='text'
                                        placeholder='e.g., Salesforce, Jira, GitHub'
                                        value={softwareName}
                                        onChange={e => setSoftwareName(e.target.value)}
                                        className='border rounded-full border-grey-200'
                                    />
                                </div>
                                <div>
                                    <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                        Required Date*
                                    </label>
                                    <Input
                                        type='date'
                                        value={requiredDate}
                                        onChange={e => setRequiredDate(e.target.value)}
                                        className='border rounded-full border-grey-200'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='space-y-4'>
                            <div>
                                <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                    Specifications (Optional)
                                </label>
                                <Textarea
                                    placeholder='Provide detailed description of the expense/payment'
                                    value={specifications}
                                    onChange={e => setSpecifications(e.target.value)}
                                    className='min-h-10 bg-white border-grey-200 resize-none text-grey-300'
                                />
                            </div>

                            <div>
                                <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                    Business Justification *
                                </label>
                                <Textarea
                                    placeholder='Why is equipment/software/access needed and how it will benefit your work'
                                    value={businessJustification}
                                    onChange={e => setBusinessJustification(e.target.value)}
                                    className='min-h-10 bg-white border-grey-200 resize-none text-grey-300'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                Upload Supporting Document*
                            </label>
                            <div className=' h-[155px] border-2 border-dashed border-grey-400 rounded-lg p-8 text-center bg-[#F2F2F2]'>
                                <Upload className='w-[24px] h-[24px] text-[#3E3E3E] mx-auto mb-2' />
                                <p
                                    style={{ fontSize: '10px', fontWeight: '400' }}
                                    className='text-[#3E3E3E]'
                                >
                                    Click to upload
                                </p>
                                <p
                                    style={{ fontSize: '10px', fontWeight: '400' }}
                                    className='text-[#666666]'
                                >
                                    PDF, JPG, PNG (Max 5MB)
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button className='w-full bg-neutral-black text-white font-bold hover:bg-grey-900 py-2 mb-5'>
                        Add
                    </Button>
                </div>
            </div>

            {/* Additional Information */}
            <div className='col-span-1 border border-grey-200 rounded-lg'>
                <h3
                    style={{ fontSize: '16px', fontWeight: '600', lineHeight: '20px' }}
                    className='bg-[#F2F2F2] h-[41px] py-2 px-6 text-neutral-black'
                >
                    Additional Information
                </h3>

                <div className='space-y-6'>
                    <div className=' p-4'>
                        <div className='bg-blue-50 p-3 border border-grey-200'>
                            <div className=' flex items-center gap-5'>
                                <button
                                    type='button'
                                    onClick={() => setInfoTab('policy')}
                                    className={`py-1 rounded text-[10px] font-normal text-[#0D3D6E] ${infoTab === 'policy'
                                        ? 'border-b-2 border-[#0D3D6E] font-semibold'
                                        : ''
                                        }`}
                                >
                                    Request Policy
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setInfoTab('allocation')}
                                    className={`py-1 rounded text-[10px] font-normal text-[#0D3D6E] ${infoTab === 'allocation'
                                        ? 'border-b-2 border-[#0D3D6E] font-semibold'
                                        : ''
                                        }`}
                                >
                                    Standard Equipment Allocation
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setInfoTab('docs')}
                                    className={`py-1 rounded text-[10px] font-normal text-[#0D3D6E] ${infoTab === 'docs'
                                        ? 'border-b-2 border-[#0D3D6E] font-semibold'
                                        : ''
                                        }`}
                                >
                                    Required Documents
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setInfoTab('sla')}
                                    className={`py-1 rounded text-[10px] font-normal text-[#0D3D6E] ${infoTab === 'sla'
                                        ? 'border-b-2 border-[#0D3D6E] font-semibold'
                                        : ''
                                        }`}
                                >
                                    Service-Level Agreement (SLA)
                                </button>
                            </div>

                            <div className='text-xs text-blue-800 space-y-1 pl-4 mt-3'>
                                {(function getTabContent() {
                                    if (infoTab === 'policy') {
                                        return [
                                            'All requests must have manager approval',
                                            'Evaluate available alternatives before procurement',
                                            'Equipment remains company property and must be returned upon resignation',
                                            'Replacement timelines depend on stock availability'
                                        ]
                                    }

                                    if (infoTab === 'allocation') {
                                        return [
                                            'Laptops: Standard issue for new hires',
                                            'Monitors: Up to 2 per employee based on role',
                                            'Peripherals: Keyboard, mouse as needed',
                                            'Special hardware requires manager and IT approval'
                                        ]
                                    }

                                    if (infoTab === 'docs') {
                                        return [
                                            'Purchase justification or approval email',
                                            'Vendor quotation or proforma invoice',
                                            'Asset tag / serial number upon receipt'
                                        ]
                                    }

                                    // SLA
                                    return [
                                        'Standard provisioning time: 2-3 business days',
                                        'Urgent requests handled within 24 hours if approved',
                                        'Support SLA: Critical issues — 4 hours response, non-critical — 2 business days',
                                        'All requests are tracked and audited for compliance'
                                    ]
                                })().map((line, idx) => (
                                    <li key={idx}>{line}</li>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
