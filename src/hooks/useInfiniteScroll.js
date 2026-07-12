import { useEffect, useRef, useState } from 'react';

export default function useInfiniteScroll(callback) {
  const [isFetching, setIsFetching] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
        }
      },
      { threshold: 0.1, rootMargin: '150px' } // Pre-load content before user reaches the absolute bottom
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [observerTarget]);

  useEffect(() => {
    if (!isFetching) return;
    
    const executeCallback = async () => {
      try {
        await callback();
      } catch (err) {
        console.error("Infinite scroll callback error:", err);
      } finally {
        setIsFetching(false);
      }
    };

    executeCallback();
  }, [isFetching, callback]);

  return [observerTarget, isFetching];
}
