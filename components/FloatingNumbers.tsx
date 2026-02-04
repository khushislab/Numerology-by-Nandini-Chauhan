
import React, { useEffect, useMemo, useRef } from 'react';

const FloatingNumbers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const numbers = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      val: (i % 9) + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      baseSize: 4 + Math.random() * 6, // 4rem to 10rem
      speed: 0.01 + Math.random() * 0.03,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const elements = containerRef.current?.querySelectorAll('.floating-number');
      if (!elements) return;

      elements.forEach((el, index) => {
        const num = numbers[index];
        const x = (window.innerWidth / 2 - e.clientX) * num.speed;
        const y = (window.innerHeight / 2 - e.clientY) * num.speed;
        (el as HTMLElement).style.transform = `translate(${x}px, ${y}px)`;
        
        // Add glow if close to cursor
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        
        if (dist < 200) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [numbers]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {numbers.map((n, i) => (
        <span 
          key={i} 
          className="floating-number"
          style={{
            top: `${n.top}%`,
            left: `${n.left}%`,
            fontSize: `${n.baseSize}rem`,
          }}
        >
          {n.val}
        </span>
      ))}
    </div>
  );
};

export default FloatingNumbers;
