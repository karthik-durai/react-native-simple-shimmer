## React Native Simple Shimmer

### Example

```js
import React from 'react';
import { View } from 'react-native';
import { SimpleShimmer } from 'react-native-simple-shimmer'

function App() {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ height: '30%', width: '100%' }}>
          <SimpleShimmer />
        </View>
        <View style={{ height: '10%', width: '100%' }}/>
        <View style={{ height: '30%', width: '50%' }}>
          <SimpleShimmer />
        </View>
        <View style={{ height: '10%', width: '100%' }}/>
        <View style={{ height: '5%', width: '50%' }}>
          <SimpleShimmer />
        </View>
      </View>
    </>
  );
};

export default App
