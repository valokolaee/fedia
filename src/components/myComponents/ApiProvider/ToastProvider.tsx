/**
 * ToastProvider.tsx
 *
 * Mount ONCE near your app root, above <ApiProvider> (see wiring notes at
 * the bottom of this file for connecting the two).
 *
 * Usage from any component:
 *
 *   const { showToast } = useToast();
 *   showToast('success', 'Saved successfully');
 *   showToast('error', 'Something went wrong');
 *   showToast('warning', 'Session expiring soon');
 *   showToast('info', 'Heads up');
 *
 * Behavior:
 *   - Auto-dismisses after `duration` ms (default 4000).
 *   - Click anywhere on a toast to dismiss it early.
 *   - Multiple toasts stack vertically.
 *   - Colored left border + icon per type (success/error/warning/info).
 */

import React, { createContext, useCallback, useContext, useRef, useState, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const STYLES: Record<ToastType, { bg: string; border: string; icon: string }> = {
  success: { bg: '#f0fdf4', border: '#22c55e', icon: '✓' },
  error: { bg: '#fef2f2', border: '#ef4444', icon: '✕' },
  warning: { bg: '#fffbeb', border: '#f59e0b', icon: '!' },
  info: { bg: '#eff6ff', border: '#3b82f6', icon: 'i' },
};

let idCounter = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 4000) => {
      const id = ++idCounter;
      setToasts((list) => [...list, { id, type, message }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          maxWidth: 360,
        }}
      >
        {toasts.map((t) => {
          const style = STYLES[t.type];
          return (
            <div
              key={t.id}
              onClick={() => dismiss(t.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                background: style.bg,
                borderLeft: `4px solid ${style.border}`,
                borderRadius: 6,
                padding: '12px 14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                cursor: 'pointer',
                fontSize: 14,
                color: '#1f2937',
                animation: 'toast-in 0.2s ease-out',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: style.border,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {style.icon}
              </span>
              <span style={{ flex: 1, lineHeight: 1.4 }}>{t.message}</span>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast() must be used inside <ToastProvider>.');
  return ctx;
}

/* ============================================================ */
/*  Wiring into ApiProvider                                       */
/* ============================================================ */
//
// 1. Mount order — ToastProvider must be ABOVE ApiProvider so
//    ApiProvider can call useToast() internally:
//
//    <ToastProvider>
//      <ApiProvider>
//        <App />
//      </ApiProvider>
//    </ToastProvider>
//
// 2. Inside ApiProvider.tsx, replace the `showErrorToast` stub with:
//
//    import { useToast } from './ToastProvider';
//    // ...inside ApiProvider component:
//    const { showToast } = useToast();
//    // ...inside callApi, replace every `showErrorToast(msg)` call with:
//    showToast('error', msg);
//
// 3. Optionally show a success toast too, e.g. after res.ok:
//    if (!opts.quiet && (parsed as any)?.message) {
//      showToast('success', (parsed as any).message);
//    }
