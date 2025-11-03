declare global {
  interface Window {
    gtag?: (command: 'config' | 'event' | 'js', targetOrDate: string | Date, params?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}
