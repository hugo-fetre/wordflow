import React, { useId } from 'react';

const ScoreChart = ({ score, size }: { score: number, size:number }) => {
  const id = useId(); // ID unique pour chaque instance
  const percent = (score / 50) * 100;
  let angle = percent / 100 * 180;

  let label = '';
  if (percent < 40) {
    label = 'Mauvais';
  } else if (percent < 65) {
    label = 'Moyen';
  } else if (percent < 80) {
    label = 'Bon';
  } else {
    label = 'Très Bon';
  }

  return (
    <div>
      <svg viewBox="0 0 100 60" width={size}>
        <defs>
          <linearGradient id={`gradient-${id}`}>
            <stop offset="0%" stopColor="#3462eb" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <mask id={`mask-${id}`}>
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="white"
              strokeWidth="6"
              strokeDasharray="180"
              pathLength="360"
              strokeLinecap="round"
              transform="rotate(184 50 50)"
            />
            <circle
              cx="50"
              cy="50"
              r="43"
              fill="none"
              stroke="black"
              strokeWidth="8"
              strokeDasharray={`180 ${angle}`}
              pathLength="360"
            />
          </mask>
        </defs>
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="gray"
          strokeWidth="2"
          strokeDasharray="175 360"
          pathLength="360"
          strokeLinecap="round"
          transform="rotate(184 50 50)"
        />
        <rect width="100" height="60" fill={`url(#gradient-${id})`} mask={`url(#mask-${id})`} />
        <text
          x="50"
          y="40"
          textAnchor="middle"
          fill="#fff"
          fontFamily="sans-serif"
        >
          {Math.round(percent)}
        </text>
        <text
          x="50"
          y="52"
          textAnchor="middle"
          fill="#ababab"
          fontFamily="sans-serif"
          fontSize={8}
        >
          {label}
        </text>
        <text
          x="7"
          y="57"
          textAnchor="middle"
          fill="gray"
          fontFamily="sans-serif"
          fontSize="5"
        >
          0
        </text>
        <text
          x="93"
          y="57"
          textAnchor="middle"
          fill="gray"
          fontFamily="sans-serif"
          fontSize="5"
        >
          100
        </text>
      </svg>
    </div>
  );
};

export default ScoreChart;
