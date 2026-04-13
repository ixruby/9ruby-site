'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import {
  Users, Bot, User, Activity, ArrowLeft,
  Plus, CheckCircle, Clock, AlertTriangle,
  Zap, Cpu, Timer, Phone, Mail, Shield,
  ChevronDown, Calendar, UserPlus,
} from 'lucide-react'

/* ═══════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════ */

interface TeamMember {
  id: string
  name: string
  role: string
  type: 'human' | 'ai' | 'scheduled'
  status: 'active' | 'scheduled' | 'offline'
  avatar: string
  description: string
  stats?: { label: string; value: string }[]
  nextRun?: string
}

interface Task {
  id: string
  title: string
  assignedTo: string
  priority: 'high' | 'medium' | 'low'
  status: 'done' | 'active' | 'pending'
  dueDate: string
}

interface ActivityItem {
  id: string
  action: string
  actor: string
  timestamp: string
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const overviewStats = [
  { label: 'Total Members', value: '4', icon: Users },
  { label: 'AI Agents', value: '3', icon: Bot },
  { label: 'Human', value: '1', icon: User },
  { label: 'Active Now', value: '4', icon: Activity },
]

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Vishnu Madhavan',
    role: 'Founder / CEO',
    type: 'human',
    status: 'active',
    avatar: 'VM',
    description: 'Everything — strategy, dev, design, ops, sales',
    stats: [
      { label: 'Projects', value: '15' },
      { label: 'Ventures', value: '4' },
    ],
  },
  {
    id: '2',
    name: 'Claude Code',
    role: 'AI Agent',
    type: 'ai',
    status: 'active',
    avatar: 'CC',
    description: 'AI pair programmer & code architect',
    stats: [
      { label: 'Tasks', value: '52' },
      { label: 'Completed', value: '16' },
    ],
  },
  {
    id: '3',
    name: 'JARVIS',
    role: 'AI Assistant',
    type: 'ai',
    status: 'active',
    avatar: 'JV',
    description: 'Phone control, home automation, task orchestration',
    stats: [
      { label: 'Automations', value: '38' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
  {
    id: '4',
    name: 'Daily Digest',
    role: 'Scheduled Agent',
    type: 'scheduled',
    status: 'scheduled',
    avatar: 'DD',
    description: 'Morning briefing, metrics summary, daily planning',
    nextRun: '5:00 AM UTC',
    stats: [
      { label: 'Reports Sent', value: '127' },
      { label: 'Next Run', value: '5am UTC' },
    ],
  },
]

const initialTasks: Task[] = [
  { id: '1', title: 'Deploy 9ruby-ai v2.0', assignedTo: 'Claude Code', priority: 'high', status: 'active', dueDate: 'Apr 8' },
  { id: '2', title: 'Client proposal - NovaVox', assignedTo: 'Vishnu Madhavan', priority: 'high', status: 'pending', dueDate: 'Apr 9' },
  { id: '3', title: 'Automate invoice reminders', assignedTo: 'JARVIS', priority: 'medium', status: 'active', dueDate: 'Apr 10' },
  { id: '4', title: 'Generate weekly metrics', assignedTo: 'Daily Digest', priority: 'low', status: 'done', dueDate: 'Apr 7' },
  { id: '5', title: 'Saumya Properties SEO audit', assignedTo: 'Claude Code', priority: 'medium', status: 'pending', dueDate: 'Apr 12' },
]

const activityLog: ActivityItem[] = [
  { id: '1', action: 'Deployed 9ruby.com to production', actor: 'Claude Code', timestamp: '2 hours ago' },
  { id: '2', action: 'Completed daily metrics report', actor: 'Daily Digest', timestamp: '5 hours ago' },
  { id: '3', action: 'Triggered home automation sequence', actor: 'JARVIS', timestamp: '6 hours ago' },
  { id: '4', action: 'Reviewed and merged PR #42', actor: 'Vishnu Madhavan', timestamp: '8 hours ago' },
  { id: '5', action: 'Ran security audit on all projects', actor: 'Claude Code', timestamp: '1 day ago' },
  { id: '6', action: 'Scheduled backup for Drive Organizer', actor: 'JARVIS', timestamp: '1 day ago' },
]

const roles = ['Developer', 'Designer', 'Marketing', 'Support'] as const

/* ═══════════════════════════════════════════
   HELPER COMPONENTS
   ═══════════════════════════════════════════ */

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    active: 'bg-emerald-500',
    scheduled: 'bg-amber-500',
    offline: 'bg-white/30',
    green: 'bg-emerald-500',
    yellow: 'bg-amber-500',
    red: 'bg-red-500',
  }
  return (
    <span className="relative flex h-2 w-2">
      {status === 'active' && (
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-40 ${colors[status] || 'bg-white/30'}`} />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colors[status] || 'bg-white/30'}`} />
    </span>
  )
}

function PriorityPill({ priority }: { priority: 'high' | 'medium' | 'low' }) {
  const config = {
    high: 'text-red-400 bg-red-500/10',
    medium: 'text-amber-400 bg-amber-500/10',
    low: 'text-[#7A7A72] bg-[#F8F7F4]',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono ${config[priority]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        priority === 'high' ? 'bg-red-400' : priority === 'medium' ? 'bg-amber-400' : 'bg-white/30'
      }`} />
      {priority}
    </span>
  )
}

function TaskStatusBadge({ status }: { status: 'done' | 'active' | 'pending' }) {
  const config = {
    done: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle },
    active: { text: 'text-[#C41A3B]', bg: 'bg-[#C41A3B]/10', icon: Zap },
    pending: { text: 'text-[#7A7A72]', bg: 'bg-[#F8F7F4]', icon: Clock },
  }
  const c = config[status]
  const Icon = c.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono ${c.bg} ${c.text}`}>
      <Icon size={11} />
      {status}
    </span>
  )
}

