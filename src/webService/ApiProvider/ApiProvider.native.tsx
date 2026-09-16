/**
 * ApiProvider.native.tsx — React Native / Expo version (Expo Router)
 *
 * Differences from the web version:
 *   - localStorage -> AsyncStorage (async, so token lookup is now `await`ed)
 *     npm install @react-native-async-storage/async-storage
 *   - useNavigate() (react-router-dom) -> useRouter() (expo-router)
 *     navigate('/login') -> router.replace('/login')
 *   - <div>/CSS spinner -> ActivityIndicator inside a View (RN core, no install needed)
 *   - fetch(...) is unchanged — works natively in RN.
 */

import React, { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
 import { useToast } from './ToastProvider.native';
import { ApiErrorDto, buildUrl, ModelApi } from '../periodcycleApis';
import { useAppSelector } from '@/redux/hooks';

export type ApiResult<TRes> =
  | { success: true; data: TRes }
  | { success: false; error: string };

interface CallOptions {
  silent?: boolean;
  quiet?: boolean;
}

interface ApiContextValue {
  callApi: <TReq, TRes>(model: ModelApi<TReq, TRes>, opts?: CallOptions) => Promise<ApiResult<TRes>>;
  isLoading: boolean;
  lastError: string | undefined;
}

const ApiContext = createContext<ApiContextValue | undefined>(undefined);

const getToken = () => AsyncStorage.getItem('accessToken'); // returns Promise<string | null>

export function ApiProvider({ children }: { children: ReactNode }) {
  const [inFlight, setInFlight] = useState(0);
  const [lastError, setLastError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { showToast } = useToast()
  const user=useAppSelector((i) => i.userSlice) 
  const callApi = useCallback(
    async <TReq, TRes>(model: ModelApi<TReq, TRes>, opts: CallOptions = {}): Promise<ApiResult<TRes>> => {
      if (!opts.silent) setInFlight((n) => n + 1);

      try {
        const token = await getToken();
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

        if (res.status === 401) {
          await AsyncStorage.removeItem('accessToken');
          router.replace('/(main)/HomeScreen'); // adjust to your actual login route path
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
    [router, showToast]
  );

  const isLoading = inFlight > 0;

  return (
    <ApiContext.Provider value={{ callApi, isLoading, lastError }}>
      {children}

      {isLoading && (
        <View style={styles.overlay} pointerEvents="auto">
          <ActivityIndicator size="large" color="#666" />
        </View>
      )}
    </ApiContext.Provider>
  );
}

export function useApi(): ApiContextValue {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error('useApi() must be used inside <ApiProvider>.');
  return ctx;
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 9999,
  },
});

/* ============================================================ */
/*  Mount order — same rule as web                                */
/* ============================================================ */
//
// With Expo Router, wrap your ROOT layout (app/_layout.tsx):
//
//   export default function RootLayout() {
//     return (
//       <ToastProvider>
//         <ApiProvider>
//           <Stack />
//         </ApiProvider>
//       </ToastProvider>
//     );
//   }
//
// No NavigationContainer needed — Expo Router provides that internally.
// useRouter() works anywhere under the root Stack/Slot automatically.
