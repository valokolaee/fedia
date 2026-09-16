/**
 * ApiProvider.tsx
 *
 * Fixes the regression: instead of every component's useApi() call owning its
 * own isolated spinner/loading state, ALL calls anywhere in the app share one
 * counter, one spinner, and one error-toast pipeline — same centralization
 * your original <WebService> had, minus the bugs it had.
 *
 * Mount <ApiProvider> ONCE, near your app root (next to Router, Redux
 * Provider, etc). Every component then calls useApi() to get the SAME
 * shared callApi — not a new isolated instance each time.
 */

import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModelApi, buildUrl, ApiErrorDto } from './periodcycle-apis-rebuilt';
import { useToast } from './ToastProvider';

export type ApiResult<TRes> =
  | { success: true; data: TRes }
  | { success: false; error: string };

interface CallOptions {
  /** Skip the shared spinner for this one call (e.g. silent background polling). */
  silent?: boolean;
  /** Skip the automatic error toast for this one call — handle the error yourself. */
  quiet?: boolean;
}

interface ApiContextValue {
  callApi: <TReq, TRes>(model: ModelApi<TReq, TRes>, opts?: CallOptions) => Promise<ApiResult<TRes>>;
  isLoading: boolean;
  /** The most recent error message across the whole app — handy for a toast/banner. */
  lastError: string | undefined;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

const getToken = (): string | undefined => localStorage.getItem('accessToken') ?? undefined;

export function ApiProvider({ children }: { children: ReactNode }) {
  const [inFlight, setInFlight] = useState(0);
  const [lastError, setLastError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const { showToast } = useToast(); // requires <ToastProvider> to be an ANCESTOR of <ApiProvider>

  const callApi = useCallback(
    async <TReq, TRes>(model: ModelApi<TReq, TRes>, opts: CallOptions = {}): Promise<ApiResult<TRes>> => {
      if (!opts.silent) setInFlight((n) => n + 1);

      try {
        const token = getToken();
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        if (model.body !== undefined && !model.isFormData) headers['Content-Type'] = 'application/json';

        const res = await fetch(buildUrl(model), {
          method: model.axiosType.toUpperCase(),
          headers,
          body:
            model.body === undefined
              ? undefined
              : model.isFormData
              ? (model.body as unknown as FormData)
              : JSON.stringify(model.body),
        });

        const text = await res.text();
        const parsed = text ? JSON.parse(text) : undefined;

        // ---- centralized 401 handling, ONE place for the whole app ----
        if (res.status === 401) {
          localStorage.removeItem('accessToken');
          navigate('/login');
          const msg = (parsed as ApiErrorDto)?.message ?? 'Session expired';
          setLastError(msg);
          if (!opts.quiet) showToast('warning', msg);
          return { success: false, error: msg };
        }

        if (!res.ok) {
          const msg = (parsed as ApiErrorDto)?.message ?? res.statusText;
          setLastError(msg);
          if (!opts.quiet) showToast('error', msg);
          return { success: false, error: msg };
        }

        // success — most PeriodCycle responses are raw DTOs with no `message`
        // field, so only toast when the backend actually sent one to show.
        if (!opts.quiet && parsed && typeof parsed === 'object' && 'message' in parsed) {
          showToast('success', (parsed as { message: string }).message);
        }

        return { success: true, data: parsed as TRes };
      } catch (e: any) {
        const msg = e?.message ?? 'network error';
        setLastError(msg);
        if (!opts.quiet) showToast('error', msg);
        return { success: false, error: msg };
      } finally {
        if (!opts.silent) setInFlight((n) => Math.max(0, n - 1));
      }
    },
    [navigate, showToast]
  );

  const isLoading = inFlight > 0;

  return (
    <ApiContext.Provider value={{ callApi, isLoading, lastError }}>
      {children}

      {/* ONE spinner for the entire app, no matter how many components call the API */}
      {isLoading && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.6)',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: '5px solid #eee',
              borderTopColor: '#666',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </ApiContext.Provider>
  );
}

/** The hook every component uses — returns the SAME shared instance, not a new one. */
export function useApi(): ApiContextValue {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error('useApi() must be used inside <ApiProvider>. Did you forget to mount it near your app root?');
  return ctx;
}
