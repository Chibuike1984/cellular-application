'use client'

import { supabase } from "@/lib/lib/supabaseClient";
import { useState, useEffect } from 'react'
import { Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog"
import { useRequisitionStore } from '@/lib/stores/requisition-store';
import { FinanceRequisitionSchema, FinanceRequisitionFormValues } from '../../schemas';

interface FinanceRequestFormProps {
    requisitionType: string
}

export function FinanceRequestForm({ requisitionType }: FinanceRequestFormProps) {
    const router = useRouter();
    const { addRequest } = useRequisitionStore();
    const [file, setFile] = useState<File | null>(null);

    const [showDialog, setShowDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogMessage, setDialogMessage] = useState('');

    const [infoTab, setInfoTab] = useState<'policy' | 'limits' | 'docs' | 'process'>('policy')

    const isExpenseReimbursement = requisitionType === 'expense-reimb'
    const isAdvancePayment = requisitionType === 'advance-payment'
    const isPettyCash = requisitionType === 'petty-cash'

    const form = useForm<FinanceRequisitionFormValues>({
        resolver: zodResolver(FinanceRequisitionSchema),
        defaultValues: {
            department: "finance",
            requisitionType: requisitionType as any,
            reason: "",
            notes: "",
            amount: 0,
            expenseDate: "",
            category: "",
        },
    });

    useEffect(() => {
        form.reset({
            department: "finance",
            requisitionType: requisitionType as any,
            reason: "",
            notes: "",
            amount: 0,
            expenseDate: "",
            category: "",
        })
    }, [requisitionType, form])

    const getCategoryOptions = () => {
        if (isExpenseReimbursement) return ['Travel', 'Meals', 'Office Supplies', 'Equipment', 'Other'];
        if (isAdvancePayment) return ['Salary', 'Benefits', 'Allowance', 'Other'];
        return ['Office Supplies', 'Stationery', 'Supplies', 'Other'];
    }

    const onSubmit = async (data: FinanceRequisitionFormValues) => {
        try {
            if (!file) throw new Error("Please upload a supporting document.");
            if (file.size > 5 * 1024 * 1024) throw new Error("File must be less than 5MB.");

            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `finance-documents/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("request-documents")
                .upload(filePath, file, { upsert: true });
            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from("request-documents")
                .getPublicUrl(filePath);
            const fileUrl = publicUrlData.publicUrl;

            const { data: deptData, error: deptError } = await supabase
                .from("requisition_department")
                .select("id")
                .eq("slug", "finance")
                .single();
            if (deptError || !deptData) throw new Error("Finance department not found.");

            const { data: typeData, error: typeError } = await supabase
                .from("requisition_requisition_type")
                .select("id")
                .eq("slug", requisitionType)
                .eq("department_id", deptData.id)
                .single();
            if (typeError || !typeData) throw new Error("Requisition type not found.");

            const { error: insertError } = await supabase
                .from("requests")
                .insert([{
                    org_id: "6892dc7e-ab35-4283-b327-5b00ac436b63",
                    department_id: deptData.id,
                    requisition_type_id: typeData.id,
                    start_date: data.expenseDate,
                    description: data.reason,
                    supporting_document_url: fileUrl,
                    amount: data.amount,
                }]);
            if (insertError) throw insertError;

            setDialogTitle("Success");
            setDialogMessage("Your request has been submitted successfully.");
            setShowDialog(true);

        } catch (error: any) {
            setDialogTitle("Error");
            setDialogMessage(error.message || "Something went wrong.");
            setShowDialog(true);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-5 gap-6 rounded-lg border border-grey-200 p-3'>

                {/* Left Side Form */}
                <div className='col-span-3 border border-grey-200 rounded-md'>
                    <h2 className='bg-[#F2F2F2] h-[41px] mb-6 py-2 px-6 text-neutral-black font-semibold text-[16px]'>
                        Request Details
                    </h2>

                    <div className='space-y-4 px-6 mb-4'>
                        <div className='grid grid-cols-3 gap-4'>
                            {/* Category */}
                            <FormField control={form.control} name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm font-medium text-neutral-black mb-2'>Category*</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className='bg-white border-grey-200 w-full rounded-full'>
                                                    <SelectValue placeholder='Select category...' />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {getCategoryOptions().map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Amount */}
                            <FormField control={form.control} name="amount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm font-medium text-neutral-black mb-2'>Amount*</FormLabel>
                                        <FormControl>
                                            <Input type='number' placeholder='Enter amount' {...field} onChange={e => field.onChange(Number(e.target.value))} className='border-grey-200 rounded-full' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Expense Date */}
                            <FormField control={form.control} name="expenseDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm font-medium text-neutral-black mb-2'>Expense Date*</FormLabel>
                                        <FormControl>
                                            <Input type='date' {...field} className='border-grey-200 rounded-full' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className='grid grid-cols-2 gap-4'>
                            {/* Reason */}
                            <FormField control={form.control} name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-xs text-[#3E3E3E] font-normal'>Reason / Explanation *</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder='Explain reason for request' className='min-h-32 border-[#CCCCCC] resize-none text-grey-300 text-[10px]' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* File Upload */}
                             <div className="relative mt-6">
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    setFile(e.target.files[0])
                                                }
                                            }}
                                        />

                                        <div className='border-2 border-dashed border-gray-200 rounded-lg p-8 text-center bg-gray-50 space-y-2'>
                                            <Upload className='w-8 h-3 text-gray-400 mx-auto mb-2 mt-2' />
                                            <p className='text-xs'>
                                                {file ? file.name : "Click to upload"}
                                            </p>
                                            <p className='text-[10px] text-gray-500'>
                                                PDF, JPG, PNG (Max 5MB)
                                            </p>
                                        </div>
                                    </div>
                        </div>

                        <Button type="submit" className='w-full bg-gray-800 text-white hover:bg-gray-900 py-2'>Add</Button>
                    </div>
                </div>

                {/* Dialog */}
                <Dialog open={showDialog} onOpenChange={(open) => {
                    setShowDialog(open);
                    if (!open && dialogTitle === "Success") router.push("/dashboard/requisition/raise-requisition");
                }}>
                    <DialogContent className="max-w-sm">
                        <DialogHeader>
                            <DialogTitle>{dialogTitle}</DialogTitle>
                            <DialogDescription>{dialogMessage}</DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={() => setShowDialog(false)}>OK</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

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
            </form>
        </Form>
    )
}