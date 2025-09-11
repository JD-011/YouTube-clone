import React from 'react';
import styled from 'styled-components';

const Loader = ({ size = "md", message = "Loading..." }) => {
  const sizeValues = {
    sm: { loaderSize: '60px', border: '6px' },
    md: { loaderSize: '80px', border: '8px' },
    lg: { loaderSize: '100px', border: '10px' },
    xl: { loaderSize: '120px', border: '12px' }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
      <StyledWrapper size={sizeValues[size]}>
        <div aria-live="assertive" role="alert" className="loader" />
      </StyledWrapper>
      
      {message && (
        <p className="mt-6 px-4 py-6 text-gray-300 text-base font-medium text-center animate-pulse-glow">
          {message}
        </p>
      )}

      <style jsx="true">{`
        .animate-pulse-glow {
          animation: textGlow 2s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% {
            opacity: 0.6;
            text-shadow: 0 0 5px rgba(174, 122, 255, 0.3);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 10px rgba(174, 122, 255, 0.6), 0 0 20px rgba(174, 122, 255, 0.4);
          }
        }
      `}</style>
    </div>
  );
}

const StyledWrapper = styled.div`
  .loader {
    --hue: 210;
    --size: ${props => props.size.loaderSize};
    --border: ${props => props.size.border};
    --speed: 1s;
    --blur: var(--border);
  }

  .loader {
    width: var(--border);
    aspect-ratio: 1;
    background: white;
    border-radius: 50%;
    position: relative;
    --y: calc((var(--size) * -0.5) + (var(--border) * 0.5));
    transform: rotate(0deg) translateY(var(--y));
    animation: spin var(--speed) infinite linear;
  }

  .loader::before {
    content: "";
    position: absolute;
    inset: calc(var(--border) * -0.5);
    border-radius: 50%;
    background: white;
    filter: blur(var(--blur));
    z-index: -1;
  }

  .loader::after {
    content: "";
    width: var(--size);
    aspect-ratio: 1;
    position: absolute;
    top: 0%;
    left: 50%;
    translate: -50% 0;
    background: conic-gradient(
      white,
      hsl(var(--hue), 100%, 70%),
      hsl(var(--hue), 100%, 10%),
      transparent 65%
    );
    border-radius: 50%;
    mask: radial-gradient(
      transparent calc(((var(--size) * 0.5) - var(--border)) - 1px),
      white calc((var(--size) * 0.5) - var(--border))
    );
  }

  @keyframes spin {
    to {
      transform: rotate(-360deg) translateY(var(--y));
    }
  }
`;

export default Loader;