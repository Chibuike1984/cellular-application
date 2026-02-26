'use client'

import { supabase } from "@/lib/lib/supabaseClient";
import { Upload, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
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
import { HRRequisitionSchema, HRRequisitionFormValues } from "../../schemas"
import { useEffect, useState } from 'react'

interface HRRequestFormProps {
    requisitionType: string
}

export function HRRequestForm({ requisitionType }: HRRequestFormProps) {

    const router = useRouter()

    const [showDialog, setShowDialog] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMessage, setDialogMessage] = useState("")
    const [file, setFile] = useState<File | null>(null)

    const isLeaveRequest = requisitionType === 'leave-req'
    const isPermissionRequest = requisitionType === 'permission-req'
    const isEmergencyAbsent = requisitionType === 'emergency-absent'

    const form = useForm<HRRequisitionFormValues>({
        resolver: zodResolver(HRRequisitionSchema),
        mode: "onChange",
        defaultValues: {
            department: "hr",
            requisitionType: requisitionType as any,
            reason: "",
            notes: "",
        },
    })

    useEffect(() => {
        form.reset({
            department: "hr",
            requisitionType: requisitionType as any,
            reason: "",
            notes: "",
        })
    }, [requisitionType, form])


    async function onSubmit(data: HRRequisitionFormValues) {
    try {
        let category: string | null = null
        let startDate: string | null = null
        let endDate: string | null = null
        let startTime: string | null = null
        let endTime: string | null = null

        if (isLeaveRequest) {
            category = data.leaveType ?? null
            startDate = data.startDate ?? null
            endDate = data.endDate ?? null
        }

        if (isPermissionRequest) {
            category = data.permissionType ?? null
            startDate = data.date ?? null
            startTime = data.fromTime ?? null
            endTime = data.toTime ?? null
        }

        if (isEmergencyAbsent) {
            category = data.emergencyType ?? null
            startDate = data.date ?? null
            startTime = data.fromTime ?? null
            endTime = data.toTime ?? null
        }

        if (isEmergencyAbsent && !file) {
            throw new Error("Supporting document is required for emergency absence.")
        }

        let fileUrl: string | null = null

        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                throw new Error("File size must be less than 5MB.")
            }

            const fileExt = file.name.split(".").pop()
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `supporting-documents/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from("request-documents")
                .upload(filePath, file, {
                upsert: true,
                })

            if (uploadError) throw uploadError

            const { data: publicUrlData } = supabase.storage
                .from("request-documents")
                .getPublicUrl(filePath)

            fileUrl = publicUrlData.publicUrl
        }

        const { data: deptData, error: deptError } = await supabase
            .from("requisition_department")
            .select("id")
            .eq("slug", "hr")
            .single()

        if (deptError || !deptData) {
            throw new Error("HR department not found.")
        }

        const { data: typeData, error: typeError } = await supabase
            .from("requisition_requisition_type")
            .select("id")
            .eq("slug", requisitionType)
            .eq("department_id", deptData.id)
            .single()

        if (typeError || !typeData) {
            throw new Error("Requisition type not found.")
        }

        const { error: insertError } = await supabase
            .from("requests")
            .insert([
                {
                    org_id: "6892dc7e-ab35-4283-b327-5b00ac436b63",
                    department_id: deptData.id,
                    requisition_type_id: typeData.id,
                    start_date: startDate,
                    end_date: endDate,
                    start_time: startTime,
                    end_time: endTime,
                    description: data.reason,
                    supporting_document_url: fileUrl,
                }
            ])

        if (insertError) throw insertError

        setDialogTitle("Success")
        setDialogMessage("Your request has been submitted successfully.")
        setShowDialog(true)

    } catch (error: any) {
        setDialogTitle("Error")
        setDialogMessage(error.message || "Something went wrong.")
        setShowDialog(true)
    }
}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
                className='grid grid-cols-5 gap-6 border border-grey-200 rounded-md p-4'
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
                            <div className='grid grid-cols-3 gap-4 px-7'>
                                <FormField
                                    control={form.control}
                                    name="leaveType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>Leave Type</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                >
                                                <FormControl>
                                                    <SelectTrigger className='w-full border-[#CCCCCC] rounded-full'>
                                                        <SelectValue placeholder='Select leave type...' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='annual'>Annual Leave</SelectItem>
                                                    <SelectItem value='sick'>Sick Leave</SelectItem>
                                                    <SelectItem value='personal'>Personal Leave</SelectItem>
                                                    <SelectItem value='maternity'>Maternity Leave</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>Start Date</FormLabel>
                                            <FormControl>
                                                <Input type='date' className='border-[#CCCCCC] rounded-full' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>End Date</FormLabel>
                                            <FormControl>
                                                <Input type='date' className='border-[#CCCCCC] rounded-full' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {isPermissionRequest && (
                            <div className='grid grid-cols-4 gap-4 px-7'>
                                <FormField
                                    control={form.control}
                                    name="permissionType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>Permission Type*</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                >
                                                <FormControl>
                                                    <SelectTrigger className='w-full border-[#CCCCCC] rounded-full'>
                                                        <SelectValue placeholder='Select type...' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='doctors_appointment'>Doctor's Appoinment</SelectItem>
                                                    <SelectItem value='personal_matters'>Personal Matters</SelectItem>
                                                    <SelectItem value='family_commitment'>Family Commitment</SelectItem>
                                                    <SelectItem value='bank_gov'>Bank / Government Office</SelectItem>
                                                    <SelectItem value='other'>Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>Date*</FormLabel>
                                            <FormControl>
                                                <Input type='date' className='border-[#CCCCCC] rounded-full' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fromTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>From Time*</FormLabel>
                                            <FormControl>
                                                <Input type='time' className='border-[#CCCCCC] rounded-full' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="toTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>To Time*</FormLabel>
                                            <FormControl>
                                                <Input type='time' className='border-[#CCCCCC] rounded-full' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        {isEmergencyAbsent && (
                            <div className='grid grid-cols-4 gap-4 px-7'>
                                <FormField
                                    control={form.control}
                                    name="emergencyType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>Emergency Type*</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                >
                                                <FormControl>
                                                    <SelectTrigger className='w-full border-[#CCCCCC] rounded-full'>
                                                        <SelectValue placeholder='Select emergency...' />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='medical'>Medical Emergency</SelectItem>
                                                    <SelectItem value='family'>Family Emergency</SelectItem>
                                                    <SelectItem value='accident'>Accident</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>Date*</FormLabel>
                                            <FormControl>
                                                <Input type='date' className='border-[#CCCCCC] rounded-full' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="fromTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>From Time*</FormLabel>
                                            <FormControl>
                                                <Input type='time' className='border-[#CCCCCC] rounded-full' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="toTime"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-[#3E3E3E] text-xs font-normal'>To Time*</FormLabel>
                                            <FormControl>
                                                <Input type='time' className='border-[#CCCCCC] rounded-full' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        )}

                        <div className='grid grid-cols-2 gap-4 px-7'>
                            <FormField
                                control={form.control}
                                name="reason"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-[#3E3E3E] text-xs font-normal'>Reason / Explanation *</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='Explain reason for request'
                                                className='min-h-35 border-[#CCCCCC] resize-none text-grey-300 text-[10px]'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                    <div className="relative">
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
                                            <p className="text-xs text-red-700">
                                                {file ? file.name : "Click to upload"}
                                            </p>
                                            <p className='text-[10px] text-red-600'>
                                                PDF, JPG, PNG (Max 5MB)
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative">
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
                                            <Upload className='w-8 h-8 text-gray-400 mx-auto mb-2' />
                                            <p className='text-xs'>
                                                {file ? file.name : "Click to upload"}
                                            </p>
                                            <p className='text-[10px] text-gray-500'>
                                                PDF, JPG, PNG (Max 5MB)
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='px-7 mb-4'>
                            <Button type="submit" className='w-full bg-neutral-black text-white py-2'>
                                Add
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Dialog for success/error */}
                <Dialog
                    open={showDialog}
                    onOpenChange={(open) => {
                        setShowDialog(open);
                        if (!open && dialogTitle === "Success") {
                            router.push("/dashboard/requisition/raise-requisition");
                        }
                    }}
                >
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

                {/* Additional Information Section */}
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
                                            Annual Leave: 20 days per year (must be requested 2 weeks in advance)
                                        </li>
                                        <li>
                                            Sick Leave: 10 days per year (medical certificate required after 3 days)
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
                                            <p className='text-2xl font-bold text-center text-green-500'>11</p>
                                            <p className='text-[8px] text-center text-neutral-black'>Annual Leave of 30 days</p>
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
                                                <li>Permission requests are for partial day absences</li>
                                                <li>Must be requested at least 24 hours in advance</li>
                                                <li>If approved, no salary deduction will apply</li>
                                            </>
                                        ) : (
                                            <>
                                                <li>Must provide supporting documents</li>
                                                <li>Submit within 24 hours of emergency absence</li>
                                                <li>Manager Approval Required</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </>
                        )}

                        {isLeaveRequest && (
                            <FormField
                                control={form.control}
                                name="notes"
                                render={({ field }) => (
                                    <FormItem className='mb-3'>
                                        <FormLabel className='text-[#3E3E3E] text-[10px] font-normal'>Additional Notes (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea className='min-h-15 bg-white border-gray-200 resize-none text-xs' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </div>
            </form>
        </Form>
    )
}
