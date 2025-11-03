export const useAnalytics = () => {
  const trackClick = (eventName: string, eventParams: Record<string, string | undefined> = {}) => {
    if (typeof window.gtag !== 'function') {
      console.warn('Google Analytics (gtag) não está disponível.')
      return
    }

    window.gtag('event', eventName, {
      ...eventParams,
    })
  }

  return { trackClick }
}
