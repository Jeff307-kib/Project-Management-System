import { toast } from "sonner"
import { AlertCircleIcon, X } from "lucide-react"

export const ErrorToast = (message: string, description?: string) => {
  toast.custom((t) => (
    <div className="relative p-4 rounded-lg bg-[var(--destructive)] text-[var(--color-background)] border border-[var(--color-border)] w-[var(--width)]">
      <div className="flex items-start gap-3 pr-8">
        <AlertCircleIcon className="text-[var(--color-background)] w-5 h-5 mt-0.5" />
        <div className="flex flex-col">
          <span className="font-semibold">{message}</span>
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
      </div>
      <button
        onClick={() => toast.dismiss(t)}
        className="absolute top-2 right-2 p-1 rounded-md text-[var(--color-background)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  ))
}

