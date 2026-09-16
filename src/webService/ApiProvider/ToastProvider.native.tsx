/**
 * ToastProvider.native.tsx — React Native / Expo version
 *
 * Same API as the web version: showToast(type, message, duration?).
 * Requires: no extra install — uses only react-native core (View, Text,
 * TouchableOpacity, Animated).
 */

import React, { createContext, useCallback, useContext, useRef, useState, ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, SafeAreaView } from 'react-native';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
  anim: Animated.Value; // opacity, driven on mount/dismiss
}

interface ToastContextValue {
  showToast: (type: ToastType, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const COLORS: Record<ToastType, { bg: string; border: string; icon: string }> = {
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
    setToasts((list) => {
      const target = list.find((t) => t.id === id);
      if (target) {
        Animated.timing(target.anim, { toValue: 0, duration: 150, useNativeDriver: true }).start();
      }
      return list;
    });
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 150);
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string, duration = 4000) => {
      const id = ++idCounter;
      const anim = new Animated.Value(0);
      setToasts((list) => [...list, { id, type, message, anim }]);
      Animated.timing(anim, { toValue: 1, duration: 200, useNativeDriver: true }).start();
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <SafeAreaView pointerEvents="box-none" style={styles.container}>
        {toasts.map((t) => {
          const c = COLORS[t.type];
          return (
            <Animated.View
              key={t.id}
              style={[
                styles.toast,
                {
                  backgroundColor: c.bg,
                  borderLeftColor: c.border,
                  opacity: t.anim,
                  transform: [
                    {
                      translateY: t.anim.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity style={styles.row} onPress={() => dismiss(t.id)} activeOpacity={0.8}>
                <View style={[styles.iconCircle, { backgroundColor: c.border }]}>
                  <Text style={styles.iconText}>{c.icon}</Text>
                </View>
                <Text style={styles.message}>{t.message}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </SafeAreaView>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast() must be used inside <ToastProvider>.');
  return ctx;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  toast: {
    borderLeftWidth: 4,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4, // Android shadow
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    gap: 10,
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  message: { flex: 1, fontSize: 14, color: '#1f2937', lineHeight: 19 },
});
