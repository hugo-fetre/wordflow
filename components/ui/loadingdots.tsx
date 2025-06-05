// components/LoadingDots.tsx
export function LoadingDots({
  color = '#000',
  message = 'En cours'
}: {
  color?: string,
  message?: string
}) {
  return (
    <div className="loadingWrapper">
        <span className="loadingMessage">{message}</span>
        <span className="loading">
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
        </span>
        
        <style jsx>{`
            .loadingWrapper {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                margin: 0 5px;
            }

            .loadingMessage {
                margin-right: 10px;
                font-size: 8pt;
            }
            
            .loading {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            }

            .loading span {
            display: block;
            width: 4px;
            height: 4px;
            margin: 0 1px;
            border-radius: 50%;
            animation: loadingDots 1s infinite ease-in-out;
            }

            .loading span:nth-child(1) {
            animation-delay: 0ms;
            }

            .loading span:nth-child(2) {
            animation-delay: 200ms;
            }

            .loading span:nth-child(3) {
            animation-delay: 400ms;
            }

            @keyframes loadingDots {
            0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.3;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
            }
        `}</style>
    </div>
  );
}
