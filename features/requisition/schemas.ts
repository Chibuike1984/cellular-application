import { z } from "zod";

// --- Enums / Constants ---

export const UrgencySchema = z.enum(["High", "Medium", "Low"]);
export const RequisitionStatusSchema = z.enum(["Approved", "Cancelled", "Pending"]);

// --- Shared Schemas ---

export const BaseRequisitionSchema = z.object({
    department: z.string(),
    requisitionType: z.string(),
    reason: z.string().min(1, "Reason is required"),
    notes: z.string().optional(),
});

// --- HR Schemas ---

export const LeaveRequestSchema = BaseRequisitionSchema.extend({
    leaveType: z.string().min(1, "Leave type is required"),
    startDate: z.string().min(1, "Start date is required"), // Consider z.date() if using Date objects directly
    endDate: z.string().min(1, "End date is required"),
});

export const PermissionRequestSchema = BaseRequisitionSchema.extend({
    permissionType: z.string().min(1, "Permission type is required"),
    date: z.string().min(1, "Date is required"),
    fromTime: z.string().min(1, "From time is required"),
    toTime: z.string().min(1, "To time is required"),
});

export const EmergencyRequestSchema = BaseRequisitionSchema.extend({
    emergencyType: z.string().min(1, "Emergency type is required"),
    date: z.string().min(1, "Date is required"),
    fromTime: z.string().min(1, "From time is required"),
    toTime: z.string().min(1, "To time is required"),
    // File upload validation (simplified for now as just string/object)
    supportingDocument: z.any().optional(),
});

// Discriminated Union for HR
export const HRRequisitionSchema = z.discriminatedUnion("requisitionType", [
    LeaveRequestSchema.extend({ requisitionType: z.literal("leave-req") }),
    PermissionRequestSchema.extend({ requisitionType: z.literal("permission-req") }),
    EmergencyRequestSchema.extend({ requisitionType: z.literal("emergency-absent") }),
]);


// --- Finance Schemas ---

export const FinanceRequestSchema = BaseRequisitionSchema.extend({
    amount: z.number().min(1, "Amount must be greater than 0"),
    expenseDate: z.string().min(1, "Date is required"),
    supportingDocument: z.any().optional(),
    category: z.string().min(1, "Category is required"),
});

// Discriminated Union for Finance
export const FinanceRequisitionSchema = z.discriminatedUnion("requisitionType", [
    FinanceRequestSchema.extend({ requisitionType: z.literal("expense-reimb") }),
    FinanceRequestSchema.extend({ requisitionType: z.literal("advance-payment") }),
    FinanceRequestSchema.extend({ requisitionType: z.literal("petty-cash") }),
]);


// --- IT Schemas ---

export const ITRequestSchema = BaseRequisitionSchema.extend({
    requiredDate: z.string().min(1, "Required date is required"),
    specifications: z.string().optional(),
    businessJustification: z.string().min(1, "Business justification is required"),
    supportingDocument: z.any().optional(),
    priority: UrgencySchema,
});

export const SoftwareRequestSchema = ITRequestSchema.extend({
    softwareName: z.string().min(1, "Software name is required"),
    licenseType: z.string().min(1, "License type is required"),
});

export const HardwareRequestSchema = ITRequestSchema.extend({
    equipmentName: z.string().min(1, "Equipment name is required"), // also covers System Name
    quantity: z.number().min(1, "Quantity must be at least 1").optional(), // optional for system access
});

export const ITRequisitionSchema = z.discriminatedUnion("requisitionType", [
    SoftwareRequestSchema.extend({ requisitionType: z.literal("software-license") }),
    HardwareRequestSchema.extend({ requisitionType: z.literal("equipment-repairs") }),
    HardwareRequestSchema.extend({ requisitionType: z.literal("maintenance-repair") }),
    HardwareRequestSchema.extend({ requisitionType: z.literal("system-access") }), // uses equipmentName as system name
    HardwareRequestSchema.extend({ requisitionType: z.literal("hardware-upgrade") }),
]);


// --- Item / Inventory Schemas ---

export const RequisitionItemSchema = z.object({
    id: z.string().optional(), // generated on client
    itemName: z.string().min(1, "Item name is required"),
    unit: z.string().min(1, "Unit is required"),
    requestedQty: z.coerce.number().min(1, "Quantity must be at least 1"),
    urgency: UrgencySchema,
    notes: z.string().optional(),
    category: z.string().optional(), // e.g. "Inventory Items"
});

export const InventoryRequisitionSchema = BaseRequisitionSchema.extend({
    items: z.array(RequisitionItemSchema).min(1, "At least one item is required"),
});

// --- Export types ---
export type LeaveRequestFormValues = z.infer<typeof LeaveRequestSchema>;
export type PermissionRequestFormValues = z.infer<typeof PermissionRequestSchema>;
export type EmergencyRequestFormValues = z.infer<typeof EmergencyRequestSchema>;
export type HRRequisitionFormValues = z.infer<typeof HRRequisitionSchema>;

export type FinanceRequisitionFormValues = z.infer<typeof FinanceRequisitionSchema>;
export type ITRequisitionFormValues = z.infer<typeof ITRequisitionSchema>;

export type InventoryRequisitionFormValues = z.infer<typeof InventoryRequisitionSchema>;
export type RequisitionItemValues = z.infer<typeof RequisitionItemSchema>;
