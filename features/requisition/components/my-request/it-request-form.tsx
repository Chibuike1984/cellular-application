'use client'

import { supabase } from "@/lib/lib/supabaseClient";
import { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useRequisitionStore } from '@/lib/stores/requisition-store';
import { ITRequisitionSchema, ITRequisitionFormValues } from '../../schemas';

interface ITRequestFormProps {
    requisitionType: string;
}

export function ITRequestForm({ requisitionType }: ITRequestFormProps) {
    const [infoTab, setInfoTab] = useState<'policy' | 'allocation' | 'docs' | 'sla'>('policy');
    const [file, setFile] = useState<File | null>(null);               
    const [showDialog, setShowDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");

    const router = useRouter();
    const { addRequest } = useRequisitionStore();

    const isSoftwareLicense = requisitionType === 'software-license';
    const isEquipmentRepairs = requisitionType === 'equipment-repairs';
    const isMaintenanceRepair = requisitionType === 'maintenance-repair';
    const isSystemAccess = requisitionType === 'system-access';
    const isHardwareUpgrade = requisitionType === 'hardware-upgrade';

    const form = useForm<ITRequisitionFormValues>({
        resolver: zodResolver(ITRequisitionSchema),
        defaultValues: {
            department: "it",
            requisitionType: requisitionType as any,
            softwareName: "",
            licenseType: "",
            equipmentName: "",
            quantity: 1,
            priority: "Medium",
            requiredDate: "",
            specifications: "",
            businessJustification: "",
        },
    });

    useEffect(() => {
        form.reset({
            department: "it",
            requisitionType: requisitionType as any,
            softwareName: "",
            licenseType: "",
            equipmentName: "",
            quantity: 1,
            priority: "Medium",
            requiredDate: "",
            specifications: "",
            businessJustification: "",
        });
    }, [requisitionType, form]);

    const getFieldLabel = () => {
        if (isSoftwareLicense) return 'Software Name*';
        if (isEquipmentRepairs || isMaintenanceRepair) return 'Equipment Name*';
        if (isSystemAccess) return 'System/Application Name*';
        if (isHardwareUpgrade) return 'Hardware Name*';
        return 'Item Name*';
    };

    const getLicenseTypeOptions = () => {
        if (isSoftwareLicense) {
            return [
                'Monthly Subscription',
                'Annual Subscription',
                'Perpetual Subscription',
                'Free / Trial'
            ];
        }
        return [];
    };

    const onSubmit = async (data: ITRequisitionFormValues): Promise<boolean> => {
        try {
            let fileUrl: string | null = null;

            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `uploads/${fileName}`;

                const { error: uploadError } = await supabase
                    .storage
                    .from('requisition-documents')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: publicData } = supabase
                    .storage
                    .from('requisition-documents')
                    .getPublicUrl(filePath);

                fileUrl = publicData?.publicUrl || null;
            }

            const { data: deptData, error: deptError } = await supabase
                .from("requisition_department")
                .select("id")
                .eq("slug", "it") 
                .single();

            if (deptError || !deptData) throw new Error("Department not found.");

            const { data: typeData, error: typeError } = await supabase
                .from("requisition_requisition_type")
                .select("id")
                .eq("slug", requisitionType)
                .eq("department_id", deptData.id)
                .single();

            if (typeError || !typeData) throw new Error("Requisition type not found.");

            const { error: insertError } = await supabase.from('requests').insert({
                org_id: '6892dc7e-ab35-4283-b327-5b00ac436b63',
                department_id: deptData.id,
                requisition_type_id: typeData.id,
                start_date: data.requiredDate,
                description: data.businessJustification,
                quantity: Number(data.quantity),
                urgency: data.priority,
                supporting_document_url: fileUrl
            });

            if (insertError) throw insertError;

            setDialogTitle('Success');
            setDialogMessage('Your request has been submitted successfully.');
            setShowDialog(true);
            form.reset();
            setFile(null);

            return true;

        } catch (error: any) {
            console.error(error);
            setDialogTitle('Error');
            setDialogMessage(error.message || 'Something went wrong.');
            setShowDialog(true);
            return false;
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-3 gap-6 rounded-lg border border-grey-200 p-3'>
                {/* Request Form  */}
                <div className='col-span-2 border border-grey-200 rounded-lg'>
                    <h2
                        style={{ fontSize: '16px', fontWeight: '600', lineHeight: '20px' }}
                        className='bg-[#F2F2F2] h-[41px] mb-6 py-2 px-6 text-neutral-black'
                    >
                        Request Details
                    </h2>

                    <div className='space-y-4 px-6 mb-5'>
                        {isSoftwareLicense && (
                            <div className='grid grid-cols-6 gap-4'>
                                <div className='col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name="softwareName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>Software Name*</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='e.g., Microsoft Office'
                                                        className='border rounded-full border-grey-200'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-1'>
                                    <FormField
                                        control={form.control}
                                        name="licenseType"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>License Type*</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className='border rounded-full w-full border-grey-200'>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {getLicenseTypeOptions().map(opt => (
                                                            <SelectItem key={opt} value={opt}>
                                                                {opt}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-1'>
                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>Priority*</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className='border rounded-full border-grey-200 w-full'>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='High'>High</SelectItem>
                                                        <SelectItem value='Medium'>Medium</SelectItem>
                                                        <SelectItem value='Low'>Low</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name="requiredDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>Required Date*</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='date'
                                                        className='border rounded-full border-grey-200'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {(isEquipmentRepairs || isMaintenanceRepair || isHardwareUpgrade) && (
                            <div className='grid grid-cols-6 gap-4'>
                                <div className='col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name="equipmentName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>{getFieldLabel()}</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='e.g., Dell Laptop, HP Printer'
                                                        className='border rounded-full border-grey-200'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-1'>
                                    <FormField
                                        control={form.control}
                                        name="quantity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                                                    {isHardwareUpgrade ? 'Quantity*' : 'Quantity'}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='number'
                                                        className='border rounded-full border-grey-200'
                                                        {...field}
                                                        onChange={e => field.onChange(Number(e.target.value))}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-1'>
                                    <FormField
                                        control={form.control}
                                        name="priority"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>Priority*</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className='border rounded-full border-grey-200 w-full'>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value='High'>High</SelectItem>
                                                        <SelectItem value='Medium'>Medium</SelectItem>
                                                        <SelectItem value='Low'>Low</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='col-span-2'>
                                    <FormField
                                        control={form.control}
                                        name="requiredDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>Required Date*</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='date'
                                                        className='border rounded-full border-grey-200'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        {isSystemAccess && (
                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="equipmentName" // reusing equipmentName for system name as per schema
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>System/Application Name*</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder='e.g., Salesforce, Jira, GitHub'
                                                        className='border rounded-full border-grey-200'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="requiredDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>Required Date*</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type='date'
                                                        className='border rounded-full border-grey-200'
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )}

                        <div className='grid grid-cols-2 gap-6'>
                            <div className='space-y-4'>
                                <FormField
                                    control={form.control}
                                    name="specifications"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>Specifications (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Provide detailed description'
                                                    className='min-h-10 bg-white border-grey-200 resize-none text-grey-300'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="businessJustification"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className='text-sm font-medium text-[#3E3E3E] block mb-2'>Business Justification *</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder='Why is equipment/software/access needed and how it will benefit your work'
                                                    className='min-h-10 bg-white border-grey-200 resize-none text-grey-300'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div>
                        <label className='text-sm font-medium text-[#3E3E3E] block mb-2'>
                            Upload Supporting Document*
                        </label>
                        <div className='relative h-[155px] border-2 border-dashed border-grey-400 rounded-lg p-8 text-center bg-[#F2F2F2] cursor-pointer'>
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
                        <Button type="submit" className='w-full bg-neutral-black text-white font-bold hover:bg-grey-900 py-2 mb-5'>
                            Add
                        </Button>
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
            </form>
        </Form>
    )
}
