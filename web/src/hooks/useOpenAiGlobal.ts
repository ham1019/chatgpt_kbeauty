import { useSyncExternalStore, useState, useCallback, useEffect } from 'react';
import type { OpenAiGlobals } from '../types';

const SET_GLOBALS_EVENT_TYPE = 'openai:set_globals';

/**
 * Hook to subscribe to window.openai global values
 * Automatically re-renders when the value changes via openai:set_globals event
 */
export function useOpenAiGlobal<K extends keyof OpenAiGlobals>(
  key: K
): OpenAiGlobals[K] | undefined {
  return useSyncExternalStore(
    (onChange) => {
      const handleSetGlobal = (event: CustomEvent<{ globals: Partial<OpenAiGlobals> }>) => {
        const value = event.detail.globals[key];
        if (value === undefined) {
          return;
        }
        onChange();
      };

      window.addEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal as EventListener, {
        passive: true,
      });

      return () => {
        window.removeEventListener(SET_GLOBALS_EVENT_TYPE, handleSetGlobal as EventListener);
      };
    },
    () => window.openai?.[key]
  );
}

/**
 * Hook to get tool output data
 */
export function useToolOutput() {
  return useOpenAiGlobal('toolOutput');
}

/**
 * Hook to get tool input data
 */
export function useToolInput() {
  return useOpenAiGlobal('toolInput');
}

/**
 * Hook to get current theme
 */
export function useTheme() {
  return useOpenAiGlobal('theme') ?? 'light';
}

/**
 * Hook to get current locale
 */
export function useLocale() {
  return useOpenAiGlobal('locale') ?? 'en-US';
}

/**
 * Hook to manage widget state with persistence
 * Automatically saves state to window.openai.setWidgetState
 */
export function useWidgetState<T extends Record<string, unknown>>(
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    const savedState = window.openai?.widgetState as T | null;
    return savedState ?? initialValue;
  });

  const setWidgetState = useCallback((value: T | ((prev: T) => T)) => {
    setState((prev) => {
      const newState = typeof value === 'function' ? value(prev) : value;
      window.openai?.setWidgetState?.(newState);
      return newState;
    });
  }, []);

  // Sync with external changes
  useEffect(() => {
    const handleSetGlobal = (event: CustomEvent<{ globals: Partial<OpenAiGlobals> }>) => {
      if (event.detail.globals.widgetState !== undefined) {
        setState(event.detail.globals.widgetState as T);
      }
    };

    window.addEventListener('openai:set_globals', handleSetGlobal as EventListener);
    return () => {
      window.removeEventListener('openai:set_globals', handleSetGlobal as EventListener);
    };
  }, []);

  return [state, setWidgetState];
}
