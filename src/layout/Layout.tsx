interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`max-w-7xl mx-auto ${className ?? ""}`}>{children}</div>
    </div>
  );
};
