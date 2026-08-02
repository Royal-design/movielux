import { Coins, TrendingUp } from "lucide-react";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);

export const BoxOffice: React.FC<{ budget: number; revenue: number }> = ({
  budget,
  revenue,
}) => {
  if (!budget && !revenue) return null;

  return (
    <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {budget > 0 && (
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft transition-colors duration-300 hover:border-gold/30">
          <div className="mb-2 flex items-center gap-2.5 text-muted">
            <Coins className="size-4 text-gold" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Budget</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(budget)}</p>
        </div>
      )}
      {revenue > 0 && (
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft transition-colors duration-300 hover:border-gold/30">
          <div className="mb-2 flex items-center gap-2.5 text-muted">
            <TrendingUp className="size-4 text-crimson" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-wider">Box Office</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(revenue)}</p>
        </div>
      )}
    </div>
  );
};
