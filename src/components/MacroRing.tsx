import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface MacroRingProps {
  label: string;
  current: number;
  goal: number;
  unit: string;
  color: string;
  size?: number;
}

export const MacroRing = ({ label, current, goal, unit, color, size = 80 }: MacroRingProps) => {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(current / Math.max(goal, 1), 1);
  const strokeDashoffset = circumference * (1 - progress);
  const remaining = Math.max(goal - current, 0);
  const isOver = current > goal;

  return (
    <View className="items-center">
      <View style={{ width: size, height: size, position: 'relative' }}>
        <Svg width={size} height={size}>
          {/* Background ring */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress ring */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isOver ? '#ff6b6b' : color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        {/* Center text */}
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: isOver ? '#ff6b6b' : '#fff', fontSize: 16, fontWeight: '800' }}>
            {remaining}
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.4)', fontSize: 8, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {unit}
          </Text>
        </View>
      </View>
      <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1.5, marginTop: 8 }}>
        {label}
      </Text>
      <Text style={{ color: 'rgba(255,255,255,0.3)', fontSize: 9, marginTop: 2 }}>
        {current}/{goal}{unit}
      </Text>
    </View>
  );
};
