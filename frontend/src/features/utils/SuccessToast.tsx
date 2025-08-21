import { toast } from "sonner";
import { CheckCircle, X } from "lucide-react";

export const SuccessToast = (message: string, description?: string) => {
  toast.custom((t) => (
    <div className="relative p-4 rounded-lg bg-[var(--chart-2)] text-[var(--color-foreground)] border border-[var(--color-border)] w-[var(--width)]">
      <div className="flex items-start gap-3 pr-8">
        <CheckCircle className="text-[var(--color-foreground)] w-5 h-5 mt-0.5" />
        <div className="flex flex-col">
          <span className="font-semibold">{message}</span>
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
      </div>
      <button
        onClick={() => toast.dismiss(t)}
        className="absolute top-2 right-2 p-1 rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ), {
    duration: 4000,
  });
};