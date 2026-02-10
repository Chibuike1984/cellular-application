import { AnalysisIcon } from "@/features/assets/react-icon/analysis-icon";
import { CalendarIcon } from "@/features/assets/react-icon/calender-icon";
import { CategoryIcon } from "@/features/assets/react-icon/category-icon";
import { DashboardIcon } from "@/features/assets/react-icon/dashboard-icon";
import { DeliveryIcon } from "@/features/assets/react-icon/delivery-icon";
import { EmployeeDirectoryIcon } from "@/features/assets/react-icon/employee-directory-icon";
import { FinancialIcon } from "@/features/assets/react-icon/financial-icon";
import { InventoryIcon } from "@/features/assets/react-icon/inventory-icon";
import { LiveOrderIcon } from "@/features/assets/react-icon/live-order-icon";
import { MenuIcon } from "@/features/assets/react-icon/menu-icon";
import { NewOrderIcon } from "@/features/assets/react-icon/new-order-icon";
import { OrderHistoryIcon } from "@/features/assets/react-icon/order-history-icon";
import { OrderIcon } from "@/features/assets/react-icon/order-icon";
import { ReceiptIcon } from "@/features/assets/react-icon/receipt-icon";
import { ReservationIcon } from "@/features/assets/react-icon/reservation-icon";
import { ReservationListIcon } from "@/features/assets/react-icon/reservation-list";
import { ScissorIcon } from "@/features/assets/react-icon/scissor-icon";
import { SettingsIcon } from "@/features/assets/react-icon/settings-icon";
import { StaffIcon } from "@/features/assets/react-icon/staff-icon";
import { SupportIcon } from "@/features/assets/react-icon/support-icon";
import { TableIcon } from "@/features/assets/react-icon/table-icon";
import { ViewMenuIcon } from "@/features/assets/react-icon/view-menu-icon";
import { WasteTrackIcon } from "@/features/assets/react-icon/waste-track-icon";
import { WishlistIcon } from "@/features/assets/react-icon/wishlist-icon";
import { CustomerCentreIcon } from "@/features/assets/react-icon/customer-icon";
import { DirectoryIcon } from "@/features/assets/react-icon/directory-icon";
import { FeedbackReviewIcon } from "@/features/assets/react-icon/feedback-icon";
import { PlugIcon } from "@/features/assets/react-icon/requisition-icon";
// import { CategoryIcon } from "@/features/assets/react-icon/category-icon";
import { BsBarChart } from "react-icons/bs";
import type { SidebarConfig } from "../types/type";

