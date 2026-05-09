import { motion, MotionValue } from "motion/react";

interface CompassIconProps {
  size?: number;
  color?: string;
  accentColor?: string;
  className?: string;
  animated?: boolean;
}

export function CompassIcon({
  size = 24,
  color = "#111110",
  accentColor = "#BA7517",
  className = "",
  animated = false,
}: CompassIconProps) {
  const needle = (
    <g>
      {/* North needle (amber) */}
      <polygon
        points={`0,-${size * 0.32} ${size * 0.07},0 0,-${size * 0.06} -${size * 0.07},0`}
        fill={accentColor}
      />
      {/* South needle */}
      <polygon
        points={`0,${size * 0.32} ${size * 0.07},0 0,${size * 0.06} -${size * 0.07},0`}
        fill={color}
        opacity="0.4"
      />
    </g>
  );

  return (
    <svg
      width={size}
      height={size}
      viewBox={`-${size / 2} -${size / 2} ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="0" cy="0" r={size * 0.46} stroke={color} strokeWidth={size * 0.025} fill="none" />
      {/* Inner dot */}
      <circle cx="0" cy="0" r={size * 0.04} fill={accentColor} />
      {/* Cardinal marks */}
      <line x1="0" y1={-size * 0.46} x2="0" y2={-size * 0.38} stroke={color} strokeWidth={size * 0.02} />
      <line x1="0" y1={size * 0.46} x2="0" y2={size * 0.38} stroke={color} strokeWidth={size * 0.02} />
      <line x1={-size * 0.46} y1="0" x2={-size * 0.38} y2="0" stroke={color} strokeWidth={size * 0.02} />
      <line x1={size * 0.46} y1="0" x2={size * 0.38} y2="0" stroke={color} strokeWidth={size * 0.02} />
      {animated ? (
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "0 0" }}
        >
          {needle}
        </motion.g>
      ) : (
        needle
      )}
    </svg>
  );
}

export function CompassRose({
  size = 400,
  color = "#111110",
  accentColor = "#BA7517",
  className = "",
  opacity = 1,
  scrollRotate,
}: {
  size?: number;
  color?: string;
  accentColor?: string;
  className?: string;
  opacity?: number;
  scrollRotate?: MotionValue<number>;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="-200 -200 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      {/* Outer ring */}
      <circle cx="0" cy="0" r="180" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      {/* Middle ring */}
      <circle cx="0" cy="0" r="140" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Inner ring */}
      <circle cx="0" cy="0" r="80" stroke={color} strokeWidth="0.5" fill="none" opacity="0.3" />
      {/* Small center ring */}
      <circle cx="0" cy="0" r="8" stroke={accentColor} strokeWidth="1.5" fill="none" />

      {/* Cardinal tick marks */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const isCardinal = angle % 90 === 0;
        const innerR = isCardinal ? 160 : 170;
        const x1 = Math.sin(rad) * innerR;
        const y1 = -Math.cos(rad) * innerR;
        const x2 = Math.sin(rad) * 180;
        const y2 = -Math.cos(rad) * 180;
        return (
          <line
            key={angle}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={isCardinal ? 1.5 : 0.7}
            opacity={isCardinal ? 0.7 : 0.3}
          />
        );
      })}

      {/* Needle group — scroll-driven when scrollRotate is provided, else infinite spin */}
      {scrollRotate ? (
        <motion.g
          style={{
            rotate: scrollRotate,
            transformOrigin: "0px 0px",
          }}
        >
          {/* North needle (amber) */}
          <polygon points="0,-155 12,0 0,-10 -12,0" fill={accentColor} opacity="0.9" />
          {/* South needle (dark) */}
          <polygon points="0,155 12,0 0,10 -12,0" fill={color} opacity="0.35" />
        </motion.g>
      ) : (
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "0px 0px" }}
        >
          <polygon points="0,-155 12,0 0,-10 -12,0" fill={accentColor} opacity="0.9" />
          <polygon points="0,155 12,0 0,10 -12,0" fill={color} opacity="0.35" />
        </motion.g>
      )}

      {/* Center dot */}
      <circle cx="0" cy="0" r="5" fill={accentColor} />

      {/* Cross hairs subtle */}
      <line x1="0" y1="-180" x2="0" y2="180" stroke={color} strokeWidth="0.3" opacity="0.15" />
      <line x1="-180" y1="0" x2="180" y2="0" stroke={color} strokeWidth="0.3" opacity="0.15" />
    </motion.svg>
  );
}