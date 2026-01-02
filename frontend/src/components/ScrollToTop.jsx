import React, { useEffect, useState, useRef } from 'react'
import { ArrowUp } from 'lucide-react'




function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const scrollContainerRef = useRef(window) // Reference to the scroll container

  const toggleVisibility = (e) => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let target = window;

    if (e && e.target) {
      if (e.target === document) {
        scrollTop = window.scrollY || document.documentElement.scrollTop;
        target = window;
      } else if (e.target instanceof HTMLElement) {
        scrollTop = e.target.scrollTop;
        target = e.target;
      }
    }

    if (target) {
      scrollContainerRef.current = target;
    }

    setIsVisible(scrollTop > 200)
  }

  const scrollToTop = () => {
    const container = scrollContainerRef.current;

    // console.log("Scrolling container to top:", container);

    if (container === window || container === document) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (container && container.scrollTo) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (container && container.scrollTop !== undefined) {
      container.scrollTop = 0;
    }
  }

  useEffect(() => {
    // Use capture: true to catch scroll events from children (divs) that don't bubble
    window.addEventListener('scroll', toggleVisibility, true)

    // Also check initial window state
    toggleVisibility({ target: document });

    return () => window.removeEventListener('scroll', toggleVisibility, true)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
    >
      <div className='p-3.5 rounded-2xl bg-white text-black shadow-lg hover:bg-primary/90 transition-colors'>
        <button
          onClick={scrollToTop}
          className=''
          aria-label="Scroll to top"
        >
          <ArrowUp className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}

export default ScrollToTop;
