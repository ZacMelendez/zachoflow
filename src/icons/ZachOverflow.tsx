import React from "react";
export default function ZachOverflow(props: any) {
  return (
    <svg
      width="412"
      height="487"
      viewBox="0 0 412 487"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="87" y="356" width="217" height="44" fill="#EE8E41" />
      <rect
        x="99.5043"
        y="259.952"
        width="217"
        height="44"
        transform="rotate(11.4204 99.5043 259.952)"
        fill="#EE8E41"
      />
      <rect
        x="138.727"
        y="160.852"
        width="217"
        height="44"
        transform="rotate(25.2288 138.727 160.852)"
        fill={props.primary}
      />
      <rect
        x="138.147"
        y="161.417"
        width="237"
        height="47.8613"
        transform="rotate(-2.06069 138.147 161.417)"
        fill={props.primary}
      />
      <rect
        x="282.325"
        width="217"
        height="44"
        transform="rotate(53.4029 282.325 0)"
        fill={props.primary}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43 313H0V487H391V313H347V446H43V313Z"
        fill={props.primary}
      />
    </svg>
  );
}
