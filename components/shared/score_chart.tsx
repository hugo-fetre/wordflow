import React from 'react'

const ScoreChart = ({ score }: { score: number }) => {

    let percent = (score/50)*100;
    let angle = 180 / 100 * percent;
    document.getElementById('c1')?.setAttribute('strokeDasharray', `180 ${angle}`);
    //document.getElementById('l1')?.setAttribute('transform', `translate(50 50) rotate(${angle})`);
    const t1 = document.getElementById('t1');
    const t2 = document.getElementById('t2');
    if(t1){
        t1.textContent = percent.toString();
    }
    if(t2){
        if(percent < 40 ){
            t2.textContent = "Mauvais";
        } else if(percent < 65 ){
            t2.textContent = "Moyen";
        } else if(percent < 80 ){
            t2.textContent = "Bon";
        } else {
            t2.textContent = "Très Bon";
        }
    }
    
  return (
    <div>
        <svg viewBox="0 0 100 60" width="150">
            <defs>
                <linearGradient id="gradient">
                    <stop offset="0%" stopColor="#3462eb" />
                    <stop offset="100%" stopColor="#fff" />
                </linearGradient>
                <mask id="m1">
                    <circle cx="50" cy="50" r="43" fill="none" stroke="white" strokeWidth="6" strokeDasharray="180" pathLength="360" strokeLinecap="round" transform="rotate(184 50 50)"/>
                    <circle id="c1" cx="50" cy="50" r="43" fill="none" stroke="black" strokeWidth="8" strokeDasharray={"180 "+angle} pathLength="360" />
                </mask>
            </defs>
            <circle cx="50" cy="50" r="43" fill="none" stroke="gray" strokeWidth="2" strokeDasharray="175 360" pathLength="360" strokeLinecap="round" transform="rotate(184 50 50)"/>
            <rect width="100" height="60" fill="url(#gradient)" mask="url(#m1)"/>
            <text id="t1" x="50" y="40" textAnchor="middle" fill="#fff" fontFamily="sans-serif">{percent}</text>
            <text id="t2" x="50" y="52" textAnchor="middle" fill="#ababab" fontFamily="sans-serif" fontSize={8}>
                {(percent < 50) && ("Mauvais")}
                {(percent >= 50 && percent < 60) && ("Moyen")}
                {(percent >= 60 && percent < 80) && ("Bon")}
                {(percent >= 80) && ("Très bon")}
            </text>
            <text x="7" y="57" textAnchor="middle" fill="gray" fontFamily="sans-serif" fontSize="5">0</text>
            <text x="93" y="57" textAnchor="middle" fill="gray" fontFamily="sans-serif" fontSize="5">100</text>
            </svg>
    </div>
  )
}

export default ScoreChart