function MemberTypePill({ type }: { type: string }) {
  const config: Record<string, string> = {
    human: 'text-emerald-400 bg-emerald-500/10',
    ai: 'text-[#7A7A72] bg-[#F8F7F4]',
    scheduled: 'text-amber-400 bg-amber-500/10',
  }
  return (
    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${config[type] || 'text-[#B8B8B0] bg-[#F8F7F4]'}`}>
      {type}
    </span>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */

export default function TeamPage() {
  const [tasks] = useState<Task[]>(initialTasks)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formRole, setFormRole] = useState<string>(roles[0])
  const [formPerms, setFormPerms] = useState<Record<string, boolean>>({
    dashboard: true,
    deploy: false,
    billing: false,
    admin: false,
  })
  const [showFormSuccess, setShowFormSuccess] = useState(false)

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    setShowFormSuccess(true)
    setFormName('')
    setFormEmail('')
    setFormRole(roles[0])
    setFormPerms({ dashboard: true, deploy: false, billing: false, admin: false })
    setTimeout(() => setShowFormSuccess(false), 3000)
  }

  const togglePerm = (key: string) => {
    setFormPerms((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--page-bg)" }}>
      <Navbar />

      <div className="pt-28 pb-20 max-w-[1400px] mx-auto px-6">

        {/* ── Header ── */}
        <div className="mb-12 animate-slide-up">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[#B8B8B0] hover:text-[#7A7A72] transition-colors text-xs font-mono mb-6"
          >
            <ArrowLeft size={12} />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl sm:text-5xl font-serif italic tracking-tighter" style={{ color: "var(--ink-strong)" }}>
            Team Management
          </h1>
          <p className="text-[#7A7A72] text-sm font-mono mt-2">
            Manage your team members, AI agents &amp; task assignments
          </p>
        </div>

        {/* ══════ 1. TEAM OVERVIEW STATS ══════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-slide-up delay-100">
          {overviewStats.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="rounded-2xl border border-black/[0.04] bg-white p-6 hover:border-black/[0.08] transition-all duration-300"
              >
                <Icon size={16} className="text-[#B8B8B0] mb-4" />
                <p className="text-3xl font-mono font-semibold text-white tracking-tight">{s.value}</p>
                <p className="text-sm text-[#7A7A72] mt-1">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* ══════ 2. TEAM MEMBERS GRID ══════ */}
        <div className="mb-10 animate-slide-up delay-200">
          <h2 className="text-xs font-mono text-[#B8B8B0] uppercase tracking-widest mb-4">Team Members</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((m) => (
              <div
                key={m.id}
                className="rounded-2xl border border-black/[0.04] bg-white p-6 hover:border-black/[0.08] transition-all duration-300 group"
              >
                {/* Top row: avatar + status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-mono font-semibold ${
                      m.type === 'human' ? 'bg-emerald-500/10 text-emerald-400' :
                      m.type === 'ai' ? 'bg-[#F8F7F4] text-[#1A1A1A]/80' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {m.avatar}
                    </div>
                    {m.status === 'active' && (
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#F8F7F4]" />
                    )}
                  </div>
                  <MemberTypePill type={m.type} />
                </div>

                {/* Name + role */}
                <h3 className="text-sm font-semibold text-white mb-0.5">{m.name}</h3>
                <p className="text-xs text-[#7A7A72] font-mono mb-3">{m.role}</p>
                <p className="text-xs text-[#7A7A72] leading-relaxed mb-4">{m.description}</p>

                {/* Stats row */}
                {m.stats && (
                  <div className="flex gap-6 pt-4 border-t border-black/[0.04]">
                    {m.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="text-base font-mono font-semibold text-[#1A1A1A]">{stat.value}</p>
                        <p className="text-[10px] text-[#B8B8B0] uppercase tracking-wider font-mono">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ══════ 3 + 4. ADD MEMBER FORM & TASK ASSIGNMENT ══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 animate-slide-up delay-300">

          {/* Add Team Member Form */}
          <div className="rounded-2xl border border-black/[0.04] bg-white hover:border-black/[0.08] transition-all duration-300">
            <div className="px-6 py-5 border-b border-black/[0.04] flex items-center gap-2">
              <UserPlus size={14} className="text-[#B8B8B0]" />
              <h2 className="text-xs font-mono text-[#B8B8B0] uppercase tracking-widest">Add Team Member</h2>
            </div>
            <div className="p-6">
              {showFormSuccess && (
                <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
                  <CheckCircle size={14} />
                  Invitation sent successfully
                </div>
              )}

              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#B8B8B0] mb-1.5 font-mono">Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.08] text-white text-sm placeholder:text-[#B8B8B0] focus:outline-none focus:border-black/[0.15] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#B8B8B0] mb-1.5 font-mono">Email</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                    placeholder="email@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.08] text-white text-sm placeholder:text-[#B8B8B0] focus:outline-none focus:border-black/[0.15] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#B8B8B0] mb-1.5 font-mono">Role</label>
                  <div className="relative">
                    <select
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.08] text-white text-sm appearance-none focus:outline-none focus:border-black/[0.15] transition-colors cursor-pointer"
                    >
                      {roles.map((r) => (
                        <option key={r} value={r} className="bg-white text-[#1A1A1A]">{r}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B8B8B0] pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#B8B8B0] mb-2 font-mono">Permissions</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(formPerms).map(([key, checked]) => (
                      <label
                        key={key}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg border border-black/[0.04] hover:border-black/[0.08] cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => togglePerm(key)}
                          className="sr-only peer"
                        />
                        <div className="w-4 h-4 rounded border border-black/[0.08] bg-black peer-checked:bg-[#1A1A1A] peer-checked:border-[#1A1A1A] flex items-center justify-center transition-all">
                          {checked && <CheckCircle size={10} className="text-[#1A1A1A]" />}
                        </div>
                        <span className="text-xs text-[#7A7A72] capitalize">{key}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-full bg-[#1A1A1A] hover:bg-[#333] text-[#F8F7F4] text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus size={14} />
                  Send Invitation
                </button>
              </form>
            </div>
          </div>

          {/* Task Assignment Table */}
          <div className="lg:col-span-2 rounded-2xl border border-black/[0.04] bg-white hover:border-black/[0.08] transition-all duration-300">
            <div className="px-6 py-5 border-b border-black/[0.04]">
              <h2 className="text-xs font-mono text-[#B8B8B0] uppercase tracking-widest">Task Assignment</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[#B8B8B0] text-xs uppercase tracking-wider border-b border-black/[0.04]">
                    <th className="text-left px-6 py-3 font-medium">Task</th>
                    <th className="text-left px-6 py-3 font-medium hidden sm:table-cell">Assigned To</th>
                    <th className="text-left px-6 py-3 font-medium">Priority</th>
                    <th className="text-left px-6 py-3 font-medium">Status</th>
                    <th className="text-right px-6 py-3 font-medium hidden sm:table-cell">Due</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t, i) => (
                    <tr
                      key={t.id}
                      className={`hover:bg-[#F8F7F4] transition-colors ${
                        i < tasks.length - 1 ? 'border-b border-black/[0.04]' : ''
                      }`}
                    >
                      <td className="px-6 py-4 text-white font-medium">{t.title}</td>
                      <td className="px-6 py-4 text-[#7A7A72] hidden sm:table-cell font-mono text-xs">{t.assignedTo}</td>
                      <td className="px-6 py-4"><PriorityPill priority={t.priority} /></td>
                      <td className="px-6 py-4"><TaskStatusBadge status={t.status} /></td>
                      <td className="px-6 py-4 text-right text-[#7A7A72] font-mono text-xs hidden sm:table-cell">{t.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ══════ 5. ACTIVITY LOG ══════ */}
        <div className="animate-slide-up delay-500">
          <div className="rounded-2xl border border-black/[0.04] bg-white hover:border-black/[0.08] transition-all duration-300">
            <div className="px-6 py-5 border-b border-black/[0.04]">
              <h2 className="text-xs font-mono text-[#B8B8B0] uppercase tracking-widest">Activity Log</h2>
            </div>
            <div className="divide-y divide-black/[0.04]">
              {activityLog.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F7F4] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#F8F7F4] flex items-center justify-center shrink-0">
                    <Activity size={14} className="text-[#B8B8B0]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1A1A1A]/80">{a.action}</p>
                    <p className="text-xs text-[#B8B8B0] font-mono">{a.actor}</p>
                  </div>
                  <span className="text-xs text-[#B8B8B0] font-mono whitespace-nowrap">{a.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer note ── */}
        <div className="mt-16 text-center">
          <p className="text-xs text-[#B8B8B0] font-mono">
            9Ruby Team Management &middot; {teamMembers.length} members active
          </p>
        </div>
      </div>
    </main>
  )
}
