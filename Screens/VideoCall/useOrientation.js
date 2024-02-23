import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const Orientation = {
  Portrait: 'portrait',
  Landscape: 'landscape',
};

const computeOrientation = (windowDimensions) => {
  return windowDimensions.height >= windowDimensions.width
    ? Orientation.Portrait
    : Orientation.Landscape;
};

export const useOrientation = () => {
  const [orientation, setOrientation] = useState(computeOrientation(Dimensions.get('window')));

  const handleOrientationChange = () => {
    const windowDimensions = Dimensions.get('window');
    setOrientation(computeOrientation(windowDimensions));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleOrientationChange);
    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  return orientation;
};
