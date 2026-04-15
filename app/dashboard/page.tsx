"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Send, LogOut, MessageSquare, Image as ImageIcon, Users, Globe, 
  FileText, Loader2, CheckCircle, XCircle, ChevronDown,
  Menu, X, Zap, Home
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  status: string;
  language: string;
  category: string;
  components: { type: string; text?: string }[];
  variables: string[];
}

const AUDIENCE_OPTIONS = [
  'SKMH Hindi',
  'SKMH English',
  'SKMH Marathi',
];

const LANGUAGES = [
  { code: 'hi', name: 'Hindi' },
  { code: 'en', name: 'English' },
  { code: 'mr', name: 'Marathi' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    campaignName: '',
    templateId: '',
    templateName: '',
    imageUrl: '',
    audience: '',
    language: 'en',
  });

  const [variables, setVariables] = useState<Record<string, string>>({});

  const selectedTemplate = templates.find(t => t.id === formData.templateId);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/templates', { credentials: 'include' });
      const data = await response.json();
      if (data.success) {
        setTemplates(data.templates);
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setFormData({
      ...formData,
      templateId,
      templateName: template?.name || '',
    });
    setVariables({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/trigger-workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          templateVariables: variables,
        }),
      });

      const data = await response.json();
      setResult({
        success: data.success,
        message: data.success ? 'Campaign sent successfully!' : data.error || 'Failed to send campaign',
      });
    } catch {
      setResult({
        success: false,
        message: 'An error occurred while sending the campaign',
      });
    } finally {
      setSending(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      router.push('/login');
    } catch {
      router.push('/login');
    }
  };

  const handleLogoutToHome = async () => {
    try {
      await fetch('/api/logout', { method: 'POST', credentials: 'include' });
      router.push('/');
    } catch {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center">
                <Image src="/images/logoo.png" alt="Logo" width={40} height={40} className="w-full h-full object-contain" />
              </div>
              <span className="font-montserrat font-bold text-xl text-trust-maroon">Suryakiran</span>
              <span className="hidden sm:inline text-sm text-trust-brown/60">Campaign Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogoutToHome}
                  className="flex items-center gap-2 px-4 py-2 text-trust-brown-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-trust-brown-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-orange-50"
              >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-orange-500/10 border border-white/50 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-montserrat font-semibold text-xl text-trust-maroon">Campaign Creation</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-trust-brown-700 mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Campaign Name
                    </label>
                    <input
                      type="text"
                      value={formData.campaignName}
                      onChange={(e) => setFormData({ ...formData, campaignName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-orange-100 bg-orange-50/50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                      placeholder="e.g., Annual Health Checkup Campaign"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-trust-brown-700 mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      WhatsApp Template
                    </label>
                    {loadingTemplates ? (
                      <div className="flex items-center gap-2 text-trust-brown-500 py-3">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Loading templates...
                      </div>
                    ) : (
                      <div className="relative">
                        <select
                          value={formData.templateId}
                          onChange={(e) => handleTemplateChange(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-orange-100 bg-orange-50/50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none appearance-none"
                          required
                        >
                          <option value="">Select a template</option>
                          {templates.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name} ({template.language})
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-trust-brown/40 pointer-events-none" />
                      </div>
                    )}
                  </div>

                  {selectedTemplate && selectedTemplate.variables.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-trust-brown-700 mb-2">
                        Template Variables
                      </label>
                      <div className="space-y-3">
                        {selectedTemplate.variables.map((variable, index) => (
                          <div key={index}>
                            <label className="text-xs text-trust-brown-500 mb-1 block capitalize">
                              {variable.replace(/([A-Z])/g, ' $1').trim()}
                            </label>
                            <input
                              type="text"
                              value={variables[variable] || ''}
                              onChange={(e) => setVariables({ ...variables, [variable]: e.target.value })}
                              className="w-full px-4 py-2 rounded-xl border border-orange-100 bg-orange-50/50 focus:bg-white focus:border-orange-500 outline-none text-sm"
                              placeholder={`Enter ${variable}`}
                              required
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-trust-brown-700 mb-2">
                      <ImageIcon className="w-4 h-4 inline mr-2" />
                      Image URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-orange-100 bg-orange-50/50 focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all outline-none"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-trust-brown-700 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Audience
                      </label>
                      <div className="relative">
                        <select
                          value={formData.audience}
                          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-orange-100 bg-orange-50/50 focus:bg-white focus:border-orange-500 outline-none appearance-none"
                          required
                        >
                          <option value="">Select audience</option>
                          {AUDIENCE_OPTIONS.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-trust-brown/40 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-trust-brown-700 mb-2">
                        <Globe className="w-4 h-4 inline mr-2" />
                        Language
                      </label>
                      <div className="relative">
                        <select
                          value={formData.language}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-orange-100 bg-orange-50/50 focus:bg-white focus:border-orange-500 outline-none appearance-none"
                          required
                        >
                          {LANGUAGES.map((lang) => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-trust-brown/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {result && (
                <div className={`p-4 rounded-xl border ${
                  result.success 
                    ? 'bg-green-50 border-green-200 text-green-700' 
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}>
                  <div className="flex items-center gap-2">
                    {result.success ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <XCircle className="w-5 h-5" />
                    )}
                    <span>{result.message}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={sending || loadingTemplates}
                className="w-full py-4 px-6 bg-gradient-to-r from-orange-600 to-red-500 text-white font-semibold rounded-xl hover:from-orange-500 hover:to-red-400 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Campaign...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Campaign
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-orange-500/10 border border-white/50 p-6">
              <h3 className="font-montserrat font-semibold text-lg text-trust-brown-800 mb-4">Template Preview</h3>
              {selectedTemplate ? (
                <div className="space-y-3">
                  <div className="text-sm">
                    <span className="text-trust-brown-500">Name:</span>
                    <span className="ml-2 font-medium text-trust-brown-700">{selectedTemplate.name}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-trust-brown-500">Language:</span>
                    <span className="ml-2 font-medium text-trust-brown-700">{selectedTemplate.language}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-trust-brown-500">Category:</span>
                    <span className="ml-2 font-medium text-trust-brown-700">{selectedTemplate.category}</span>
                  </div>
                  <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-trust-brown-600">
                      {selectedTemplate.components.find(c => c.type === 'BODY')?.text || 'No body text'}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-trust-brown/40 text-sm">Select a template to preview</p>
              )}
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg shadow-orange-500/10 border border-white/50 p-6">
              <h3 className="font-montserrat font-semibold text-lg text-trust-brown-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-trust-brown-500">Available Templates</span>
                  <span className="font-medium text-trust-brown-700">{templates.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-trust-brown-500">Audience Lists</span>
                  <span className="font-medium text-trust-brown-700">{AUDIENCE_OPTIONS.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}