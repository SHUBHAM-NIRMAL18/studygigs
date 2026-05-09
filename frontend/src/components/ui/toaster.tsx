"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { GraduationCap } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const isSuccess = props.variant === 'success'

        return (
          <Toast key={id} {...props}>
            <div className="flex gap-4">
              {isSuccess && (
                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                  <GraduationCap className="h-5 w-5 text-emerald-400" />
                </div>
              )}
              <div className="grid gap-1">
                {title && <ToastTitle className="text-sm font-black tracking-tight">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-xs font-medium opacity-80">{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose className="rounded-full hover:bg-white/10" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}