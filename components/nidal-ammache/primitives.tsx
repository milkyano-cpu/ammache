import { cn } from "@/lib/utils";

export const container = "mx-auto w-full max-w-[1196px] px-6 lg:px-5";

export function Eyebrow({
  children,
  line = true,
  className,
}: {
  children: React.ReactNode;
  line?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <p className="typo-overline text-gray-800">{children}</p>
      {line && <div aria-hidden className="h-px w-10 bg-gray-400" />}
    </div>
  );
}

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
}) {
  return (
    <Tag id={id} className={cn("typo-h2 mt-3 text-black", className)}>
      {children}
    </Tag>
  );
}

export function LeadParagraph({ lead, text, className }: { lead: string; text: string; className?: string }) {
  return (
    <p className={className}>
      {lead && <strong className="font-semibold">{lead} </strong>}
      {text}
    </p>
  );
}

export function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 22" aria-hidden className={className} fill="currentColor">
      <path d="M0 22V13.2C0 5.9 3.6 1.5 10.4 0l1.4 3.3C8.3 4.4 6.6 6.6 6.3 9.6H11V22H0Zm16.8 0V13.2C16.8 5.9 20.4 1.5 27.2 0l1.4 3.3c-3.5 1.1-5.2 3.3-5.5 6.3h4.7V22H16.8Z" />
    </svg>
  );
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.2">
      <path d="M1.5 8.5 8.5 1.5M3 1.5h5.5V7" />
    </svg>
  );
}
