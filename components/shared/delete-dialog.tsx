"use client"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

interface DeleteDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void
    title?: string
    description?: string
}

export function DeleteDialog({
    open,
    onOpenChange,
    onConfirm,
    title = "Alert",
    description = "Are you sure you want to DELETE this Item ?",
}: DeleteDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden gap-0" showClose={false} style={{ fontFamily: "Poppins" }}>

                {/* header bar */}
                <DialogHeader className="bg-neutral-black px-5 py-3 flex flex-row items-center justify-between">
                    <DialogTitle className="text-white text-lg leading-5 font-bold">
                        {title}
                    </DialogTitle>
                    <DialogClose className="text-white hover:text-gray-300 transition-colors">
                        <XCircle className="h-5 w-5" />
                    </DialogClose>
                </DialogHeader>

                {/* Body */}
                <div className="flex flex-col items-center justify-center py-16 px-8 bg-white">
                    <p className="text-center font-bold text-2xl leading-8 text-neutral-black">
                        {description}
                    </p>
                    <p className="mt-1 text-red-500 font-medium text-xs leading-none">
                        NOTE: This action can not be undone
                    </p>
                </div>

                {/* footer */}
                <DialogFooter className="bg-yellow-300 px-6 py-3 flex flex-row items-center justify-center gap-4 sm:justify-center">
                    <DialogClose asChild>
                        <Button
                            onClick={onConfirm}
                            className="w-[120px] h-[30px] bg-white text-neutral-black font-medium text-sm leading-5 hover:bg-gray-50 hover:text-neutral-900 rounded-md"
                        >
                            Yes DELETE
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={() => onOpenChange(false)}
                        className="w-[120px] h-[30px] bg-neutral-black text-white font-medium text-sm leading-5 hover:bg-black rounded-md"
                    >
                        NO
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}