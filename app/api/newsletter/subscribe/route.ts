import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = (body.email as string)?.trim().toLowerCase()

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const existing = await prisma.newsletter.findUnique({ where: { email } })

    if (existing) {
      if (existing.isActive) {
        return NextResponse.json(
          { success: false, message: 'This email is already subscribed.' },
          { status: 409 }
        )
      }

      // Reactivate
      await prisma.newsletter.update({
        where: { email },
        data: {
          isActive: true,
          subscribedAt: new Date(),
          unsubscribedAt: null,
        },
      })
    } else {
      await prisma.newsletter.create({ data: { email } })
    }

    // Send notification via external API (non-blocking, don't fail the subscription)
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_EXTERNAL_API_URL}/api/form-submissions`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formData: { email },
            spreadsheetUrl: process.env.NEXT_PUBLIC_NEWSLETTER_SPREADSHEET_URL,
            emailReceiver: process.env.NEXT_PUBLIC_FORM_EMAIL_RECEIVER,
            metadata: {
              formType: 'newsletter-subscription',
              subject: 'New Newsletter Subscription - Ammache Architects',
            },
          }),
        }
      )
    } catch (emailErr) {
      console.error('Failed to send newsletter notification:', emailErr)
    }

    return NextResponse.json({
      success: true,
      message: "You're in! Welcome to Ammache VIP.",
    })
  } catch (error) {
    console.error('Newsletter subscribe error:', error)
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
