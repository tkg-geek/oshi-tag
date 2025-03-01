import { toast as sonnerToast } from "sonner"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastOptions {
  description?: string
  duration?: number
}

export function toast(
  message: string,
  type: ToastType = "info",
  options?: ToastOptions
) {
  const { description, duration } = options || {}

  switch (type) {
    case "success":
      sonnerToast.success(message, {
        description,
        duration,
      })
      break
    case "error":
      sonnerToast.error(message, {
        description,
        duration,
      })
      break
    case "warning":
      sonnerToast.warning(message, {
        description,
        duration,
      })
      break
    case "info":
    default:
      sonnerToast.info(message, {
        description,
        duration,
      })
      break
  }
}

// 簡易アクセス用のエクスポート
export const success = (message: string, options?: ToastOptions) =>
  toast(message, "success", options)

export const error = (message: string, options?: ToastOptions) =>
  toast(message, "error", options)

export const warning = (message: string, options?: ToastOptions) =>
  toast(message, "warning", options)

export const info = (message: string, options?: ToastOptions) =>
  toast(message, "info", options) 