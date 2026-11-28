import React from 'react';
const P: Record<string, React.ReactNode> = {
  target: <><circle cx="24" cy="24" r="17" /><circle cx="24" cy="24" r="10" /><circle cx="24" cy="24" r="3" /></>,
  code: <><path d="M17 14 L7 24 L17 34" /><path d="M31 14 L41 24 L31 34" /><path d="M27 10 L21 38" /></>,
  infinity: <path d="M24 24 C19 16 9 16 9 24 C9 32 19 32 24 24 C29 16 39 16 39 24 C39 32 29 32 24 24 Z" />,
  book: <><path d="M24 12 C18 8 11 8 6 10 V38 C11 36 18 36 24 40 C30 36 37 36 42 38 V10 C37 8 30 8 24 12 Z" /><path d="M24 12 V40" /></>,
  heart: <path d="M24 40 C10 30 6 23 6 17 C6 11 11 7 16 7 C20 7 23 10 24 13 C25 10 28 7 32 7 C37 7 42 11 42 17 C42 23 38 30 24 40 Z" />,
  flask: <><path d="M19 6 H29 M20 6 V18 L9 38 C8 41 10 43 13 43 H35 C38 43 40 41 39 38 L28 18 V6" /><path d="M14 30 H34" /></>,
  pen: <><path d="M10 38 L12 30 L32 10 L38 16 L18 36 Z" /><path d="M28 14 L34 20" /></>,
  eye: <><path d="M4 24 C10 13 17 9 24 9 C31 9 38 13 44 24 C38 35 31 39 24 39 C17 39 10 35 4 24 Z" /><circle cx="24" cy="24" r="7" /></>,
  globe: <><circle cx="24" cy="24" r="18" /><path d="M6 24 H42" /><path d="M24 6 C16 14 16 34 24 42 C32 34 32 14 24 6 Z" /></>,
  briefcase: <><rect x="6" y="15" width="36" height="25" rx="4" /><path d="M17 15 V10 H31 V15" /><path d="M6 26 H42" /></>,
  chat: <path d="M8 10 H40 V32 H22 L13 40 V32 H8 Z" />,
  bolt: <path d="M27 4 L10 27 H23 L20 44 L38 20 H25 Z" />,
  cursor: <path d="M12 6 L12 38 L20 30 L26 43 L31 41 L25 28 L36 28 Z" />,
  doc: <><path d="M12 5 H29 L37 13 V43 H12 Z" /><path d="M18 22 H31 M18 29 H31 M18 36 H26" /></>,
  terminal: <><rect x="5" y="8" width="38" height="32" rx="4" /><path d="M12 18 L18 24 L12 30" /><path d="M22 31 H32" /></>,
  download: <><path d="M24 6 V30" /><path d="M14 21 L24 31 L34 21" /><path d="M8 40 H40" /></>,
  spark: <path d="M24 4 L28 20 L44 24 L28 28 L24 44 L20 28 L4 24 L20 20 Z" />,
  check: <path d="M9 25 L19 35 L39 13" />,
  lang: <><path d="M6 11 H24 M15 7 V11 C15 20 11 27 6 31 M11 18 C13 23 18 27 24 29" /><path d="M26 42 L33 22 L40 42 M28.5 36 H37.5" /></>,
  mic: <><rect x="17" y="5" width="14" height="24" rx="7" /><path d="M10 22 C10 31 16 36 24 36 C32 36 38 31 38 22 M24 36 V43" /></>,
  image: <><rect x="5" y="8" width="38" height="32" rx="4" /><circle cx="16" cy="18" r="4" /><path d="M5 34 L17 24 L27 32 L33 27 L43 35" /></>,
  compass: <><circle cx="24" cy="24" r="18" /><path d="M30 18 L26 26 L18 30 L22 22 Z" /></>,
};
export const Icon: React.FC<{name: string; size?: number; color?: string; sw?: number}> = ({name, size = 40, color = '#fff', sw = 3}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{P[name]}</svg>
);
