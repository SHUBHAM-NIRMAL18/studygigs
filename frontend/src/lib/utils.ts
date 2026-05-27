import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')         // Replace spaces with -
    .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
    .replace(/\-\-+/g, '-')       // Replace multiple - with single -
    .replace(/^-+/, '')           // Trim - from start of text
    .replace(/-+$/, '');          // Trim - from end of text
}

export function getTaskPath(task: { id: string; title: string }): string {
  return `/tasks/${slugify(task.title || 'task')}-${task.id}`
}

import { format, formatDistanceToNow } from 'date-fns'

export function isValidDate(date: any): boolean {
  if (!date) return false
  const parsed = new Date(date)
  return !isNaN(parsed.getTime())
}

export function formatSafe(date: any, formatStr: string, fallback = 'N/A'): string {
  if (!isValidDate(date)) return fallback
  return format(new Date(date), formatStr)
}

export function formatDistanceToNowSafe(date: any, options?: Parameters<typeof formatDistanceToNow>[1], fallback = 'N/A'): string {
  if (!isValidDate(date)) return fallback
  return formatDistanceToNow(new Date(date), options)
}

