export function ScrollCue() {
    return (
      <a
        href="#work"
        className="scroll-cue relative z-10 mt-6 inline-flex items-center gap-3 text-micro font-semibold uppercase text-mute"
        aria-label="Scroll to selected work"
      >zzzz
        <span>Scroll</span>
        <span className="cue-line" aria-hidden />
      </a>
    );
  }