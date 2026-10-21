import { Download } from 'lucide-react';

export default function ResumeDownload() {
  return (
    <a
      href="/CV_Zhico_Pradita_ATS.pdf"
      download="CV_Zhico_Pradita_ATS.pdf"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold tracking-wider transition-transform hover:-translate-y-0.5"
      style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
    >
      <Download size={16} />
      DOWNLOAD CV
    </a>
  );
}
