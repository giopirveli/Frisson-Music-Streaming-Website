'use client';
import { useEffect } from 'react';

export default function MeasureWidth() {
  useEffect(() => {
    const updateWidths = () => {
      // Total physical screen width (monitor resolution)
      const totalDisplayWidth = window.screen.width; // mteli ekranis zoma

      // Browser viewport width including scrollbar and sidebar
      const viewportWidth = window.innerWidth; // viewport + scrollbar 

      // Browser viewport width excluding scrollbar (content area)
      const contentWidth = document.documentElement.clientWidth; // viewport without scrollbar

      // Width of vertical scrollbar (usually 15-17px)
      const scrollbarWidth = viewportWidth - contentWidth; // viewport (with sidebar) -  viewport (without sidebar)

      // Estimate sidebar width (Opera's left sidebar or similar)
      // It is total screen width minus viewport width minus scrollbar width
      const sidebarWidth = totalDisplayWidth - viewportWidth - scrollbarWidth; // IF opera has sidebar (built-in browser)
      // mteli ekranis zoma - viewport - scrollbar width

      // Clamp sidebar width to zero if negative (no sidebar)
      const sidebarWidthClamped = sidebarWidth > 0 ? sidebarWidth : 0;
      // if browser sidebar is less 0 make it 0

      // Total width taken by scrollbar + sidebar
      const totalTaken = scrollbarWidth + sidebarWidthClamped;
      // scrollbar + sidebar

      // Set CSS variables for use in styles
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`); // scrollbar width
      document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidthClamped}px`); // opera sidebar width might be buggy
      document.documentElement.style.setProperty('--total-taken-width', `${totalTaken}px`);  // just scrollbar + sidebar
    };

   

    // Initial measurement on mount
    updateWidths();  

    // Update measurements on window resize (sidebar or scrollbar might appear/disappear)
    window.addEventListener('resize', updateWidths);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', updateWidths);
    };
  }, []);

  // No UI output — just side effect
  return null;
}


/*

scss variables:

 '--scrollbar-width'  that calculates scrollbar width
 '--sidebar-width' opera has sidebar : calculates size of opera sidebar
 '--total-taken-width' // opera sidebar(if they use opera) + sidebar size number

*/