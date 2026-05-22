'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import {
  DollarSign, Users, Rocket, ClipboardList,
  ExternalLink, Plus, FileText, BarChart3, MessageSquare, Calendar,
  Activity, Cpu, CheckCircle,
  Zap, Bot, Timer, Server, Database, Phone, Cloud,
} from 'lucide-react'

/* =============================================
   HARDCODED DATA (will be dynamic later)
   ============================================= */

const stats = [
  { label: 'Total Revenue', value: '$12,450', icon: DollarSign, change: '+18%', positive: true },
  { label: 'Active Clients', value: '8', icon: Users, change: '+2', positive: true },
  { label: 'Projects Live', value: '15', icon: Rocket, change: '+3', positive: true },
  { label: 'Tasks Pending', value: '28', icon: ClipboardList, change: '-5', positive: true },
]

const quickActions = [
  { label: 'Deploy Site', icon: Rocket, href: '#', accent: true },
  { label: 'New Client', icon: Plus, href: '#' },
  { label: 'Send Invoice', icon: FileText, href: '#' },
  { label: 'Check Analytics', icon: BarChart3, href: '#' },
  { label: 'Open Slack', icon: MessageSquare, href: '#' },
  { label: 'View Calendar', icon: Calendar, href: '#' },
]

const projects = [
  { name: '9ruby.com', status: 'live', url: 'https://9ruby.com', lastDeploy: '2h ago' },
  { name: 'ix-ruby-agency', status: 'live', url: 'https://ix-ruby.com', lastDeploy: '5h ago' },
  { name: '9ruby-ai', status: 'live', url: 'https://ai.9ruby.com', lastDeploy: '1d ago' },
  { name: 'property-website', status: 'live', url: 'https://saumya.properties', lastDeploy: '3d ago' },
  { name: 'novavox', status: 'building', url: '--', lastDeploy: '--' },
]

const revenueData = [
  { month: 'Jan', amount: 2000, display: '$2k' },
  { month: 'Feb', amount: 3500, display: '$3.5k' },
  { month: 'Mar', amount: 4200, display: '$4.2k' },
  { month: 'Apr', amount: 2700, display: '$2.7k' },
]

const activityFeed = [
  { text: 'Deployed 9ruby.com to production', time: '2h ago', icon: Rocket },
  { text: 'New lead from contact form', time: '4h ago', icon: Users },
  { text: 'Invoice #007 paid - $4,500', time: '1d ago', icon: DollarSign },
  { text: 'Template marketplace launched', time: '2d ago', icon: Zap },
]

const agents = [
  { name: 'Claude Code', status: 'active', desc: 'AI pair programmer', icon: Bot },
  { name: 'JARVIS', status: 'active', desc: 'Task orchestrator', icon: Cpu },
  { name: 'Site Monitor', status: 'scheduled', desc: 'Uptime checks', icon: Activity },
  { name: 'Daily Digest', status: 'scheduled', desc: 'Morning briefing', icon: Timer },
]

const systemHealth = [
  { name: 'Vercel', status: 'green', icon: Cloud },
  { name: 'Supabase', status: 'yellow', icon: Database },
  { name: 'Ollama', status: 'green', icon: Server },
  { name: 'Phone', status: 'green', icon: Phone, label: 'Connected' },
]

/* =============================================
   HELPER COMPONENTS
   ============================================= */

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    live: 'bg-emerald-500',
    building: 'bg-amber-500',
    planned: 'bg-[#B8B8B0]',
    green: 'bg-emerald-500',
    yellow: 'bg-amber-500',
    red: 'bg-white/40',
  }
  return (
    <span className="relative flex h-2 w-2">
      {(status === 'live' || status === 'green' || status === 'active') && (
        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-40 ${colors[status] || 'bg-[#B8B8B0]'}`} />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${colors[status] || 'bg-[#B8B8B0]'}`} />
    </span>
  )
}

/* =============================================
   MAIN DASHBOARD
   ============================================= */

