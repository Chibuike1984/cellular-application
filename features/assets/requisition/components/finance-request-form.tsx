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

interface FinanceRequestFormProps {
    requisitionType: string
}

export function FinanceRequestForm({
    requisitionType
}: FinanceRequestFormProps) {
    const [category, setCategory] = useState('')
    const [amount, setAmount] = useState('')
    const [expenseDate, setExpenseDate] = useState('')
    const [reason, setReason] = useState('')
    const [infoTab, setInfoTab] = useState<
        'policy' | 'limits' | 'docs' | 'process'
    >('policy')

    const isExpenseReimbursement = requisitionType === 'expense-reimb'
    const isAdvancePayment = requisitionType === 'advance-payment'
    const isPettyCash = requisitionType === 'petty-cash'

    const getCategoryOptions = () => {
        if (isExpenseReimbursement) {
            return ['Travel', 'Meals', 'Office Supplies', 'Equipment', 'Other']
        } else if (isAdvancePayment) {
            return ['Salary', 'Benefits', 'Allowance', 'Other']
        } else {
            return ['Office Supplies', 'Stationery', 'Supplies', 'Other']
        }
    }

    const getGuidelines = () => {
        if (isExpenseReimbursement) {
            return [
                'Submit reimbursement requests within 30 days of expense',
                'Attach all original receipts and supporting documents',
                'All expenses must be approved in business plan',
                'Reimbursements processed within 5-7 business days',
                'Maximum reimbursement limit: ₦500,000 per request'
            ]
        } else if (isAdvancePayment) {
            return [
                'Advance payments for approved business trips or projects',
                'Submit request at least 7 days before required date',
                'Attach supporting documents (quotation, PO number)',
                'Unused funds must be returned to finance',
                'Maximum advance payment limit: ₦500,000 per request'
            ]
        } else {
            return [
                'For small, urgent expenses (maximum ₦50,000)',
                'Must be approved by department head',
                'Uses for office supplies, administrative items, misc purchases',
                'Claims must be submitted within 48 hours'
            ]
        }
    }

    return (
        <div className='grid grid-cols-5 gap-6 rounded-lg border border-grey-200 p-3'>
            {/* Request Form - Left Side */}
            <div className='col-span-3 border border-grey-200 rounded-md'>
                <h2
                    style={{ fontSize: '16px', fontWeight: '600', lineHeight: '20px' }}
                    className='bg-[#F2F2F2] h-[41px] mb-6 py-2 px-6 text-neutral-black'
                >
                    Request Details
                </h2>

                <div className='space-y-4 px-6'>
                    <div className='grid grid-cols-3 gap-4'>
                        <div>
                            <label className='text-sm font-medium text-neutral-black block mb-2'>
                                Category*
                            </label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger className='bg-white border-grey-200 w-full rounded-full'>
                                    <SelectValue placeholder='Select category...' />
                                </SelectTrigger>
                                <SelectContent>
                                    {getCategoryOptions().map(opt => (
                                        <SelectItem key={opt} value={opt}>
                                            {opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className='text-sm font-medium text-neutral-black block mb-2'>
                                Amount*
                            </label>
                            <Input
                                type='text'
                                placeholder='Enter amount'
                                value={amount}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setAmount(e.target.value)
                                }
                                className=' border-grey-200 rounded-full'
                            />
                        </div>
                        <div>
                            <label className='text-sm font-medium text-neutral-black block mb-2'>
                                Expense Date*
                            </label>
                            <Input
                                type='date'
                                value={expenseDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setExpenseDate(e.target.value)
                                }
                                className=' border-grey-200 rounded-full'
                            />
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label
                                style={{ fontSize: '12px', fontWeight: '400' }}
                                className=' text-[#3E3E3E] block mb-2'
                            >
                                Reason / Explanation *
                            </label>
                            <Textarea
                                style={{ fontSize: '10px', fontWeight: '400' }}
                                placeholder='Provide detailed description of the expense/payment'
                                value={reason}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setReason(e.target.value)
                                }
                                className='min-h-32 bg-white border-grey-200 resize-none text-[#B3B3B3]'
                            />
                        </div>

                        <div>
                            <label
                                style={{ fontSize: '12px', fontWeight: '400' }}
                                className=' text-[#3E3E3E] block mb-2'
                            >
                                Upload Supporting Document*
                            </label>
                            <div className='border-2 border-dashed border-grey-400 rounded-lg p-8 text-center bg-[#F2F2F2]'>
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

                    <Button className='w-full bg-gray-800 text-white hover:bg-gray-900 py-2'>
                        Add
                    </Button>
                </div>
            </div>

            {/* Additional Information - Right Side */}
            <div className='col-span-2 border border-grey-200 rounded-md'>
                <h3
                    style={{ fontSize: '16px', fontWeight: '600', lineHeight: '20px' }}
                    className='bg-[#F2F2F2] h-[41px] mb-6 py-2 px-6 text-neutral-black'
                >
                    Additional Information
                </h3>

                <div className='px-6'>
                    <div className='pb-4'>
                        <div className='bg-blue-50 pb-4 h-[185px]'>
                            <div className='flex items-center gap-5 p-3'>
                                <button
                                    type='button'
                                    onClick={() => setInfoTab('policy')}
                                    className={`py-1 rounded text-[10px] font-normal text-[#0D3D6E]
                  ${infoTab === 'policy'
                                            ? 'border-b-2 border-[#0D3D6E] font-semibold'
                                            : ''
                                        }`}
                                >
                                    Expense Reimbursement Policy
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setInfoTab('limits')}
                                    className={`py-1 rounded text-[10px] font-normal text-[#0D3D6E]
                  ${infoTab === 'limits'
                                            ? 'border-b-2 border-[#0D3D6E] font-semibold'
                                            : ''
                                        }`}
                                >
                                    Approval Limits
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setInfoTab('docs')}
                                    className={`py-1 rounded text-[10px] font-normal text-[#0D3D6E]
                   ${infoTab === 'docs'
                                            ? 'border-b-2 border-[#0D3D6E] font-semibold'
                                            : ''
                                        }`}
                                >
                                    Required Documents
                                </button>

                                <button
                                    type='button'
                                    onClick={() => setInfoTab('process')}
                                    className={`py-1 rounded text-[10px] font-normal text-[#0D3D6E]
                   ${infoTab === 'process'
                                            ? 'border-b-2 border-[#0D3D6E] font-semibold'
                                            : ''
                                        }`}
                                >
                                    Approval Process
                                </button>
                            </div>

                            <div className='text-xs text-blue-800 space-y-1 pl-4'>
                                {(function getTabContent() {
                                    if (infoTab === 'policy') {
                                        return [
                                            'Submit reimbursement requests within 30 days of expense',
                                            ' Original receipts or invoices must be attached',
                                            'All expenses must be work-related and pre-approved',
                                            'Reimbursements processed within 5-7 business days',
                                            'Maximum reimbursement limit: ₦500,000 per request'
                                        ]
                                    }

                                    if (infoTab === 'limits') {
                                        if (isExpenseReimbursement) {
                                            return [
                                                'Up to ₦50,000. Department Head',
                                                '₦50,001 - ₦200,000. Finance Manager',
                                                '₦200,001 - ₦1,000,000. General Manager',
                                                'Above ₦1,000,000.  CEO/Board',
                                                'Approval'
                                            ]
                                        } else if (isAdvancePayment) {
                                            return [
                                                'Original receipts/invoices',
                                                'Expense report form',
                                                'Proof of payment (if applicable)'
                                            ]
                                        }
                                        return [
                                            'For small, urgent expenses (maximum ₦50,000)',
                                            'Department head approval required for petty cash requests'
                                        ]
                                    }

                                    if (infoTab === 'docs') {
                                        if (isExpenseReimbursement) {
                                            return [
                                                'Original receipts',
                                                'Credit card statements (if applicable)',
                                                'Travel authorization (if applicable)'
                                            ]
                                        } else if (isAdvancePayment) {
                                            return [
                                                'Quotation or proforma invoice',
                                                'Project approval or PO reference',
                                                'Budget owner sign-off'
                                            ]
                                        }
                                        return [
                                            'Receipt or invoice',
                                            'Approval email or note from department head'
                                        ]
                                    }

                                    // process
                                    if (isExpenseReimbursement) {
                                        return [
                                            'Employee submits request with receipts',
                                            'Manager verifies and approves',
                                            'Finance processes reimbursement within 5-7 business days'
                                        ]
                                    } else if (isAdvancePayment) {
                                        return [
                                            'Submit advance request with justification',
                                            'Obtain project lead approval',
                                            'Finance disburses funds and tracks reconciliation'
                                        ]
                                    }
                                    return [
                                        'Submit petty cash request',
                                        'Department head approves',
                                        'Reconcile receipts within 48 hours'
                                    ]
                                })().map((line, idx) => (
                                    <div key={idx}>
                                        {infoTab === 'policy' ? (
                                            <p className='text-xs font-medium text-blue-800 mb-2'>
                                                <li className='list-disc ml-4'>{line}</li>
                                            </p>
                                        ) : (
                                            <li className='list-disc ml-4'>{line}</li>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='border-2 rounded-md mb-4 border-grey-100 pb-4'>
                        <p
                            style={{ fontSize: '14px', fontWeight: '600' }}
                            className='text-neutral-black px-3 py-4'
                        >
                            History
                        </p>
                        <div className='space-y-2 px-3 grid grid-cols-2 gap-3'>
                            <div className='flex justify-between items-center bg-[#ECF9F1] p-3 rounded-md border border-grey-100 '>
                                <div>
                                    <p
                                        style={{ fontSize: '10px', fontWeight: '700' }}
                                        className='text-green-500'
                                    >
                                        This Month
                                    </p>
                                    <p className='text-xs text-green-500'>
                                        {isExpenseReimbursement
                                            ? 'Reimbursements'
                                            : isAdvancePayment
                                                ? 'Advances'
                                                : 'Petty Cash Requests'}
                                    </p>
                                </div>
                                <p className='text-lg font-bold text-green-700'>4</p>
                            </div>

                            <div className='flex justify-between items-center bg-yellow-50 p-3 rounded-md border border-grey-100 '>
                                <div>
                                    <p
                                        style={{ fontSize: '10px', fontWeight: '700' }}
                                        className='text-yellow-600'
                                    >
                                        Sum Total
                                    </p>
                                    <p className='text-xs text-yellow-600'>This month</p>
                                </div>
                                <p className='text-lg font-bold text-yellow-800'>₦500,000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
