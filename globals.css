'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Users, CheckCircle2, Clock, XCircle, LogOut, Plus, Search,
  Filter, Edit2, Trash2, RefreshCw, Bell, ChevronDown, Youtube,
  CreditCard, ArrowRight, X
} from 'lucide-react'
import { Member, PaymentStatus, DashboardStats } from '@/types'
import { formatDateShort, getDaysRemaining, getStatusColor, getStatusLabel } from '@/lib/utils'

// ---- Login Screen ----
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (data.success) {
        onLogin()
      } else {
        setError(data.error || 'เข้าสู่ระบบไม่สำเร็จ')
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 safe-top">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-primary rounded-4xl shadow-soft mb-4">
            <Youtube className="w-10 h-10 text-brown-dark" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-brown-dark">Admin Panel</h1>
          <p className="text-brown-primary/60 text-sm mt-1">YouTube Family Manager</p>
        </div>

        <div className="card shadow-soft-lg">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-brown-primary mb-1.5 block">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="ชื่อผู้ใช้"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-brown-primary mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="รหัสผ่าน"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-600 text-sm text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>เข้าสู่ระบบ <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ---- Stat Card ----
function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className={`card flex items-center gap-3 ${color}`}>
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-2xl font-display font-semibold text-brown-dark leading-none">{value}</p>
        <p className="text-xs text-brown-primary/70 mt-0.5">{label}</p>
      </div>
    </div>
  )
}

