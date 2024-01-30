import {Platform} from 'react-native';

export function logDailyEvent(event) {
  event && console.log('[daily.co event]', event.action);
}

/**
 * For automated testing on browserstack / appium / wd.
 *
 */
export function robotID(id) {
  if (!id) id = '';
  // *coming soon* ios support
  return Platform.OS === 'ios' ? {} : {accessibilityLabel: id};
}
