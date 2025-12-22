import React from "react";
import { View } from "react-native";
import Svg, { Path, Text as SvgText, G } from "react-native-svg";
import { COLORS } from "../constants/Colors";

export default function WheelCanvas({ items, size = 320 }) {
  if (items.length === 0) return null;

  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;
  const sliceAngle = (2 * Math.PI) / items.length;

  const polarToCartesian = (angle, r) => {
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {items.map((item, index) => {
          const startAngle = index * sliceAngle;
          const endAngle = startAngle + sliceAngle;

          const start = polarToCartesian(startAngle, radius);
          const end = polarToCartesian(endAngle, radius);

          const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${start.x} ${start.y}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
            "Z",
          ].join(" ");

          const textAngle = startAngle + sliceAngle / 2;
          const textRadius = radius * 0.7;
          const textPos = polarToCartesian(textAngle, textRadius);

          return (
            <G key={index}>
              <Path
                d={pathData}
                fill={COLORS[index % COLORS.length]}
                stroke="#fff"
                strokeWidth="2"
              />
              <SvgText
                x={textPos.x}
                y={textPos.y}
                fill="white"
                fontSize="14"
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="middle"
                rotation={`${(textAngle * 180) / Math.PI + 90}`}
                origin={`${textPos.x}, ${textPos.y}`}
              >
                {item}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
}
