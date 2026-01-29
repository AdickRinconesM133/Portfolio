'use client';

import { useState, type FormEvent } from 'react';

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

export const ContactHero = () => {
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
      <div className="mt-[18.06dvh] ml-[10.63dvw] margin-right">
        <p className="text-[0.8rem] text-accent">CONTACT</p>
        <h2 className="mt-[4dvh]">GOT A <span className="text-accent">PROJECT?</span></h2>
        <p className="text-[0.8rem] mt-[4dvh] text-accent uppercase">Tell me about your vision, and I&apos;ll help you bring it to life.</p>
      </div>
      <div className="margin-top ml-[10.63dvw] flex gap-x-[4dvw]">
        <form
          onSubmit={handleSubmit}
          className="bg-background/40 rounded-3xl flex flex-col justify-center gap-[4dvh] p-[3dvw] w-[40dvw]"
        >
          {CONTACT_FIELDS.map((field) => (
            <div key={field.name} className="flex items-start gap-[2dvw]">
              <p className="font-league-gothic text-accent text-2xl leading-none mt-[0.5dvh]">
                {field.number}
              </p>
              <div className="flex-1 flex flex-col gap-[1dvh]">
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
                    className="bg-transparent border-b border-foreground/20 text-[0.8rem] py-[1dvh] outline-none resize-none transition-colors duration-300 focus:border-accent"
                  />
                ) : (
                  <input
                    type={field.name === 'email' ? 'email' : 'text'}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className="bg-transparent border-b border-foreground/20 text-[0.8rem] py-[1dvh] outline-none transition-colors duration-300 focus:border-accent"
                  />
                )}
              </div>
            </div>
          ))}
          <button
            type="submit"
            disabled={isSending}
            className={`border border-accent rounded-full px-[3dvw] py-[1.5dvh] text-xl tracking-wider self-center mt-[2dvh] transition-colors duration-300 ${status === FORM_STATUS.SUCCESS ? 'border-green-400 text-green-400' : status === FORM_STATUS.ERROR ? 'border-red-400 text-red-400' : 'text-accent hover:bg-accent hover:text-background'} ${isSending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {buttonLabel}
          </button>
        </form>
        <div
          className="bg-background/40 rounded-3xl flex flex-col p-[3dvw] self-start w-[37dvw]"
        >
          <p className="text-[0.9rem] text-accent mb-[2dvh]">CONTACT DETAILS</p>
          {CONTACT_DETAILS.map((detail) => (
            <a
              key={detail.label}
              href={detail.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[2dvh] text-[0.8rem]! border border-accent rounded-full px-[0.8vw] py-[0.8vh] w-fit transition-colors duration-300 hover:bg-accent hover:text-background"
            >
              {detail.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
