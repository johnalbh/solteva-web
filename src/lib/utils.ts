import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, "")
}

export function whatsappUrl(phone: string, messageEs?: string): string {
  const clean = phone.replace(/[\s+]/g, "")
  const msg = messageEs ? encodeURIComponent(messageEs) : ""
  return `https://wa.me/${clean}${msg ? `?text=${msg}` : ""}`
}
