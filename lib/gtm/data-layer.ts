declare global {
  interface Window {
    dataLayer: any[]
  }
}

if (typeof window !== "undefined" && !window.dataLayer) {
  window.dataLayer = []
}

export const dataLayer = {
  push: (data: Record<string, any>) => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push(data)
    }
  },

  viewProject: (data: {
    project_id: string | number
    project_name: string
    project_category: string
    project_slug: string
  }) => {
    dataLayer.push({ event: "view_project", ...data })
  },

  contactFormSubmit: (data: {
    project_type: string
    project_location: string
    has_phone: boolean
    has_message: boolean
  }) => {
    dataLayer.push({ event: "contact_form_submit", form_name: "contact_enquiry", ...data })
  },

  careersFormSubmit: (data: {
    position: string
    experience: string
    has_portfolio: boolean
    has_cv: boolean
  }) => {
    dataLayer.push({ event: "careers_form_submit", form_name: "careers_application", ...data })
  },

  vipFormSubmit: (data: {
    profession: string
    interest: string
    source: string
  }) => {
    dataLayer.push({ event: "vip_form_submit", form_name: "vip_registration", ...data })
  },

  newsletterSubscribe: () => {
    dataLayer.push({ event: "newsletter_subscribe", form_name: "newsletter" })
  },
}
