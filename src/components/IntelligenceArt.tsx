const directions = [
  { label: 'Language', title: 'Language, in context.', detail: 'Exploring models with Indian users and their everyday contexts in mind.', tags: ['Context', 'Adaptation', 'Understanding'] },
  { label: 'Efficiency', title: 'Every detail counts.', detail: 'Investigating model quantization and the balance between resources and quality.', tags: ['Precision', 'Memory', 'Evaluation'] },
  { label: 'Application', title: 'Ideas into applications.', detail: 'Connecting model experiments to clearly defined AI/ML problems.', tags: ['Experiments', 'Prototypes', 'Deployment'] },
];

type Props = { selected: number; onSelect: (index: number) => void };

// Stylized outline for the decorative hero, including the island groups.
const indiaOutline = `M225 64 L237 70 247 65 258 74 266 72 277 83 285 85
  295 78 307 83 313 94 307 105 315 112 311 124 297 126
  291 138 300 147 299 157 313 169 328 175 340 183 357 188
  375 192 389 188 391 177 397 176 402 191 416 191 429 181
  443 177 454 166 469 163 478 152 488 158 490 169 500 174
  491 184 483 187 475 199 465 201 464 214 456 231 447 237
  444 226 447 213 438 216 430 229 425 219 425 208 408 210
  399 207 396 216 401 227 395 236 399 247 389 257 374 264
  366 278 350 288 341 303 326 316 314 329 300 337 291 350
  283 358 282 371 289 379 280 386 278 401 272 413 259 423
  252 416 247 402 239 390 233 376 225 360 219 340 213 322
  209 304 205 287 205 271 196 259 188 259 184 266 172 269
  162 264 152 253 144 242 158 241 170 233 169 225 158 229
  145 225 136 214 142 209 155 211 164 205 177 207 187 197
  183 187 193 177 199 164 209 154 219 146 222 135 217 126
  224 118 219 111 208 109 204 101 211 94 208 84 217 82 Z
  M201 350 l3 3 -1 5 -3 -2 Z M207 365 l3 4 -2 4 -2 -3 Z
  M211 378 l2 3 -1 4 -2 -2 Z
  M427 340 l4 5 -1 11 -3 7 -2 -8 Z M430 367 l3 3 -1 8 -3 -3 Z
  M436 389 l3 4 -1 5 -3 -3 Z M443 405 l3 5 -1 5 -3 -4 Z`;

const mapNodes = [
  { x: 260, y: 169 }, { x: 209, y: 278 }, { x: 270, y: 307 },
  { x: 268, y: 367 }, { x: 379, y: 244 }, { x: 447, y: 199 },
];

export default function IntelligenceArt({ selected, onSelect }: Props) {
  const direction = directions[selected];
  return (
    <div className="atlas" data-direction={selected}>
      <div className="atlas-topline"><span>AN EXPLORATION OF INTELLIGENCE</span><span>0{selected + 1} / 03</span></div>
      <div className="atlas-sculpture" aria-hidden="true">
        <div className="atlas-halo" />
        <svg viewBox="0 0 600 500" fill="none" className="atlas-map" focusable="false">
          <defs>
            <radialGradient id="india-pearl" cx=".3" cy=".24" r=".82">
              <stop stopColor="#ffffff" stopOpacity=".96" />
              <stop offset=".36" stopColor="#fff8eb" stopOpacity=".72" />
              <stop offset=".72" stopColor="#d6e5d6" stopOpacity=".62" />
              <stop offset="1" stopColor="#a8c9b5" stopOpacity=".8" />
            </radialGradient>
            <linearGradient id="india-wire" x1="140" y1="100" x2="440" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d2a47e" /><stop offset=".5" stopColor="#839e84" /><stop offset="1" stopColor="#698e7d" />
            </linearGradient>
            <pattern id="india-grid" width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(-24 300 250)">
              <path d="M24 0H0V24" stroke="#839e84" strokeWidth=".65" opacity=".4" />
            </pattern>
            <clipPath id="india-clip"><path d={indiaOutline} /></clipPath>
            <filter id="india-shadow" x="-40%" y="-40%" width="180%" height="190%">
              <feDropShadow dx="0" dy="24" stdDeviation="20" floodColor="#426853" floodOpacity=".12" />
            </filter>
          </defs>
          <ellipse cx="292" cy="446" rx="133" ry="12" fill="#547d61" opacity=".06" />
          <path d={indiaOutline} fill="url(#india-pearl)" stroke="#fffdf5" strokeWidth="4" strokeLinejoin="round" filter="url(#india-shadow)" />
          <path d={indiaOutline} fill="url(#india-grid)" stroke="url(#india-wire)" strokeWidth="1.3" strokeLinejoin="round" />
          <g clipPath="url(#india-clip)">
            <path d="M260 169Q201 215 209 278T268 367M260 169Q299 218 379 244T447 199M209 278Q240 279 270 307T268 367M270 307Q322 251 379 244M260 169Q282 234 270 307" stroke="url(#india-wire)" strokeWidth="1.2" opacity=".65" />
            {mapNodes.map(({ x, y }, index) => (
              <g key={index}>
                <circle cx={x} cy={y} r="10" fill={index === selected + 1 ? '#d7a078' : '#759884'} opacity=".14" />
                <circle cx={x} cy={y} r="4" fill={index === selected + 1 ? '#c18a60' : '#759884'} stroke="#fffdf3" strokeWidth="2" />
              </g>
            ))}
          </g>
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
