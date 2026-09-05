import { useState } from 'react';
import { User, Building2, Bell, Brain, Palette, Lock, Save, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type SettingsTab = 'profile' | 'organization' | 'notifications' | 'ai' | 'theme' | 'security';

const tabs: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'organization', label: 'Organization', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'ai', label: 'AI Settings', icon: Brain },
  { id: 'theme', label: 'Theme', icon: Palette },
  { id: 'security', label: 'Security', icon: Lock },
];

export function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [confidenceThreshold, setConfidenceThreshold] = useState(60);
  const [humanEscalation, setHumanEscalation] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold text-ink-50">Settings</h1>
        <p className="mt-1 text-sm text-ink-400">Manage your profile, organization, and AI configuration.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tabs Sidebar */}
        <div className="glass-card p-3 h-fit animate-fade-in-up">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-item w-full ${activeTab === tab.id ? 'nav-item-active' : ''}`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="glass-card p-6 lg:col-span-3 animate-fade-in-up">
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-ink-50">Profile</h2>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <button className="btn-secondary text-sm">Change Avatar</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Full Name</label>
                  <input type="text" defaultValue={user?.name || ''} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Work Email</label>
                  <input type="email" defaultValue={user?.email || ''} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Role</label>
                  <input type="text" defaultValue="Network Engineer" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Phone</label>
                  <input type="tel" placeholder="+1 (555) 000-0000" className="input-field" />
                </div>
              </div>
              <button className="btn-primary">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'organization' && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-ink-50">Organization</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Organization Name</label>
                  <input type="text" defaultValue={user?.organization || ''} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Domain</label>
                  <input type="text" defaultValue="telecom.com" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Plan</label>
                  <input type="text" defaultValue="Enterprise" disabled className="input-field opacity-60 cursor-not-allowed" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Team Members</label>
                  <input type="text" defaultValue="12 members" disabled className="input-field opacity-60 cursor-not-allowed" />
                </div>
              </div>
              <button className="btn-primary">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-ink-50">Notification Preferences</h2>
              <div className="space-y-4">
                <ToggleRow
                  label="Email Notifications"
                  description="Receive incident alerts via email"
                  checked={emailNotif}
                  onChange={setEmailNotif}
                />
                <ToggleRow
                  label="Push Notifications"
                  description="Real-time browser push for critical incidents"
                  checked={pushNotif}
                  onChange={setPushNotif}
                />
                <ToggleRow
                  label="Critical Incidents Only"
                  description="Only notify for Critical and Unknown severity incidents"
                  checked={criticalOnly}
                  onChange={setCriticalOnly}
                />
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-ink-50">AI Settings</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">AI Model</label>
                  <div className="input-field flex items-center gap-2 cursor-default">
                    <Brain className="h-4 w-4 text-brand-400" />
                    <span className="text-sm text-ink-100">Gemini</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Embedding Model</label>
                  <div className="input-field flex items-center gap-2 cursor-default">
                    <span className="text-sm text-ink-100 font-mono">gemini-embedding-001</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Retrieval Method</label>
                  <div className="input-field flex items-center gap-2 cursor-default">
                    <span className="text-sm text-ink-100">FAISS (Local)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Backend</label>
                  <div className="input-field flex items-center gap-2 cursor-default">
                    <span className="text-sm text-ink-100">Python + SQLite</span>
                  </div>
                </div>
              </div>

              {/* Confidence Threshold Slider */}
              <div className="rounded-xl bg-ink-900/60 border border-ink-700/40 p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-ink-200">Confidence Threshold</label>
                  <span className="text-sm font-bold text-brand-400 tabular-nums">{confidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-ink-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
                />
                <p className="text-xs text-ink-400 mt-2">
                  Incidents below this confidence score are automatically escalated to human review. Current threshold: {confidenceThreshold}%
                </p>
              </div>

              <ToggleRow
                label="Human Escalation"
                description="Escalate uncertain or unsupported incidents to a human engineer instead of guessing"
                checked={humanEscalation}
                onChange={setHumanEscalation}
              />

              <div className="rounded-xl bg-purple-500/5 border border-purple-500/20 p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-purple-300">Safety Guarantee</p>
                    <p className="text-xs text-ink-400 mt-1">
                      When human escalation is enabled, the system will never invent a troubleshooting procedure for incidents
                      that lack matching runbook evidence. These incidents are flagged for engineer review.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'theme' && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-ink-50">Theme</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: 'Dark (Default)', active: true, bg: 'bg-ink-900' },
                  { name: 'Midnight', active: false, bg: 'bg-[#0a0a14]' },
                  { name: 'Slate', active: false, bg: 'bg-[#1a1f2e]' },
                ].map((theme) => (
                  <button
                    key={theme.name}
                    className={`rounded-xl border-2 p-4 text-left transition-all ${
                      theme.active ? 'border-brand-500' : 'border-ink-700 hover:border-ink-600'
                    }`}
                  >
                    <div className={`h-16 rounded-lg ${theme.bg} mb-2`} />
                    <p className="text-sm font-medium text-ink-100">{theme.name}</p>
                    {theme.active && <p className="text-xs text-brand-400 mt-0.5">Active</p>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-ink-50">Security</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-ink-300 mb-1.5">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field" />
                </div>
                <button className="btn-primary">
                  <Lock className="h-4 w-4" />
                  Update Password
                </button>
              </div>
              <div className="pt-4 border-t border-ink-700/40">
                <ToggleRow
                  label="Two-Factor Authentication"
                  description="Require a verification code at sign-in"
                  checked={false}
                  onChange={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-ink-900/40 border border-ink-700/30 p-4">
      <div>
        <p className="text-sm font-medium text-ink-100">{label}</p>
        <p className="text-xs text-ink-400 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors flex-shrink-0 ${
          checked ? 'bg-brand-500' : 'bg-ink-700'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
