import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import {
  Bot,
  User,
  Send,
  Sparkles,
  X,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  RefreshCw,
  MessageSquare,
  HelpCircle,
  Terminal,
  Shield,
  Layers,
  Zap,
  Globe
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SYSTEM_INSTRUCTION = `You are the Lead Optical Network Architecture AI Engineer for Modern Net.Architecture, designed and deployed by the Directorate of IT at The Islamia University of Bahawalpur (IUB).
Your expertise is in All-Optical Campus Networks, FTTO (Fiber to the Office), POL (Passive Optical LAN), ITU-T G.9807.1 (XGS-PON), ITU-T G.984 (GPON), and IEEE 802.3bt (PoE++).

Key Directives:
1. When asked in Urdu or Roman Urdu (or when Urdu is requested), respond in fluent, easy-to-understand Urdu (اردو) with technical terms explained clearly so that any network technician, student, or engineer can deploy all-optical campus equipment with zero confusion.
2. Provide step-by-step deployment protocols: DC OLT rack installation, ODF patch panels, G.652D backbone conduits, 1:8 / 1:16 / 1:32 optical splitters, G.657A2 riser drops, wall box 86-type panel ONUs, optical dBm attenuation (-15 to -24 dBm acceptance window), and CLI commands (Huawei, Cisco, ZTE).
3. Always emphasize 0-Watt passive efficiency (eliminating floor switch rooms / IDFs) and safe fiber handling (SC/APC green angled connectors, one-click cleaning, bend radius >= 7.5mm).
4. Be polite, authoritative, practical, and provide concrete numbers and CLI command lines where applicable.`;

const PROMPT_SUGGESTIONS = [
  {
    lang: 'ur',
    label: 'کیمپس میں OLT اور Splitter کیسے انسٹال کریں؟',
    prompt: 'براہ کرم مجھے شروع سے آخر تک بتائیں کہ کیمپس میں OLT اور آپٹیکل اسپلٹرز کیسے انسٹال اور کنیکٹ کیے جاتے ہیں؟'
  },
  {
    lang: 'ur',
    label: 'آپٹیکل پاور اور dBm لاس کیسے چیک کریں؟',
    prompt: 'آپٹیکل پاور میٹر سے کیبل کے سگنل لاس (dBm) کی پیمائش کیسے کریں اور -18 dBm حاصل کرنے کا طریقہ کیا ہے؟'
  },
  {
    lang: 'ur',
    label: 'روایتی سوئچ رومز کے مقابلے میں FTTO کے فوائد',
    prompt: 'پرانے کاپر سوئچ نیٹ ورک کے مقابلے میں آل آپٹیکل FTTO نیٹ ورک لگانے کے کیا فوائد اور بجلی کی بچت ہے؟'
  },
  {
    lang: 'en',
    label: 'Configure Huawei EA5800 XGS-PON ONT via OMCI',
    prompt: 'Give me complete Huawei EA5800 OLT CLI commands to register an XGS-PON ONT via OMCI with VLAN batch.'
  },
  {
    lang: 'en',
    label: 'Calculate 1:16 PLC Optical Loss Budget',
    prompt: 'Calculate the total optical link budget and insertion loss for a 2.5 km campus link with a 1:16 PLC splitter.'
  }
];

// Offline expert fallback responses if API key is not present or offline
function getOfflineResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('olt') && (p.includes('انسٹال') || p.includes('deploy') || p.includes('کیسے'))) {
    return `### کیمپس میں OLT اور آپٹیکل اسپلٹر انسٹالیشن گائیڈ (اردو میں مکمل تفصیل)

1. **سینٹرل ڈیٹا سینٹر میں OLT رِیک ماؤنٹنگ:**
   - OLT چیسس (جیسے Huawei SmartAX EA5800-X7) کو مرکزی ڈیٹا سینٹر کے 19-انچ رِیک میں ماؤنٹ کریں۔
   - ڈوئل AC/DC پاور سپلائیز اور گراؤنڈنگ وائر (<1 Ohm) لازمی کنیکٹ کریں۔

2. **آپٹیکل ڈسٹری بیوشن فریم (ODF) کنکشن:**
   - OLT کے 16-پورٹ XGS-PON بورڈ کے SFP+ ٹرانسیسیور پورٹ سے گرین کلر کا SC/APC یا LC/APC پیچ کارڈ ODF بلک ہیڈ پر لگائیں۔
   - ODF سے 48-کور انڈر گراؤنڈ G.652D فائبر مختلف فیکلٹی بلڈنگز کے FDH کیبنٹس تک جاتی ہے۔

3. **بلڈنگ فلور رائزر اور 1:16 اسپلٹر (0-واٹ):**
   - عمارت کی فلور ڈکٹ / رائزر کیبنٹ میں غیر پاورڈ (Passive) 1:16 PLC اسپلٹر فکس کریں۔
   - یاد رہے کہ اس اسپلٹر کو کسی بجلی یا UPS کی ضرورت نہیں ہوتی۔ یہ -13.8 dB کے حساب سے لیزر بیم کو 16 کمروں کے لیے تقسیم کرتا ہے۔

4. **یوزر ڈیسک پینل ONU اور وال آؤٹ لیٹ:**
   - فلور اسپلٹر سے G.657A2 بینڈ-انسینسیٹو فائبر کمرے کے وال باکس (86-Type Socket) تک لے جائیں۔
   - ڈیسک ONU ماؤنٹ کریں اور لائٹ پاور میٹر سے چیک کریں کہ سگنل لیول **-15 dBm تا -24 dBm** کے درمیان ہو۔`;
  }

  if (p.includes('dbm') || p.includes('loss') || p.includes('پاور') || p.includes('بجٹ')) {
    return `### آپٹیکل پاور لاس اور بجٹ کیلکولیشن گائیڈ

- **لاؤنچ پاور (OLT Tx):** +3.5 dBm تا +5.0 dBm (1577nm پر)
- **1:16 PLC اسپلٹر لاس:** -13.8 dB
- **فائبر کیبل اٹینیو ایشن:** 0.35 dB فی کلومیٹر (2 کلومیٹر کے لیے ~ 0.7 dB)
- **کنیکٹرز اور فیوژن اسپلائسز:** ~ 1.5 dB
- **کل متوقع ریسیوڈ پاور (Rx):**
  $$P_{rx} = +3.5 - 13.8 - 0.7 - 1.5 = -12.5 \\text{ dBm}$$
- **ٹارگٹ ونڈو:** -15 dBm سے -24 dBm کے درمیان سگنل بہترین ہے (Optimal Pass)۔ اگر سگنل -27 dBm سے کم ہو تو گرین SC/APC فیرول کو الکحل-فری ون-کلک پین سے صاف کریں۔`;
  }

  return `### Modern Net.Architecture AI Optical Engineering Response

**خلاصہ (Urdu Summary):**
آل آپٹیکل کیمپس نیٹ ورک (FTTO) میں تمام انٹیلی جنس ڈیٹا سینٹر میں OLT کے پاس ہوتی ہے۔ درمیان میں موجود تمام فلور سوئچز ختم ہو کر 0-واٹ کے آپٹیکل اسپلٹرز میں تبدیل ہو جاتے ہیں جس سے بجلی کی 70% بچت ہوتی ہے اور فائبر کیبل 20 کلومیٹر تک ڈیٹا لے جاتی ہے۔

**Technical Specifications (ITU-T G.9807.1):**
- Downstream: 1577nm (10 Gbps Symmetric)
- Upstream: 1270nm
- Max Reach: 20 km Over G.652.D / G.657.A2
- Standard Power Budget: Class N1 (29 dB Margin)

آپ OLT کنفیگریشن، ITU-T اسٹینڈرڈز، یا کسی بھی سائٹ پر فائبر بچھانے کے متعلق مزید سوال پوچھ سکتے ہیں!`;
}

