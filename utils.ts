import { NextRequest, NextResponse } from 'next/server'
import { validateAdminCredentials, createSession, getSession, SESSION_COOKIE } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ success: false, error: 'กรุณากรอก Username และ Password' }, { status: 400 })
    }

    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json({ success: false, error: 'Username หรือ Password ไม่ถูกต้อง' }, { status: 401 })
    }

    const token = await createSession(username)

    const response = NextResponse.json({ success: true, message: 'เข้าสู่ระบบสำเร็จ' })
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    })

    return response
  } catch (error) {
    console.error('POST /api/auth error:', error)
    return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาด' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'ออกจากระบบสำเร็จ' })
  response.cookies.delete(SESSION_COOKIE)
  return response
}

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }
  return NextResponse.json({ success: true, data: { username: session.username } })
}
