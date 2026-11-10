/** Renders text as word + character spans so GSAP can stagger them. */
export function SplitWords({text, className = ''}: {text: string; className?: string}) {
    const words = text.split(' ');
    return (
      <span className={`split ${className}`} aria-label={text}>
        {words.map((word, w) => (
          <span key={w} className="split-word" aria-hidden>
            {word.split('').map((ch, c) => (
              <span key={c} className="split-char">
                {ch}
              </span>
            ))}
            {w < words.length - 1 ? '\u00A0' : ''}
          </span>
        ))}
      </span>
    );
  }