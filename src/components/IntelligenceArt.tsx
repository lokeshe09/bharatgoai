const directions = [
  { label: 'Language', title: 'Language, in context.', detail: 'Exploring models with Indian users and their everyday contexts in mind.', tags: ['Context', 'Adaptation', 'Understanding'] },
  { label: 'Efficiency', title: 'Every detail counts.', detail: 'Investigating model quantization and the balance between resources and quality.', tags: ['Precision', 'Memory', 'Evaluation'] },
  { label: 'Application', title: 'Ideas into applications.', detail: 'Connecting model experiments to clearly defined AI/ML problems.', tags: ['Experiments', 'Prototypes', 'Deployment'] },
];

type Props = { selected: number; onSelect: (index: number) => void };

export default function IntelligenceArt({ selected, onSelect }: Props) {
  const direction = directions[selected];
  return (
    <div className="atlas" data-direction={selected}>
      <div className="atlas-topline"><span>AN EXPLORATION OF INTELLIGENCE</span><span>0{selected + 1} / 03</span></div>
      <div className="atlas-sculpture" aria-hidden="true">
        <div className="atlas-halo" />
        <svg viewBox="0 0 600 500" fill="none" className="atlas-orb">
          <defs>
            <radialGradient id="orb-pearl" cx=".3" cy=".24" r=".82">
              <stop stopColor="#ffffff" stopOpacity=".96" />
              <stop offset=".36" stopColor="#fff8eb" stopOpacity=".72" />
              <stop offset=".72" stopColor="#d6e5d6" stopOpacity=".62" />
              <stop offset="1" stopColor="#a8c9b5" stopOpacity=".8" />
            </radialGradient>
            <linearGradient id="orb-wire" x1="140" y1="100" x2="440" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d2a47e" /><stop offset=".5" stopColor="#839e84" /><stop offset="1" stopColor="#698e7d" />
            </linearGradient>
            <linearGradient id="orb-ring" x1="55" y1="160" x2="535" y2="335" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e4b083" /><stop offset=".45" stopColor="#fffaec" /><stop offset=".8" stopColor="#80a394" /><stop offset="1" stopColor="#c2b2d3" />
            </linearGradient>
            <filter id="orb-shadow" x="-40%" y="-40%" width="180%" height="190%">
              <feDropShadow dx="0" dy="24" stdDeviation="20" floodColor="#426853" floodOpacity=".12" />
            </filter>
          </defs>
          <ellipse cx="300" cy="427" rx="133" ry="12" fill="#547d61" opacity=".06" />
          <ellipse cx="300" cy="250" rx="253" ry="103" transform="rotate(-26 300 250)" stroke="url(#orb-ring)" strokeWidth="1.3" opacity=".6" />
          <circle cx="300" cy="250" r="164" fill="url(#orb-pearl)" stroke="#fff" strokeWidth="1.5" filter="url(#orb-shadow)" />
          <g className="atlas-wireframe" stroke="url(#orb-wire)" strokeWidth=".7" opacity=".58">
            {[24, 52, 80, 108, 136, 160].map(radius => <ellipse key={radius} cx="300" cy="250" rx={radius} ry="164" transform="rotate(-24 300 250)" />)}
            {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map(offset => <ellipse key={offset} cx="300" cy={250 + offset} rx={Math.sqrt(164 ** 2 - offset ** 2)} ry={Math.sqrt(164 ** 2 - offset ** 2) * .22} transform="rotate(-24 300 250)" />)}
          </g>
          <g className="atlas-satellite">
            <ellipse cx="300" cy="250" rx="237" ry="78" transform="rotate(27 300 250)" stroke="url(#orb-ring)" strokeWidth="9" opacity=".38" />
            <ellipse cx="300" cy="250" rx="241" ry="80" transform="rotate(27 300 250)" stroke="#fffdf3" strokeWidth="1.5" />
            <circle cx="86" cy="144" r="7" fill="#d7a078" stroke="#fff8e8" strokeWidth="3" />
            <circle cx="513" cy="355" r="5" fill="#759884" stroke="#fff" strokeWidth="2" />
          </g>
          <path d="M290 250h20m-10-10v20" stroke="#658977" opacity=".6" />
        </svg>
        <div className="atlas-float atlas-float-language"><span className="atlas-float-kicker">ROOTED IN CONTEXT</span><span className="atlas-scripts">अ <span>అ</span> அ</span></div>
        <div className="atlas-float atlas-float-note"><span className="atlas-note-dot" /><div><strong>Thoughtfully engineered</strong><span>From a question to a possibility.</span></div></div>
        <span className="atlas-coordinate">LANGUAGE × EFFICIENCY × APPLICATION</span>
      </div>
      <div className="atlas-console">
        <div className="atlas-controls" role="group" aria-label="Explore a research direction">
          {directions.map((item, index) => (
            <button key={item.label} type="button" aria-pressed={selected === index} aria-controls="atlas-description" onClick={() => onSelect(index)}>
              <span>0{index + 1}</span>{item.label}
            </button>
          ))}
        </div>
        <div id="atlas-description" className="atlas-description" aria-live="polite" aria-atomic="true">
          <div><h2>{direction.title}</h2><p>{direction.detail}</p></div>
          <div className="atlas-tags">{direction.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
    </div>
  );
}
