const LoadingDots = () => {
  return (
    <div className="loading-dots">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <style jsx>{`
        .loading-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .dot {
          width: 8px;
          height: 8px;
          background-color: black;
          border-radius: 50%;
          animation: dot-blink 1s infinite;
        }
        @keyframes dot-blink {
          0%, 20%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingDots;
