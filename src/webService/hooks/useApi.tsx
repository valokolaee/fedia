/**
 * useApi.tsx
 *
 * One hook, callable as many times as you want per component:
 *
 *   const { callApi, isLoading, Loader } = useApi();
 *   const res = await callApi(apis.articles.list('Public'));
 *
 *   return (
 *     <>
 *       {Loader}
 *       ...your JSX...
 *     </>
 *   );
 *
 * NOTE: this file must be named useApi.tsx (not .ts) because it returns JSX.
 * If you named it .ts, THAT is why nothing renders — TypeScript silently
 * strips/errors on JSX in a .ts file depending on your build setup.
 */

import { useAppSelector } from '@/redux/hooks';
import { useCallback, useState } from 'react';
import { ApiErrorDto, ModelApi, buildUrl } from '../periodcycleApis';

export type ApiResult<TRes> =
  | { success: true; data: TRes }
  | { success: false; error: string };

// const getToken = (): string | undefined => localStorage.getItem('accessToken') ?? undefined;
export function useApi() {
  const [inFlight, setInFlight] = useState(0);
  const token = useAppSelector((i) => i.TokenResponseDtoSlice).accessToken

  const callApi = useCallback(
    async <TReq, TRes>(model: ModelApi<TReq, TRes>): Promise<ApiResult<TRes>> => {
      setInFlight((n) => n + 1);

      try {
        const headers: Record<string, string> = {};
        if (token) headers.Authorization = `Bearer ${token}`;
        if (model.body !== undefined && !model.isFormData) {
          headers['Content-Type'] = 'application/json';
        }

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

        if (!res.ok) {
          const err = parsed as ApiErrorDto | undefined;
          return { success: false, error: err?.message ?? res.statusText };
        }

        return { success: true, data: parsed as TRes };
      } catch (e: any) {
        return { success: false, error: e?.message ?? 'network error' };
      } finally {
        setInFlight((n) => Math.max(0, n - 1));
      }
    },
    []
  );

  const isLoading = inFlight > 0;

  // Plain inline-styled overlay — no UI library dependency.
  // Swap this for antd's <Spin> or your own spinner component if you have one.
  const Loader = isLoading ? (
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
  ) : null;

  return { callApi, isLoading, Loader };
}
