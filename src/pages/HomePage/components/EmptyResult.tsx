import React from "react";
import { Text } from 'vcc-ui';

export const EmptyResult = () => {
  return (
    <Text as={'h2'} extend={{ textAlign: 'center', width: '100%', fontWeight: 600 }}>
      No cars found.
    </Text>
  )
}