// ---- Member Form Modal ----
function MemberModal({
  member,
  onClose,
  onSave,
}: {
  member?: Member
  onClose: () => void
  onSave: () => void
}) {
  const [form, setForm] = useState({
    email: member?.email || '',
    familyGroup: member?.familyGroup || '',
    expireDate: member?.expireDate || '',
    paymentStatus: (member?.paymentStatus || 'Pending') as PaymentStatus,
    paymentLink: member?.paymentLink || '',
    note: member?.note || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    if (!form.email || !form.familyGroup || !form.expireDate) {
      setError('กรุณากรอกข้อมูลที่จำเป็นให้ครบ')
      return
    }
    setLoading(true)
    setError('')
    try {
      const url = member ? `/api/members/${member.id}` : '/api/members'
      const method = member ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        onSave()
        onClose()
      } else {
        setError(data.error || 'บันทึกไม่สำเร็จ')
      }
    } catch {
      setError('เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  const groups = ['Family A', 'Family B', 'Family C', 'Family D', 'Family E']

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="bg-white rounded-t-4xl sm:rounded-4xl w-full max-w-md shadow-soft-lg animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-pink-light sticky top-0 bg-white rounded-t-4xl sm:rounded-t-4xl">
          <h2 className="font-display font-semibold text-brown-dark text-lg">
            {member ? 'แก้ไขสมาชิก' : 'เพิ่มสมาชิกใหม่'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-bg transition-colors">
            <X className="w-5 h-5 text-brown-primary" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <Field label="Email *">
            <input type="email" className="input-field" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" disabled={!!member} />
          </Field>

          <Field label="Family Group *">
            <select className="input-field" value={form.familyGroup} onChange={(e) => setForm({ ...form, familyGroup: e.target.value })}>
              <option value="">เลือก Group</option>
              {groups.map((g) => <option key={g} value={g}>{g}</option>)}
              <option value="custom">กำหนดเอง...</option>
            </select>
            {form.familyGroup === 'custom' && (
              <input type="text" className="input-field mt-2" placeholder="ชื่อ Group" onChange={(e) => setForm({ ...form, familyGroup: e.target.value })} />
            )}
          </Field>

          <Field label="วันหมดอายุ *">
            <input type="date" className="input-field" value={form.expireDate} onChange={(e) => setForm({ ...form, expireDate: e.target.value })} />
          </Field>

          <Field label="สถานะการชำระ">
            <div className="flex gap-2">
              {(['Paid', 'Pending', 'Expired'] as PaymentStatus[]).map((s) => {
                const c = getStatusColor(s)
                return (
                  <button
                    key={s}
                    onClick={() => setForm({ ...form, paymentStatus: s })}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                      form.paymentStatus === s ? `${c.bg} ${c.text} ${c.border}` : 'border-pink-light text-brown-primary/60'
                    }`}
                  >
                    {s === 'Paid' ? '✓ Paid' : s === 'Pending' ? '⏳ Pending' : '✗ Expired'}
                  </button>
                )
              })}
            </div>
          </Field>

          <Field label="ลิงก์ชำระเงิน">
            <input type="url" className="input-field" value={form.paymentLink} onChange={(e) => setForm({ ...form, paymentLink: e.target.value })} placeholder="https://..." />
          </Field>

          <Field label="หมายเหตุ">
            <input type="text" className="input-field" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="VIP, ส่วนลด, ฯลฯ" />
          </Field>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-3 text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="btn-secondary flex-1">ยกเลิก</button>
            <button onClick={handleSave} disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
              {loading ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : 'บันทึก'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-sm font-medium text-brown-primary mb-1.5 block">{label}</label>
      {children}
    </div>
  )
}

// ---- Member Row ----
function MemberRow({ member, onEdit, onDelete }: { member: Member; onEdit: () => void; onDelete: () => void }) {
  const colors = getStatusColor(member.paymentStatus)
  const days = member.expireDate ? getDaysRemaining(member.expireDate) : null

  return (
    <div className="card mb-3 animate-fade-in-up">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-brown-dark text-base truncate">{member.email}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-xs bg-pink-light text-brown-primary px-2 py-0.5 rounded-full font-medium">
              {member.familyGroup}
            </span>
            <span className={`status-badge text-xs ${colors.bg} ${colors.text} ${colors.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              {getStatusLabel(member.paymentStatus)}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-brown-primary/60">📅 {formatDateShort(member.expireDate)}</span>
            {days !== null && days >= 0 && days <= 3 && member.paymentStatus !== 'Expired' && (
              <span className="text-xs text-yellow-600 font-medium animate-pulse-soft">⚠️ {days}วัน</span>
            )}
            {member.note && <span className="text-xs text-brown-primary/50 truncate">📝 {member.note}</span>}
          </div>
        </div>
        <div className="flex gap-1.5 flex-shrink-0">
          <button onClick={onEdit} className="p-2.5 bg-pink-light rounded-xl text-brown-primary hover:bg-pink-primary transition-colors active:scale-95">
            <Edit2 className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-2.5 bg-red-50 rounded-xl text-red-400 hover:bg-red-100 transition-colors active:scale-95">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ---- Main Dashboard ----
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [filtered, setFiltered] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | ''>('')
  const [filterGroup, setFilterGroup] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editMember, setEditMember] = useState<Member | undefined>()
  const [tab, setTab] = useState<'dashboard' | 'members'>('dashboard')
  const [processingPayments, setProcessingPayments] = useState(false)
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth')
      setAuthed(res.ok)
    } catch {
      setAuthed(false)
    }
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [membersRes, statsRes] = await Promise.all([
        fetch('/api/members'),
        fetch('/api/stats'),
      ])
      const [membersData, statsData] = await Promise.all([membersRes.json(), statsRes.json()])
      if (membersData.success) {
        setMembers(membersData.data)
        setFiltered(membersData.data)
      }
      if (statsData.success) setStats(statsData.data)
    } catch {
      showToast('โหลดข้อมูลไม่สำเร็จ')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { checkAuth() }, [checkAuth])
  useEffect(() => { if (authed) loadData() }, [authed, loadData])

  useEffect(() => {
    let result = members
    if (search) result = result.filter((m) => m.email.toLowerCase().includes(search.toLowerCase()) || m.familyGroup.toLowerCase().includes(search.toLowerCase()))
    if (filterStatus) result = result.filter((m) => m.paymentStatus === filterStatus)
    if (filterGroup) result = result.filter((m) => m.familyGroup === filterGroup)
    setFiltered(result)
  }, [search, filterStatus, filterGroup, members])

  const allGroups = [...new Set(members.map((m) => m.familyGroup))].filter(Boolean)

  async function handleDelete(member: Member) {
    if (!confirm(`ลบ ${member.email} ออกจากระบบ?`)) return
    try {
      const res = await fetch(`/api/members/${member.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        showToast('ลบสมาชิกสำเร็จ')
        loadData()
      } else {
        showToast(data.error || 'ลบไม่สำเร็จ')
      }
    } catch {
      showToast('เกิดข้อผิดพลาด')
    }
  }

  async function handleProcessPayments() {
    setProcessingPayments(true)
    try {
      const res = await fetch('/api/payments', { method: 'POST' })
      const data = await res.json()
      showToast(data.message || 'ประมวลผลสำเร็จ')
      loadData()
    } catch {
      showToast('เกิดข้อผิดพลาด')
    } finally {
      setProcessingPayments(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' })
    setAuthed(false)
  }

  if (authed === null) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-10 h-10 border-3 border-pink-primary border-t-brown-primary rounded-full animate-spin" />
    </div>
  )

  if (!authed) return <LoginScreen onLogin={() => { setAuthed(true); loadData() }} />

  return (
    <div className="min-h-screen bg-bg safe-top">
      {/* Header */}
      <div className="page-header">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-pink-primary rounded-xl flex items-center justify-center">
              <Youtube className="w-5 h-5 text-brown-dark" />
            </div>
            <div>
              <h1 className="font-display font-semibold text-brown-dark text-base leading-none">Admin Panel</h1>
              <p className="text-xs text-brown-primary/60">YouTube Family</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadData} disabled={loading} className="p-2.5 bg-bg rounded-xl text-brown-primary hover:bg-pink-light transition-colors active:scale-95">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button onClick={handleLogout} className="p-2.5 bg-bg rounded-xl text-brown-primary hover:bg-pink-light transition-colors active:scale-95">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-b border-pink-light sticky top-[61px] z-10">
        <div className="max-w-2xl mx-auto flex">
          <TabBtn active={tab === 'dashboard'} onClick={() => setTab('dashboard')} label="Dashboard" />
          <TabBtn active={tab === 'members'} onClick={() => setTab('members')} label={`สมาชิก (${members.length})`} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* DASHBOARD TAB */}
        {tab === 'dashboard' && (
          <div className="space-y-4 animate-fade-in-up">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatCard label="สมาชิกทั้งหมด" value={stats?.total || 0} icon={<Users className="w-7 h-7 text-brown-primary" />} color="border-l-4 border-l-brown-primary" />
              <StatCard label="ชำระแล้ว" value={stats?.paid || 0} icon={<CheckCircle2 className="w-7 h-7 text-green-500" />} color="border-l-4 border-l-green-400" />
              <StatCard label="รอชำระ" value={stats?.pending || 0} icon={<Clock className="w-7 h-7 text-yellow-500" />} color="border-l-4 border-l-yellow-400" />
              <StatCard label="หมดอายุ" value={stats?.expired || 0} icon={<XCircle className="w-7 h-7 text-red-400" />} color="border-l-4 border-l-red-400" />
            </div>

            {/* Payment Processing */}
            <div className="card">
              <h3 className="font-display font-semibold text-brown-dark mb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-pink-dark" />
                ประมวลผลการชำระเงิน
              </h3>
              <p className="text-sm text-brown-primary/70 mb-3">อ่านข้อมูลจาก Sheet: Payments และอัปเดตสถานะสมาชิกอัตโนมัติ</p>
              <button
                onClick={handleProcessPayments}
                disabled={processingPayments}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {processingPayments ? (
                  <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                ) : (
                  <><RefreshCw className="w-4 h-4" /> ประมวลผลการชำระ</>
                )}
              </button>
            </div>

            {/* Notifications */}
            {(stats?.expiringIn3Days?.length || 0) > 0 && (
              <div className="card border-2 border-yellow-200 bg-yellow-50">
                <h3 className="font-display font-semibold text-yellow-700 mb-3 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  ใกล้หมดอายุภายใน 3 วัน ({stats!.expiringIn3Days.length} คน)
                </h3>
                <div className="space-y-2">
                  {stats!.expiringIn3Days.map((m) => (
                    <div key={m.id} className="flex items-center justify-between bg-white rounded-xl p-3 text-sm">
                      <span className="text-brown-dark font-medium truncate">{m.email}</span>
                      <span className="text-yellow-600 font-semibold ml-2 flex-shrink-0">
                        {getDaysRemaining(m.expireDate)}วัน
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(stats?.justExpired?.length || 0) > 0 && (
              <div className="card border-2 border-red-200 bg-red-50">
                <h3 className="font-display font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  หมดอายุแล้ว ({stats!.justExpired.length} คน)
                </h3>
                <div className="space-y-2">
                  {stats!.justExpired.slice(0, 5).map((m) => (
                    <div key={m.id} className="flex items-center justify-between bg-white rounded-xl p-3 text-sm">
                      <span className="text-brown-dark font-medium truncate">{m.email}</span>
                      <span className="text-red-600 text-xs">{formatDateShort(m.expireDate)}</span>
                    </div>
                  ))}
                  {stats!.justExpired.length > 5 && (
                    <p className="text-red-400 text-xs text-center">และอีก {stats!.justExpired.length - 5} รายการ</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MEMBERS TAB */}
        {tab === 'members' && (
          <div className="animate-fade-in-up">
            {/* Add Button */}
            <button
              onClick={() => { setEditMember(undefined); setShowModal(true) }}
              className="btn-primary w-full flex items-center justify-center gap-2 mb-4"
            >
              <Plus className="w-5 h-5" /> เพิ่มสมาชิกใหม่
            </button>

            {/* Search & Filter */}
            <div className="card mb-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-brown-primary/50" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ค้นหา Email หรือ Group..."
                  className="input-field pl-10"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-primary/50" />
                  <select
                    className="input-field pl-9 pr-8 appearance-none text-sm py-2.5"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as PaymentStatus | '')}
                  >
                    <option value="">ทุกสถานะ</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Expired">Expired</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-primary/50 pointer-events-none" />
                </div>
                <div className="relative flex-1">
                  <select
                    className="input-field pr-8 appearance-none text-sm py-2.5"
                    value={filterGroup}
                    onChange={(e) => setFilterGroup(e.target.value)}
                  >
                    <option value="">ทุก Group</option>
                    {allGroups.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-primary/50 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Member Count */}
            <p className="text-sm text-brown-primary/60 mb-3">
              แสดง {filtered.length} จาก {members.length} รายการ
            </p>

            {/* Members List */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-3 border-pink-primary border-t-brown-primary rounded-full animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="card text-center py-10">
                <p className="text-4xl mb-3">🔍</p>
                <p className="text-brown-primary/60">ไม่พบข้อมูลสมาชิก</p>
              </div>
            ) : (
              filtered.map((m) => (
                <MemberRow
                  key={m.id}
                  member={m}
                  onEdit={() => { setEditMember(m); setShowModal(true) }}
                  onDelete={() => handleDelete(m)}
                />
              ))
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <MemberModal
          member={editMember}
          onClose={() => setShowModal(false)}
          onSave={() => { loadData(); showToast(editMember ? 'อัปเดตสำเร็จ' : 'เพิ่มสมาชิกสำเร็จ') }}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-brown-dark text-white px-5 py-3 rounded-2xl shadow-soft-lg text-sm font-medium animate-fade-in-up z-50 safe-bottom">
          {toast}
        </div>
      )}
    </div>
  )
}

function TabBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-medium transition-all border-b-2 ${
        active ? 'text-brown-primary border-brown-primary' : 'text-brown-primary/40 border-transparent'
      }`}
    >
      {label}
    </button>
  )
}
