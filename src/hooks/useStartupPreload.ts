import { useEffect, useMemo, useState } from 'react';

const MIN_SPLASH_MS = 1200;
const IMAGE_TIMEOUT_MS = 4500;

const imageTaskCache = new Map<string, Promise<void>>();

const waitForFonts = () => {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return Promise.resolve();
  }

  return document.fonts.ready.then(() => undefined).catch(() => undefined);
};

const waitForPaint = () =>
  new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });

const waitForIdle = () =>
  new Promise<void>((resolve) => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions
      ) => number;
    };

    if (idleWindow.requestIdleCallback) {
      idleWindow.requestIdleCallback(() => resolve(), { timeout: 600 });
      return;
    }

    window.setTimeout(resolve, 160);
  });

const preloadImage = (src: string) => {
  if (imageTaskCache.has(src)) {
    return imageTaskCache.get(src)!;
  }

  const task = new Promise<void>((resolve) => {
    const image = new Image();
    let settled = false;
    let timeoutId = 0;

    const finish = () => {
      if (settled) {
        return;
      }

      settled = true;
      image.onload = null;
      image.onerror = null;
      window.clearTimeout(timeoutId);
      resolve();
    };

    const finalize = () => {
      if ('decode' in image) {
        image.decode().catch(() => undefined).finally(finish);
        return;
      }

      finish();
    };

    image.decoding = 'async';
    image.referrerPolicy = 'no-referrer';
    image.onload = finalize;
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      finalize();
    }

    timeoutId = window.setTimeout(finish, IMAGE_TIMEOUT_MS);
  });

  imageTaskCache.set(src, task);
  return task;
};

export const useStartupPreload = (assetSources: string[]) => {
  const normalizedAssets = useMemo(
    () => Array.from(new Set(assetSources.filter(Boolean))),
    [assetSources]
  );
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    const startedAt = performance.now();
    const totalTasks = normalizedAssets.length + 1;
    let completedTasks = 0;

    const updateProgress = () => {
      completedTasks += 1;

      if (!isCancelled) {
        setProgress(Math.min(100, Math.round((completedTasks / totalTasks) * 100)));
      }
    };

    const run = async () => {
      const fontTask = waitForFonts().finally(updateProgress);
      const imageTasks = normalizedAssets.map((src) => preloadImage(src).finally(updateProgress));

      await Promise.allSettled([fontTask, ...imageTasks]);
      await waitForPaint();
      await waitForIdle();

      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);

      if (remaining > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, remaining));
      }

      if (isCancelled) {
        return;
      }

      setProgress(100);
      setIsReady(true);
    };

    run();

    return () => {
      isCancelled = true;
    };
  }, [normalizedAssets]);

  return { isReady, progress };
};
