import React, { useState, useEffect } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  charDelay?: number; // 30ms as specified
  initialDelay?: number; // 200ms as specified
  transitionDuration?: number; // 500ms as specified
}

export function AnimatedHeading({
  text,
  className = '',
  charDelay = 30,
  initialDelay = 200,
  transitionDuration = 500,
}: AnimatedHeadingProps) {
  const [isTriggered, setIsTriggered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTriggered(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  const lines = text.split('\n');

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        const lineLength = line.length;
        return (
          <span key={lineIndex} className="block overflow-visible mb-1">
            {line.split('').map((char, charIndex) => {
              const delayMs = lineIndex * lineLength * charDelay + charIndex * charDelay;
              const isSpace = char === ' ';

              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all ease-out"
                  style={{
                    opacity: isTriggered ? 1 : 0,
                    transform: isTriggered ? 'translateX(0)' : 'translateX(-18px)',
                    transitionDuration: `${transitionDuration}ms`,
                    transitionDelay: `${delayMs}ms`,
                    transitionProperty: 'opacity, transform',
                  }}
                >
                  {isSpace ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