export const OpticalNetworkAiChatbot: React.FC<{
  isFullPage?: boolean;
}> = ({ isFullPage = false }) => {
  const [isOpen, setIsOpen] = useState<boolean>(isFullPage);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `السلام علیکم! میں **Modern Net.Architecture AI Assistant** ہوں۔

آپ مجھ سے آل آپٹیکل کیمپس نیٹ ورک، OLT/ONU ماؤنٹنگ، 1:16 اسپلٹرز، ITU-T G.9807 (XGS-PON) اسٹینڈرڈز، اور CLI کنفیگریشن کے متعلق اردو یا انگلش میں کوئی بھی سوال پوچھ سکتے ہیں۔

How can I assist your optical deployment today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const prompt = (textToSend || inputValue).trim();
    if (!prompt || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY;

      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION
          }
        });

        const replyText = response.text || getOfflineResponse(prompt);
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        // Fallback to domain engineering response
        setTimeout(() => {
          const fallbackText = getOfflineResponse(prompt);
          const botMsg: ChatMessage = {
            id: `bot-${Date.now()}`,
            sender: 'assistant',
            text: fallbackText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          };
          setMessages(prev => [...prev, botMsg]);
          setIsLoading(false);
        }, 600);
        return;
      }
    } catch (err) {
      console.warn('Gemini API call fallback to domain engine:', err);
      const fallbackText = getOfflineResponse(prompt);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isFullPage && !isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold shadow-2xl shadow-cyan-500/40 cursor-pointer flex items-center gap-2 group transition-all duration-300 hover:scale-105"
        title="Open AI Optical Network Chatbot (Urdu & English)"
      >
        <Bot className="w-6 h-6 animate-pulse" />
        <span className="hidden sm:inline-block text-xs font-extrabold pr-1">
          AI Optical Chatbot
        </span>
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-slate-950 animate-ping" />
      </button>
    );
  }

  const containerClasses = isFullPage
    ? 'space-y-6 animate-fadeIn max-w-5xl mx-auto'
    : 'fixed bottom-6 right-6 z-50 w-[95vw] sm:w-[480px] h-[640px] max-h-[85vh] bg-slate-950 border-2 border-cyan-500/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn';

  return (
    <div className={containerClasses}>
      {/* Chatbot Header */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 animate-pulse" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-white">
                Optical Network AI Engineer
              </h3>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                Bilingual (اردو/EN)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Model: <strong className="text-cyan-300">gemini-3.8-flash</strong> · FTTO & XGS-PON Expert
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() =>
              setMessages([
                {
                  id: 'reset',
                  sender: 'assistant',
                  text: 'چیٹ ری سیٹ ہو گئی ہے۔ آپ نیا سوال اردو یا انگلش میں پوچھ سکتے ہیں!',
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ])
            }
            title="Clear Chat History"
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          {!isFullPage && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-2.5 bg-slate-900/60 border-b border-slate-800/80 overflow-x-auto flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0 pl-1">
          Suggestions:
        </span>
        {PROMPT_SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.prompt)}
            className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] whitespace-nowrap cursor-pointer transition-colors shrink-0"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Message Stream Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/80">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                  isUser
                    ? 'bg-cyan-950/40 border border-cyan-500/40 text-slate-100 rounded-tr-none'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-4 pb-1 border-b border-slate-800/60 text-[10px] font-mono text-slate-400">
                  <span>{isUser ? 'Engineer' : 'AI Optical Lead'}</span>
                  <div className="flex items-center gap-1.5">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        title="Copy text"
                        className="text-slate-400 hover:text-white cursor-pointer ml-1"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    )}
                  </div>
                </div>

                <div className="whitespace-pre-wrap font-sans text-xs sm:text-[13px] leading-relaxed">
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono p-2 animate-pulse">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Analyzing optical deployment parameters & standards...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="Ask deployment question in Urdu or English (e.g. OLT installation, dBm power)..."
          className="flex-1 bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-cyan-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold cursor-pointer transition-colors shadow-sm shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
