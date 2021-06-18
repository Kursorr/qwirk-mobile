/**
 * File: Screen Logic
 * Author: HakobiDev
 * Date Created: 06192021
 * Date Modified: 06192021
**/


import * as application from '@nativescript/core/application';
import * as utils from '@nativescript/core/utils';

export default function getStatusBarHeight(): any {
  let result = 0;
  if (application.android) {
    const resourceId = (application.android.foregroundActivity || application.android.startActivity).getResources().getIdentifier('status_bar_height', 'dimen', 'android');
    if (resourceId) {
      result = (application.android.foregroundActivity || application.android.startActivity).getResources().getDimensionPixelSize(resourceId);

      result = utils.layout.toDeviceIndependentPixels(result);
    }
  }
  return result;
}

export function getNavigationBarHeight(): any {
  let result = 0;
  if (application.android) {
    const resourceId = (application.android.foregroundActivity || application.android.startActivity).getResources().getIdentifier('navigation_bar_height', 'dimen', 'android');
    if (resourceId) {
      result = (application.android.foregroundActivity || application.android.startActivity).getResources().getDimensionPixelSize(resourceId);

      result = utils.layout.toDeviceIndependentPixels(result);
    }
  }
  return result;
}
