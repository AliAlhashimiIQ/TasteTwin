import React, { useEffect, useRef } from 'react';
import { View, Animated, ViewStyle, StyleSheet, DimensionValue } from 'react-native';

interface SkeletonCardProps {
  variant?: 'card' | 'row';
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({
  variant = 'card',
  width,
  height,
  borderRadius,
  style,
}) => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  if (variant === 'row') {
    return (
      <View style={[styles.rowContainer, style]}>
        <Animated.View
          style={[
            styles.rowImage,
            { opacity: pulseAnim },
          ]}
        />
        <View style={styles.rowContent}>
          <Animated.View
            style={[styles.rowTitle, { opacity: pulseAnim }]}
          />
          <Animated.View
            style={[styles.rowSubtitle, { opacity: pulseAnim }]}
          />
          <Animated.View
            style={[styles.rowTag, { opacity: pulseAnim }]}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.cardContainer, style]}>
      <Animated.View
        style={[
          styles.cardImage,
          {
            opacity: pulseAnim,
            width: width || '100%',
            height: height || 200,
            borderRadius: borderRadius || 16,
          },
        ]}
      />
      <View style={styles.cardContent}>
        <Animated.View
          style={[styles.cardTitle, { opacity: pulseAnim }]}
        />
        <Animated.View
          style={[styles.cardSubtitle, { opacity: pulseAnim }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Card variant
  cardContainer: {
    marginBottom: 16,
  },
  cardImage: {
    backgroundColor: '#2a2a2a',
    marginBottom: 12,
  },
  cardContent: {
    paddingHorizontal: 4,
  },
  cardTitle: {
    backgroundColor: '#2a2a2a',
    height: 16,
    borderRadius: 8,
    width: '70%',
    marginBottom: 8,
  },
  cardSubtitle: {
    backgroundColor: '#201f1f',
    height: 12,
    borderRadius: 6,
    width: '50%',
  },

  // Row variant
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: '#201f1f',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  rowImage: {
    width: 112,
    height: 112,
    borderRadius: 12,
    backgroundColor: '#2a2a2a',
    marginRight: 16,
  },
  rowContent: {
    flex: 1,
    justifyContent: 'center',
  },
  rowTitle: {
    backgroundColor: '#2a2a2a',
    height: 18,
    borderRadius: 9,
    width: '80%',
    marginBottom: 10,
  },
  rowSubtitle: {
    backgroundColor: '#2a2a2a',
    height: 12,
    borderRadius: 6,
    width: '50%',
    marginBottom: 12,
  },
  rowTag: {
    backgroundColor: '#353534',
    height: 24,
    borderRadius: 12,
    width: 80,
  },
});
