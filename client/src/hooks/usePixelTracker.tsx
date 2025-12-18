import { useEffect } from 'react';
import { useLocation } from 'wouter';
import ReactPixel from 'react-facebook-pixel';

const PIXEL_ID = '1566012041488304';

export function usePixelTracker() {
  const [location] = useLocation();

  useEffect(() => {
    // Initialize pixel on mount
    ReactPixel.init(PIXEL_ID, undefined, {
      autoConfig: true,
      debug: false,
    });

    // Track initial page view
    ReactPixel.pageView();
  }, []);

  useEffect(() => {
    // Track page view on route change
    ReactPixel.pageView();
  }, [location]);
}
