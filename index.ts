import { NextRequest, NextResponse } from 'next/server'
import { getAllMembers, addMember, getMemberByEmail } from '@/lib/sheets'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  try {
    if (email) {
      // Public: search by email (customer page)
      const member = await getMemberByEmail(email)
      if (!member) {
        return NextResponse.json({ success: false, error: 'ไม่พบอีเมลนี้ในระบบ' }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: member })
    }

    // Admin: get all members
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const members = await getAllMembers()
    return NextResponse.json({ success: true, data: members })
  } catch (error) {
    console.error('GET /api/members error:', error)
    return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, familyGroup, expireDate, paymentStatus, paymentLink, note } = body

    if (!email || !familyGroup || !expireDate) {
      return NextResponse.json({ success: false, error: 'กรุณากรอกข้อมูลให้ครบถ้วน' }, { status: 400 })
    }

    // Check duplicate
    const existing = await getMemberByEmail(email)
    if (existing) {
      return NextResponse.json({ success: false, error: 'อีเมลนี้มีในระบบแล้ว' }, { status: 400 })
    }

    await addMember({ email, familyGroup, expireDate, paymentStatus: paymentStatus || 'Pending', paymentLink: paymentLink || '', note: note || '' })
    return NextResponse.json({ success: true, message: 'เพิ่มสมาชิกสำเร็จ' })
  } catch (error) {
    console.error('POST /api/members error:', error)
    return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาด กรุณาลองใหม่' }, { status: 500 })
  }
}
