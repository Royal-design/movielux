interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="max-w-[1440px] mx-auto relative">
      <div className={`max-w-[90%] mx-auto ${className ?? ""}`}>{children}</div>
    </div>
  );
};
