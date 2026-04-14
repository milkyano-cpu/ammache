'use client'

import { useState, FormEvent } from 'react'
import { dataLayer } from '@/lib/gtm/data-layer'

export function useNewsletterSubscribe() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()

    if (!consent) {
      setMessage({ text: 'Please agree to receive communications.', type: 'error' })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      setMessage({
        text: data.message,
        type: data.success ? 'success' : 'error',
      })

      if (data.success) {
        dataLayer.newsletterSubscribe()
        setEmail('')
        setConsent(false)
      }
    } catch {
      setMessage({ text: 'Something went wrong. Please try again.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return { email, setEmail, consent, setConsent, loading, message, handleSubmit }
}
