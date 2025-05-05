import React from "react";
import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";

export default function BlurEllipse() {
  const svgWidth = 600;
  const svgHeight = 550;
  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;

  return (
    <Svg
      width={svgWidth}
      height={svgHeight}
      style={{
        position: "absolute",
        top: -120,
      }}
    >
      <Defs>
        <RadialGradient
          id="grad"
          cx={centerX}
          cy={centerY}
          rx="200"
          ry="200"
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0" stopColor="#719BE3" stopOpacity="0.7" />
          <Stop offset="1" stopColor="#719BE3" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Ellipse
        cx={centerX}
        cy={centerY}
        rx="200"
        ry="200"
        fill="url(#grad)"
      />
    </Svg>
  );
}
