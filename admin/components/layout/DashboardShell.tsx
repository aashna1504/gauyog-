import { cn } from '@/lib/utils';

interface DashboardShellProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ title, description, action, children, className }: DashboardShellProps) {
  return (
    <div className={cn('flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8', className)}>
      {(title || action) && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h2>}
            {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
