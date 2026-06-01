import { NextRequest, NextResponse } from 'next/server'
import { checkAndUpdateExpired } from '@/lib/sheets'

export async function GET(request: NextRequest) {
  // Verify secret token from Apps Script
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const updated = await checkAndUpdateExpired()
    return NextResponse.json({
      success: true,
      message: `อัปเดตสถานะหมดอายุ ${updated} รายการ`,
      data: { updated },
    })
  } catch (error) {
    console.error('GET /api/cron/expire error:', error)
    return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}