export default function DashboardPage() {
  const maxRevenue = Math.max(...revenueData.map(d => d.amount))
  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <main className="min-h-screen" style={{ background: '#F8F7F4' }}>
      <Navbar />

      <div className="pt-28 pb-20 max-w-[1400px] mx-auto px-6">

        {/* -- Header -- */}
        <div className="mb-12 animate-slide-up">
          <h1 className="text-4xl sm:text-5xl font-serif italic tracking-tighter" style={{ color: '#1A1A1A' }}>
            {greeting}, Vishnu
          </h1>
          <p className="text-sm font-mono mt-2" style={{ color: '#7A7A72' }}>
            CEO Command Center &middot; {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* ====== 1. STATS ROW ====== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 animate-slide-up delay-100">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.label}
                className="rounded-2xl bg-white p-6 hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300"
                style={{ border: '1px solid rgba(0,0,0,0.04)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon size={16} style={{ color: '#B8B8B0' }} />
                  <span className={`text-xs font-mono ${s.positive ? 'text-emerald-500' : 'text-white/60'}`}>
                    {s.change}
                  </span>
                </div>
                <p className="text-3xl font-serif italic font-semibold tracking-tight" style={{ color: '#1A1A1A' }}>{s.value}</p>
                <p className="text-sm mt-1" style={{ color: '#7A7A72' }}>{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* ====== 2. QUICK ACTIONS ====== */}
        <div className="mb-10 animate-slide-up delay-200">
          <h2 className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4" style={{ color: 'var(--accent)' }}>Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((a) => {
              const Icon = a.icon
              return (
                <button
                  key={a.label}
                  className={`group flex flex-col items-start gap-3 rounded-2xl p-4 text-left transition-all duration-300 cursor-pointer ${
                    a.accent
                      ? 'bg-[#1A1A1A] hover:bg-[#1A1A1A]/90'
                      : 'bg-white hover:shadow-lg hover:shadow-black/[0.03]'
                  }`}
                  style={!a.accent ? { border: '1px solid rgba(0,0,0,0.04)' } : {}}
                >
                  <Icon
                    size={18}
                    className="transition-colors duration-300"
                    style={{ color: a.accent ? '#F8F7F4' : '#7A7A72' }}
                  />
                  <span className="text-xs font-medium" style={{ color: a.accent ? '#F8F7F4' : '#7A7A72' }}>
                    {a.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ====== 3 + 4. PROJECTS TABLE & REVENUE ====== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 animate-slide-up delay-300">

          {/* Active Projects */}
          <div className="lg:col-span-2 rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              <h2 className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--accent)' }}>Active Projects</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wider" style={{ color: '#B8B8B0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                    <th className="text-left px-6 py-3 font-medium">Project</th>
                    <th className="text-left px-6 py-3 font-medium">Status</th>
                    <th className="text-left px-6 py-3 font-medium hidden sm:table-cell">URL</th>
                    <th className="text-right px-6 py-3 font-medium">Deployed</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p, i) => (
                    <tr
                      key={p.name}
                      className="hover:bg-black/[0.01] transition-colors"
                      style={i < projects.length - 1 ? { borderBottom: '1px solid rgba(0,0,0,0.04)' } : {}}
                    >
                      <td className="px-6 py-4 font-medium" style={{ color: '#1A1A1A' }}>{p.name}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-2 text-xs font-mono">
                          <StatusDot status={p.status} />
                          <span style={{ color: p.status === 'live' ? '#7A7A72' : '#B8B8B0' }}>{p.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        {p.url !== '--' ? (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#1A1A1A] transition-colors inline-flex items-center gap-1.5 text-xs font-mono"
                            style={{ color: '#7A7A72' }}
                          >
                            {p.url.replace('https://', '')} <ExternalLink size={10} />
                          </a>
                        ) : (
                          <span className="text-xs font-mono" style={{ color: '#B8B8B0' }}>--</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-mono text-xs" style={{ color: '#B8B8B0' }}>{p.lastDeploy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              <h2 className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--accent)' }}>Monthly Revenue</h2>
            </div>
            <div className="p-6">
              <div className="flex items-end justify-between gap-3 h-44">
                {revenueData.map((d) => {
                  const pct = (d.amount / maxRevenue) * 100
                  return (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-xs font-mono" style={{ color: '#7A7A72' }}>{d.display}</span>
                      <div className="w-full relative group">
                        <div
                          className="w-full rounded-md transition-all duration-500 group-hover:opacity-90"
                          style={{
                            height: `${pct * 1.2}px`,
                            background: '#1A1A1A',
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono" style={{ color: '#B8B8B0' }}>{d.month}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ====== 5 + 6 + 7. ACTIVITY, AGENTS, HEALTH ====== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up delay-500">

          {/* Recent Activity Feed */}
          <div className="rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              <h2 className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--accent)' }}>Recent Activity</h2>
            </div>
            <div className="p-6 space-y-0">
              {activityFeed.map((a, i) => {
                const Icon = a.icon
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-4"
                    style={i < activityFeed.length - 1 ? { borderBottom: '1px solid rgba(0,0,0,0.04)' } : {}}
                  >
                    <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(0,0,0,0.02)' }}>
                      <Icon size={14} style={{ color: '#B8B8B0' }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug" style={{ color: '#1A1A1A' }}>{a.text}</p>
                      <p className="text-xs font-mono mt-1" style={{ color: '#B8B8B0' }}>{a.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Team / Agents */}
          <div className="rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="px-6 py-5 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              <h2 className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--accent)' }}>Team / Agents</h2>
              <Link
                href="/dashboard/team"
                className="text-xs font-mono hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
                style={{ color: '#7A7A72' }}
              >
                Manage <ExternalLink size={10} />
              </Link>
            </div>
            <div className="p-4 space-y-1">
              {agents.map((a) => {
                const Icon = a.icon
                const isActive = a.status === 'active'
                return (
                  <div
                    key={a.name}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-black/[0.01] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.02)' }}>
                      <Icon size={14} style={{ color: '#7A7A72' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{a.name}</p>
                      <p className="text-xs" style={{ color: '#B8B8B0' }}>{a.desc}</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider" style={{ color: '#B8B8B0' }}>
                      <StatusDot status={isActive ? 'green' : 'yellow'} />
                      {a.status}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* System Health */}
          <div className="rounded-2xl bg-white hover:shadow-lg hover:shadow-black/[0.03] transition-all duration-300" style={{ border: '1px solid rgba(0,0,0,0.04)' }}>
            <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
              <h2 className="text-[11px] font-semibold tracking-[0.12em] uppercase" style={{ color: 'var(--accent)' }}>System Health</h2>
            </div>
            <div className="p-4 space-y-1">
              {systemHealth.map((s) => {
                const Icon = s.icon
                const statusLabel = s.label || (s.status === 'green' ? 'Operational' : s.status === 'yellow' ? 'Degraded' : 'Down')
                return (
                  <div
                    key={s.name}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-black/[0.01] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.02)' }}>
                      <Icon size={14} style={{ color: '#7A7A72' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: '#1A1A1A' }}>{s.name}</p>
                      <p className={`text-xs font-mono ${
                        s.status === 'green' ? 'text-emerald-500' : s.status === 'yellow' ? 'text-amber-500' : 'text-white/60'
                      }`}>
                        {statusLabel}
                      </p>
                    </div>
                    <StatusDot status={s.status} />
                  </div>
                )
              })}
            </div>

            {/* Overall status */}
            <div className="mx-6 py-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
              <span className="text-xs font-mono" style={{ color: '#B8B8B0' }}>All systems</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-500">
                <CheckCircle size={12} /> Healthy
              </span>
            </div>
          </div>
        </div>

        {/* -- Footer note -- */}
        <div className="mt-16 text-center">
          <p className="text-xs font-mono" style={{ color: '#B8B8B0' }}>
            9Ruby CEO Command Center &middot; Data refreshes automatically
          </p>
        </div>
      </div>
    </main>
  )
}