const SIDEBAR_CONFIG = [
  {
    name: "Dashboard",
    slug: "/dashboard",
    icon: DashboardIcon,
    exact: true,
  },
  {
    name: "Orders",
    icon: OrderIcon,
    slug: "/orders",
    items: [
      {
        icon: NewOrderIcon,
        name: "New Order",
        slug: "/dashboard/new-orders",
      },
      {
        icon: LiveOrderIcon,
        name: "Live Order",
        slug: "/dashboard/live-orders",
      },
      {
        icon: OrderHistoryIcon,
        name: "Order History",
        slug: "/dashboard/order-histories",
      },
      {
        icon: DeliveryIcon,
        name: "Delivery Management",
        slug: "/dashboard/delivery-management",
      },
    ],
    exact: false,
  },

  {
    name: "Reservation",
    icon: ReservationIcon,
    exact: false,
    items: [
      {
        icon: TableIcon,
        name: "Table Availability",
        slug: "/dashboard/table-availability",
      },
      {
        icon: ReservationListIcon,
        name: "Reservation List",
        slug: "/dashboard/reservation-list",
      },
      {
        icon: CalendarIcon,
        name: "Reservation Calender",
        slug: "/dashboard/reservation-calender",
      },
      {
        icon: WishlistIcon,
        name: "Wishlist Management",
        slug: "/dashboard/wishlist-management",
      },
    ],
  },

  {
    name: "Menu",
    icon: MenuIcon,
    items: [
      {
        icon: CategoryIcon,
        name: "Categories",
        slug: "/dashboard/categories",
      },
      {
        icon: ViewMenuIcon,
        name: "View Menu",
        slug: "/dashboard/menus",
      },
    ],
    exact: false,
  },

  {
    name: "Inventory",
    icon: InventoryIcon,
    items: [
      {
        icon: CategoryIcon,
        name: "Items",
        slug: "/dashboard/Inventories",
      },
      {
        icon: BsBarChart,
        name: "Stock Levels",
        slug: "/dashboard/stock-level",
      },
      {
        icon: LiveOrderIcon,
        name: "Purchase Orders",
        slug: "/dashboard/purchase-orders",
      },
      {
        icon: ScissorIcon,
        name: "Suppliers",
        slug: "/dashboard/suppliers",
      },
      {
        icon: WasteTrackIcon,
        name: "Expiry & Waste Tracking",
        slug: "/dashboard/expiry-&-waste-tracking",
      },
    ],
    exact: false,
  },

  {
    name: "Requisition",
    icon: PlugIcon,
    exact: false,
    items: [
      {
        icon: CategoryIcon,
        name: "My Request",
        slug: "/dashboard/my-request",
      },
      {
        icon: BsBarChart,
        name: "Departmental Requests",
        slug: "/dashboard/departmental-requests",
      },
      {
        icon: BsBarChart,
        name: "Returns",
        slug: "/dashboard/returns",
      },
      {
        icon: BsBarChart,
        name: "Approvals",
        slug: "/dashboard/approvals",
      },
    ],
  },

  {
    name: "Staff",
    icon: StaffIcon,
    items: [
      {
        icon: EmployeeDirectoryIcon,
        name: "Staff Directory",
        slug: "/dashboard/staff-directory",
      },
      {
        icon: BsBarChart,
        name: "Shift Scheduling",
        slug: "/dashboard/shift-scheduling",
      },
      {
        icon: LiveOrderIcon,
        name: "Payroll & Attendance",
        slug: "/dashboard/payroll-&-attendance",
      },
      {
        icon: ScissorIcon,
        name: "Staff Performance",
        slug: "/dashboard/staff-performance",
      },
    ],
    exact: false,
  },
  {
    name: "Financial",
    icon: FinancialIcon,
    items: [
      {
        icon: ReceiptIcon,
        name: "Sales Invoices ",
        slug: "/dashboard/sale-invoices",
      },
      {
        icon: BsBarChart,
        name: "Payments & Transactions",
        slug: "/dashboard/payments-&-transactions",
      },
      {
        icon: LiveOrderIcon,
        name: "Expense Tracking",
        slug: "/dashboard/expense-tracking",
      },
      {
        icon: ScissorIcon,
        name: "Financial Reports",
        slug: "/dashboard/financial-reports",
      },
    ],
    exact: false,
  },
  {
    name: "Analytics",
    icon: AnalysisIcon,
    items: [
      {
        icon: EmployeeDirectoryIcon,
        name: "Sales Reports",
        slug: "/dashboard/sales-reports",
      },
      {
        icon: BsBarChart,
        name: "Inventory Analysis",
        slug: "/dashboard/inventory-analysis",
      },
      {
        icon: LiveOrderIcon,
        name: "Customer Insights",
        slug: "/dashboard/customer-insights",
      },
      {
        icon: ScissorIcon,
        name: "Staff Performance",
        slug: "/dashboard/staff-performance",
      },
    ],
    exact: false,
  },
  {
    name: "Customer Center",
    icon: CustomerCentreIcon,
    items: [
      {
        icon: DirectoryIcon,
        name: "Directory",
        slug: "/dashboard/customer-center",
      },
      {
        icon: FeedbackReviewIcon,
        name: "Feedback & Review",
        slug: "/dashboard/feedback-&-review",
      },
    ],
    exact: true,
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    exact: false,
  },
  {
    name: "Support&Help",
    icon: SupportIcon,
    exact: true,
  },
] satisfies SidebarConfig[];

export { SIDEBAR_CONFIG };
