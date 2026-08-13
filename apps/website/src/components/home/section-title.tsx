type SectionTitleProps = {
  children: React.ReactNode;
};

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <div className="mb-8 flex items-center gap-2">
      <span className="inline-block h-3 w-3 rotate-45 rounded-[3px] bg-primary" />
      <h2 className="text-xl font-black text-navy md:text-2xl">{children}</h2>
    </div>
  );
}
