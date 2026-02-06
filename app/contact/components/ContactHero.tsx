'use client';

import { useState, useRef, type FormEvent } from 'react';
import { ScrollCardReveal, ScrollTextReveal } from '@/app/components';
import { useLoading } from "@/app/context/LoadingContext";
import { useScrollProgress, useEntryTimeline } from "@/app/hooks";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';

const CONTACT_FIELDS = [
  { number: '01', label: 'FULL NAME', name: 'fullName', required: true },
  { number: '02', label: 'COMPANY', name: 'company', required: false },
  { number: '03', label: 'EMAIL', name: 'email', required: true },
  { number: '04', label: 'YOUR MESSAGE', name: 'message', required: true },
] as const;

interface ContactDetail {
  label: string;
  href: string;
}

const CONTACT_DETAILS: ContactDetail[] = [
  { label: 'RINCONESADICK@GMAIL.COM', href: 'mailto:rinconesadick@gmail.com' },
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/adickrincones/' },
  { label: 'INSTAGRAM', href: 'https://instagram.com/' },
];

const FORM_STATUS = {
  IDLE: 'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

type FormStatus = (typeof FORM_STATUS)[keyof typeof FORM_STATUS];

const RANGES = {
  label: [0.02, 0.15],
  title: [0.06, 0.14],
  subtitle: [0.10, 0.30],
} as const;

export const ContactHero = () => {
  const { isLoading } = useLoading();
  const headerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const progresses = useScrollProgress(headerRef, RANGES, { divisor: 'viewport' });

  const entryRefs = [labelRef, titleRef, subtitleRef, formSectionRef];
  useEntryTimeline(entryRefs, isLoading);

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<FormStatus>(FORM_STATUS.IDLE);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(FORM_STATUS.SENDING);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact: ${formData.fullName}`,
          from_name: formData.fullName,
          name: formData.fullName,
          company: formData.company,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) throw new Error('Failed to send');

      setStatus(FORM_STATUS.SUCCESS);
      setFormData({ fullName: '', company: '', email: '', message: '' });
      setTimeout(() => setStatus(FORM_STATUS.IDLE), 4000);
    } catch {
      setStatus(FORM_STATUS.ERROR);
      setTimeout(() => setStatus(FORM_STATUS.IDLE), 4000);
    }
  };

  const isSending = status === FORM_STATUS.SENDING;

  const buttonLabel = {
    [FORM_STATUS.IDLE]: 'SEND MESSAGE',
    [FORM_STATUS.SENDING]: 'SENDING...',
    [FORM_STATUS.SUCCESS]: 'MESSAGE SENT ✓',
    [FORM_STATUS.ERROR]: 'FAILED — TRY AGAIN',
  }[status];

  return (
    <div className="flex w-full flex-col">
      <div ref={headerRef} className="mt-24 md:mt-[18.06lvh] ml-4 md:ml-[10.63dvw] margin-right">
        <p ref={labelRef} className="opacity-0 text-[0.55rem] lg:text-[0.8rem] text-accent">
          <ScrollTextReveal progress={progresses.label}>CONTACT</ScrollTextReveal>
        </p>
        <h2 ref={titleRef} className="opacity-0 mt-2 lg:mt-[4lvh]">
          <ScrollTextReveal progress={progresses.title}>GOT A</ScrollTextReveal>{' '}
          <ScrollTextReveal progress={progresses.title} className="text-accent">PROJECT?</ScrollTextReveal>
        </h2>
        <p ref={subtitleRef} className="opacity-0 text-[0.55rem] lg:text-[0.8rem] mt-2 lg:mt-[4lvh] text-accent uppercase">
          <ScrollTextReveal progress={progresses.subtitle}>Tell me about your vision, and I'll help you bring it to life.</ScrollTextReveal>
        </p>
      </div>
      <div ref={formSectionRef} className="opacity-0 margin-top ml-4 md:ml-[10.63dvw] mr-4 md:mr-0 flex flex-col md:flex-row gap-6 md:gap-x-[4dvw]">
        <ScrollCardReveal start="top 98%" end="top 85%">
          <form
            onSubmit={handleSubmit}
            className="bg-background/40 rounded-3xl flex flex-col justify-center gap-[4lvh] p-4 md:p-[3dvw] w-full md:w-[40dvw]"
          >
            {CONTACT_FIELDS.map((field) => (
              <div key={field.name} className="flex items-start gap-[2dvw]">
                <p className="font-league-gothic text-accent text-2xl leading-none mt-[0.5lvh]">
                  {field.number}
                </p>
                <div className="flex-1 flex flex-col gap-[1lvh]">
                  <label className="text-[0.9rem] tracking-wider">
                    {field.label}{field.required && ' *'}
                  </label>
                  {field.name === 'message' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      rows={4}
                      className="bg-transparent border-b border-foreground/20 text-[0.8rem] py-2 md:py-[1lvh] outline-none resize-none transition-colors duration-300 focus:border-accent"
                    />
                  ) : (
                    <input
                      type={field.name === 'email' ? 'email' : 'text'}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      className="bg-transparent border-b border-foreground/20 text-[0.8rem] py-2 md:py-[1lvh] outline-none transition-colors duration-300 focus:border-accent"
                    />
                  )}
                </div>
              </div>
            ))}
            <button
              type="submit"
              disabled={isSending}
              className={`border border-accent rounded-full px-6 py-3 md:px-[3dvw] md:py-[1.5lvh] text-[0.55rem] lg:text-xl tracking-wider self-center mt-2 lg:mt-[2lvh] transition-colors duration-300 ${status === FORM_STATUS.SUCCESS ? 'border-green-400 text-green-400' : status === FORM_STATUS.ERROR ? 'border-red-400 text-red-400' : 'text-accent hover:bg-accent hover:text-background'} ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {buttonLabel}
            </button>
          </form>
        </ScrollCardReveal>
        <ScrollCardReveal start="top 98%" end="top 85%">
          <div
            className="bg-background/40 rounded-3xl flex flex-col p-4 md:p-[3dvw] self-start w-full md:w-[37dvw]"
          >
            <p className="text-[0.9rem] text-accent mb-[2lvh]">CONTACT DETAILS</p>
            {CONTACT_DETAILS.map((detail) => (
              <a
                key={detail.label}
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[2lvh] text-[0.8rem]! border border-accent rounded-full px-3 py-1.5 md:px-[0.8vw] md:py-[0.8vh] w-fit transition-colors duration-300 hover:bg-accent hover:text-background"
              >
                {detail.label}
              </a>
            ))}
          </div>
        </ScrollCardReveal>
      </div>
    </div>
  );
};
