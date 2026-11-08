import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import { profile, publications, publicationStats, interests, courses, education, projects } from '../data/profile';

const WELCOME = "Hi! I'm Dr. Daniel's assistant. Ask me about his research, publications, teaching or how to get in touch.";
const SUGGESTIONS = ['What is his research about?', 'Most cited paper?', 'Can he supervise my thesis?', 'How can I contact him?'];

// Offline answers, used when the Claude-powered /api/chat is not configured.
const offlineAnswer = (text) => {
  const q = text.toLowerCase();
  const has = (...words) => words.some((w) => q.includes(w));
  if (has('hello', 'hi ', 'hey', 'selam', 'good morning')) return 'Hello! What would you like to know about Dr. Daniel?';
  if (has('cite', 'citation', 'most cited', 'popular paper', 'best paper')) {
    const top = [...publications].sort((a, b) => b.citations - a.citations)[0];
    return `His most cited paper is "${top.title}" (${top.venue}, ${top.year}), with about ${top.citations} citations. In total he has ${publicationStats.citations}+ citations and an h-index of ${publicationStats.hIndex}.`;
  }
  if (has('publication', 'paper', 'journal', 'article', 'publish')) {
    return `He has ${publicationStats.total} publications, mostly on machine learning for HIV/AIDS prediction, with Springer, IEEE, Taylor & Francis and IntechOpen. You can see them all in the Publications section.`;
  }
  if (has('supervis', 'thesis', 'student', 'phd', 'msc', 'master')) {
    return `He supervises MSc and PhD students on topics such as Amharic NLP, medical chatbots and predictive models. To ask about supervision, please email ${profile.email} with a short description of your idea.`;
  }
  if (has('research', 'interest', 'work on', 'area', 'field')) {
    return `His research covers ${interests.map((i) => i.title.toLowerCase()).slice(0, 4).join(', ')} and more.`;
  }
  if (has('teach', 'course', 'class', 'lecture')) {
    return `He teaches courses including ${courses.slice(0, 6).join(', ')}, among others.`;
  }
  if (has('educat', 'degree', 'study', 'studied', 'university')) {
    return education.map((e) => `${e.degree}, ${e.school} (${e.years})`).join('\n');
  }
  if (has('project', 'grant')) {
    return `His grant projects include: ${projects.map((p) => p.title).join('; ')}.`;
  }
  if (has('contact', 'email', 'phone', 'reach', 'whatsapp', 'call')) {
    return `You can email him at ${profile.email} or call/WhatsApp ${profile.phone}.`;
  }
  if (has('cv', 'resume', 'curriculum')) return `You can download his CV here: ${window.location.origin}${profile.cv}`;
  if (has('thank')) return "You're welcome! Anything else?";
  return `I'm not sure I understood. I can tell you about his research, publications, teaching or contact details. For anything else, please email ${profile.email}.`;
};

const Assistant = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }]);
  const serverOff = useRef(false);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return undefined;
    inputRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ask = async (text) => {
    const question = text.trim();
    if (!question || busy) return;
    const history = [...messages, { role: 'user', content: question }];
    setMessages(history);
    setInput('');
    setBusy(true);

    let reply = null;
    if (!serverOff.current) {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history })
        });
        if ([404, 405, 503].includes(res.status)) serverOff.current = true;
        else if (res.ok) {
          const data = await res.json();
          if (typeof data.reply === 'string' && data.reply.trim()) reply = data.reply.trim();
        }
      } catch (e) {
        /* fall back below */
      }
    }
    if (!reply) {
      await new Promise((r) => setTimeout(r, 400));
      reply = offlineAnswer(question);
    }
    setMessages((m) => [...m, { role: 'assistant', content: reply }]);
    setBusy(false);
  };

  if (!open) {
    return (
      <button className="assistant-btn" onClick={() => setOpen(true)} aria-label="Open AI assistant">
        <Sparkles size={16} aria-hidden="true" /> Ask me
      </button>
    );
  }

  return (
    <div className="assistant" role="dialog" aria-label="AI assistant">
      <div className="assistant-head">
        <Sparkles size={18} aria-hidden="true" />
        <div>
          <strong>AI Assistant</strong>
          <small>Ask about Dr. Daniel's work</small>
        </div>
        <button onClick={() => setOpen(false)} aria-label="Close assistant"><X size={18} /></button>
      </div>
      <div className="assistant-body" ref={bodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role === 'user' ? 'msg-user' : 'msg-bot'}`}>{m.content}</div>
        ))}
        {busy && <div className="msg msg-bot"><span className="typing"><span /><span /><span /></span></div>}
      </div>
      {messages.length === 1 && (
        <div className="assistant-suggest">
          {SUGGESTIONS.map((s) => <button key={s} onClick={() => ask(s)}>{s}</button>)}
        </div>
      )}
      <form className="assistant-form" onSubmit={(e) => { e.preventDefault(); ask(input); }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          aria-label="Your question"
          maxLength={500}
        />
        <button className="btn btn-primary btn-sm" type="submit" disabled={busy || !input.trim()} aria-label="Send">
          <Send size={15} />
        </button>
      </form>
    </div>
  );
};

export default Assistant;
