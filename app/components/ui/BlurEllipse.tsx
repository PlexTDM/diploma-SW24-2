import { BlurView } from "expo-blur"
import React from 'react'

import Svg, { Defs, RadialGradient, Stop, Ellipse } from "react-native-svg";

export default function BlurEllipse() {
  return (
    <BlurView intensity={100} style={{
        position: "absolute",
        top: -3,
        left: -3,
      }}>
      
      <Svg height="500" width="500">
        <Defs>
          <RadialGradient
            id="grad"
            cx="150"
            cy="200"
            rx="200"
            ry="200"
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset="0" stopColor="#2447A4" stopOpacity="0.50" />
            <Stop offset="2" stopColor="#2447A4" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Ellipse cx="150" cy="200" rx="400" ry="400" fill="url(#grad)" />
      </Svg>
    </BlurView>
  )
}