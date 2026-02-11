'use client'

import { useState } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
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

interface HRRequestFormProps {
    requisitionType: string
}

export function HRRequestForm({ requisitionType }: HRRequestFormProps) {
    const [leaveType, setLeaveType] = useState('')
    const [permissionType, setPermissionType] = useState('')
    const [emergencyType, setEmergencyType] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [fromTime, setFromTime] = useState('')
    const [toTime, setToTime] = useState('')
    const [date, setDate] = useState('')
    const [reason, setReason] = useState('')

    const isLeaveRequest = requisitionType === 'leave-req'
    const isPermissionRequest = requisitionType === 'permission-req'
    const isEmergencyAbsent = requisitionType === 'emergency-absent'

    return (
        <div
            className='grid grid-cols-5 gap-6  border border-grey-200 rounded-md p-4'
            style={{ fontFamily: 'Poppins' }}
        >
            {/* Request Form  */}
            <div className='col-span-3 rounded-md border border-[#CCCCCC]'>
                <div className='bg-[#F2F2F2] text-neutral-black flex items-center justify-between px-7 py-2 h-[41px] mb-8'>
                    <h2 style={{ fontSize: '16px', fontWeight: 600, lineHeight: '20px' }}>
                        Request Details
                    </h2>

                    {isEmergencyAbsent && (
                        <div
                            className='flex items-center gap-2 bg-red-50 border border-red-800 rounded-md px-3 py-1'
                            style={{ maxWidth: '65%' }}
                        >
                            <span className='flex items-center p-0.5 rounded-full bg-red-100'>
                                <AlertCircle className='w-4 h-4' style={{ color: '#9B091A' }} />
                            </span>

                            <p
                                className=' text-red-700'
                                style={{ fontWeight: '400', fontSize: '8px' }}
                            >
                                <strong className='text-red-800'>Important:</strong>&nbsp; Use
                                this form only for unexpected emergencies. Supporting
                                documentation is required.
                            </p>
                        </div>
                    )}
                </div>

                <div className='space-y-4'>
                    {isLeaveRequest && (
                        <>
                            <div className='grid grid-cols-3 gap-4 px-7'>
                                <div>
                                    <label
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            lineHeight: '100%'
                                        }}
                                        className='text-[#3E3E3E] block mb-2'
                                    >
                                        Leave Type
                                    </label>
                                    <Select value={leaveType} onValueChange={setLeaveType}>
                                        <SelectTrigger className='w-full border-[#CCCCCC] rounded-full'>
                                            <SelectValue placeholder='Select leave type...' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='annual'>Annual Leave</SelectItem>
                                            <SelectItem value='sick'>Sick Leave</SelectItem>
                                            <SelectItem value='personal'>Personal Leave</SelectItem>
                                            <SelectItem value='maternity'>Maternity Leave</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            lineHeight: '100%'
                                        }}
                                        className='text-[#3E3E3E] block mb-2'
                                    >
                                        Start Date
                                    </label>
                                    <Input
                                        type='date'
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                        className=' border-[#CCCCCC] rounded-full'
                                    />
                                </div>
                                <div>
                                    <label
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            lineHeight: '100%'
                                        }}
                                        className='text-[#3E3E3E] block mb-2'
                                    >
                                        End Date
                                    </label>
                                    <Input
                                        type='date'
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                        className=' border-[#CCCCCC] rounded-full'
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {isPermissionRequest && (
                        <>
                            <div>
                                <div className='grid grid-cols-4 gap-4 px-7'>
                                    <div>
                                        <label
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                lineHeight: '100%'
                                            }}
                                            className='text-[#3E3E3E] block mb-2'
                                        >
                                            Permission Type*
                                        </label>
                                        <Select
                                            value={permissionType}
                                            onValueChange={setPermissionType}
                                        >
                                            <SelectTrigger className='w-full border-[#CCCCCC] rounded-full'>
                                                <SelectValue placeholder='Select leave type...' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='annual'>
                                                    Doctor's Appoinment
                                                </SelectItem>
                                                <SelectItem value='sick'>Personal Matters</SelectItem>
                                                <SelectItem value='personal'>
                                                    Family Commitment
                                                </SelectItem>
                                                <SelectItem value='maternity'>
                                                    Bank / Government Office
                                                </SelectItem>
                                                <SelectItem value='other'>Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                lineHeight: '100%'
                                            }}
                                            className='text-[#3E3E3E] block mb-2'
                                        >
                                            Date*
                                        </label>
                                        <Input
                                            type='date'
                                            value={startDate}
                                            onChange={e => setStartDate(e.target.value)}
                                            className=' border-[#CCCCCC] rounded-full'
                                        />
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                lineHeight: '100%'
                                            }}
                                            className='text-[#3E3E3E] block mb-2'
                                        >
                                            From Time*
                                        </label>
                                        <Input
                                            type='date'
                                            value={endDate}
                                            onChange={e => setEndDate(e.target.value)}
                                            className=' border-[#CCCCCC] rounded-full'
                                        />
                                    </div>

                                    <div>
                                        <label
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                lineHeight: '100%'
                                            }}
                                            className='text-[#3E3E3E] block mb-2'
                                        >
                                            From Time*
                                        </label>
                                        <Input
                                            type='date'
                                            value={endDate}
                                            onChange={e => setEndDate(e.target.value)}
                                            className=' border-[#CCCCCC] rounded-full'
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {isEmergencyAbsent && (
                        <>
                            <div>
                                <div>
                                    <div className='grid grid-cols-4 gap-4 px-7'>
                                        <div>
                                            <label
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                    lineHeight: '100%'
                                                }}
                                                className='text-[#3E3E3E] block mb-2'
                                            >
                                                Emergency Type*
                                            </label>
                                            <Select
                                                value={emergencyType}
                                                onValueChange={setEmergencyType}
                                            >
                                                <SelectTrigger className='w-full border-[#CCCCCC] rounded-full'>
                                                    <SelectValue placeholder='Select emergency...' />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value='annual'>
                                                        Medical Emergency
                                                    </SelectItem>
                                                    <SelectItem value='sick'>Family Emergency</SelectItem>
                                                    <SelectItem value='personal'>Accident</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <label
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                    lineHeight: '100%'
                                                }}
                                                className='text-[#3E3E3E] block mb-2'
                                            >
                                                Date*
                                            </label>
                                            <Input
                                                type='date'
                                                value={startDate}
                                                onChange={e => setStartDate(e.target.value)}
                                                className=' border-[#CCCCCC] rounded-full'
                                            />
                                        </div>
                                        <div>
                                            <label
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                    lineHeight: '100%'
                                                }}
                                                className='text-[#3E3E3E] block mb-2'
                                            >
                                                From Time*
                                            </label>
                                            <Input
                                                type='date'
                                                value={endDate}
                                                onChange={e => setEndDate(e.target.value)}
                                                className=' border-[#CCCCCC] rounded-full'
                                            />
                                        </div>

                                        <div>
                                            <label
                                                style={{
                                                    fontSize: '12px',
                                                    fontWeight: '400',
                                                    lineHeight: '100%'
                                                }}
                                                className='text-[#3E3E3E] block mb-2'
                                            >
                                                From Time*
                                            </label>
                                            <Input
                                                type='date'
                                                value={endDate}
                                                onChange={e => setEndDate(e.target.value)}
                                                className=' border-[#CCCCCC] rounded-full'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    <div className='grid grid-cols-2 gap-4 px-7'>
                        <div>
                            <label
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                className=' text-[#3E3E3E] block mb-2'
                            >
                                Reason / Explanation *
                            </label>
                            <Textarea
                                placeholder='Explain reason for request'
                                value={reason}
                                style={{
                                    fontSize: '10px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                onChange={e => setReason(e.target.value)}
                                className='min-h-35  border-[#CCCCCC] resize-none text-grey-300'
                            />
                        </div>

                        <div>
                            <label
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    lineHeight: '100%'
                                }}
                                className=' text-[#3E3E3E] block mb-2'
                            >
                                Upload Supporting Document
                            </label>

                            {isEmergencyAbsent ? (
                                <div
                                    className='border-2 border-dashed rounded-lg p-8 text-center space-y-2'
                                    style={{
                                        background: '#FDE8EC',
                                        borderColor: 'rgba(252, 165, 165, 1)'
                                    }}
                                >
                                    <Upload
                                        className='w-8 h-8 mx-auto mb-2'
                                        style={{ color: '#5D091A' }}
                                    />
                                    <p
                                        style={{
                                            fontSize: '10px',
                                            fontWeight: '400',
                                            lineHeight: '100%'
                                        }}
                                        className='text-red-700'
                                    >
                                        Click to upload
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '10px',
                                            fontWeight: '400',
                                            lineHeight: '100%'
                                        }}
                                        className='text-red-600'
                                    >
                                        PDF, JPG, PNG (Max 5MB)
                                    </p>
                                </div>
                            ) : (
                                <div className='border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50 space-y-2'>
                                    <Upload className='w-8 h-8 text-gray-400 mx-auto mb-2' />
                                    <p
                                        style={{
                                            fontSize: '10px',
                                            fontWeight: '400',
                                            lineHeight: '100%'
                                        }}
                                        className='text-grey-600'
                                    >
                                        Click to upload
                                    </p>
                                    <p
                                        style={{
                                            fontSize: '10px',
                                            fontWeight: '400',
                                            lineHeight: '100%'
                                        }}
                                        className='text-grey-500'
                                    >
                                        PDF, JPG, PNG (Max 5MB)
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className='px-7 mb-4'>
                        <Button className='w-full bg-neutral-black text-white py-2'>
                            Add
                        </Button>
                    </div>
                </div>
            </div>

            {/* Additional Information  */}
            <div className='col-span-2 border border-grey-200 rounded-md'>
                <h3
                    style={{ fontSize: '16px', fontWeight: '600', lineHeight: '20px' }}
                    className='bg-[#F2F2F2] h-[41px] mb-3 py-2 px-6 text-neutral-black'
                >
                    Additional Information
                </h3>

                <div className='space-y-6 px-4'>
                    {isLeaveRequest && (
                        <>
                            <div className=' pb-4 px-5 py-3 border border-grey-100 bg-blue-50 '>
                                <p className='text-xs font-medium text-blue-600 mb-2'>
                                    📋 Leave Guidelines
                                </p>
                                <ul
                                    style={{ fontSize: '8px', fontWeight: '400' }}
                                    className=' text-blue-600 space-y-1 list-disc pl-4'
                                >
                                    <li>
                                        Annual Leave: 20 days per year (must be requested 2 weeks in
                                        advance)
                                    </li>
                                    <li>
                                        Sick Leave: 10 days per year (medical certificate required
                                        after 3 days)
                                    </li>
                                    <li>Personal Leave: 5 days per year</li>
                                    <li>All leave types are fully paid</li>
                                </ul>
                            </div>

                            <div className='border border-grey-100'>
                                <p className='text-xs font-medium text-neutral-black p-3'>
                                    Leave Balance
                                </p>
                                <div className='grid grid-cols-4 gap-2 px-5 mb-3'>
                                    <div className='bg-[#ECF9F1] p-3 rounded-sm border border-grey-100'>
                                        <p className='text-2xl font-bold text-center text-green-500'>
                                            11
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '8px',
                                                fontWeight: '400',
                                                lineHeight: '100%'
                                            }}
                                            className='text-center text-neutral-black'
                                        >
                                            Annual Leave of 30 days
                                        </p>
                                    </div>

                                    <div className='bg-blue-50 p-3 rounded-sm border border-grey-100'>
                                        <p className='text-2xl font-bold text-center text-blue-500'>
                                            4
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '8px',
                                                fontWeight: '400',
                                                lineHeight: '100%'
                                            }}
                                            className='text-center text-neutral-black'
                                        >
                                            Sick Leave of 10 days
                                        </p>
                                    </div>
                                    <div className='bg-red-50 p-3 rounded-sm border border-grey-100'>
                                        <p className='text-2xl font-bold text-center text-red-500'>
                                            8
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '8px',
                                                fontWeight: '400',
                                                lineHeight: '100%'
                                            }}
                                            className='text-center text-neutral-black'
                                        >
                                            Sick Leave of 10 days
                                        </p>
                                    </div>
                                    <div className='bg-yellow-50 p-3 rounded-sm border border-grey-100'>
                                        <p className='text-2xl font-bold text-center text-yellow-500'>
                                            11
                                        </p>
                                        <p
                                            style={{
                                                fontSize: '8px',
                                                fontWeight: '400',
                                                lineHeight: '100%'
                                            }}
                                            className='text-center text-neutral-black'
                                        >
                                            Maternity Leave of 14 days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {(isPermissionRequest || isEmergencyAbsent) && (
                        <>
                            <div className='border border-grey-100 pb-4 bg-blue-50 p-3'>
                                <p className='text-xs font-medium text-blue-600 mb-2'>
                                    {isPermissionRequest
                                        ? 'Permission Request Guidelines'
                                        : 'Critical Requirements'}
                                </p>
                                <ul className='text-xs text-[#0D3D6E] space-y-1 list-disc pl-4'>
                                    {isPermissionRequest ? (
                                        <>
                                            <li>
                                                Permission requests are for partial day absences
                                                (appointments, urgent personal matters)
                                            </li>
                                            <li>
                                                Must be requested at least 24 hours in advance when
                                                possible
                                            </li>
                                            <li>If approved, no salary deduction will apply</li>
                                            <li>
                                                No lateness charge during the approved time period
                                            </li>
                                            <li>Maximum 4 hours per permission request</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                Must provide supporting documents (medical certificate,
                                                police report)
                                            </li>
                                            <li>Submit within 24 hours of emergency absence</li>
                                            <li>
                                                Manager Approval Required: Your manager must review and
                                                approve within 24 hours
                                            </li>
                                            <li>Receive valid documentation</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            <div className='border border-grey-100 p-3'>
                                <p className='text-xs font-medium text-neutral-black mb-3'>
                                    {isPermissionRequest
                                        ? 'Your Permission History'
                                        : 'Your Emergency History'}
                                </p>
                                <div className='space-y-2 grid grid-cols-2 gap-6'>
                                    <div className='flex justify-between items-center p-3 rounded-md border border-grey-100 bg-green-25'>
                                        <div>
                                            <p className='text-xs font-medium text-green-500'>
                                                This Month
                                            </p>
                                            <p className='text-xs text-green-500'>
                                                {isPermissionRequest
                                                    ? 'Permission requests'
                                                    : 'Emergency requests'}
                                            </p>
                                        </div>
                                        <p className='text-lg font-bold text-green-700'>2</p>
                                    </div>

                                    <div className='flex justify-between items-center p-3 rounded-md border border-grey-100 bg-yellow-50'>
                                        <div>
                                            <p className='text-xs font-medium text-yellow-600'>
                                                Total Hours
                                            </p>
                                            <p className='text-xs text-yellow-600'>From this month</p>
                                        </div>
                                        <p className='text-lg font-bold text-yellow-800'>6.5h</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {isLeaveRequest && (
                        <div className='mb-3'>
                            <label
                                style={{ fontSize: '10px', fontWeight: '400' }}
                                className=' text-[#3E3E3E] block mb-2'
                            >
                                Additional Notes (Optional)
                            </label>
                            <Textarea className='min-h-15 bg-white border-gray-200 resize-none text-xs' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
