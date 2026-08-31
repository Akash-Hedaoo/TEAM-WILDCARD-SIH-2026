import React from 'react';

export default function Icon({ name, fill = false, className = '', size, style = {} }) {
  const mergedStyle = {
    ...style,
    ...(fill ? { fontVariationSettings: "'FILL' 1" } : {}),
    ...(size ? { fontSize: `${size}px` } : {}),
  };

  return (
    <span className={`material-symbols-outlined ${className}`} style={mergedStyle}>
      {name}
    </span>
  );
}
