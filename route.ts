import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin | YouTube Family Manager',
  description: 'ระบบจัดการสมาชิก YouTube Family',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
