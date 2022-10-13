import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 480;
const guidelineBaseHeight = 820;

const scale = size => DeviceInfo.isTablet() ? width / guidelineBaseWidth * size : size;
const verticalScale = size => height / guidelineBaseHeight * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
const scalledPixel = type => {
    let pixelArr = {}
    for (let i = 0; i < 1000; i++) {
        if (type == 'font') {
            if (DeviceInfo.isTablet()) {
                pixelArr[i] = scale(i);
            } else {
                pixelArr[i] = i;
            }
        } else {
            if (DeviceInfo.isTablet()) {
                pixelArr[i] = type == 'h' ? verticalScale(i) : moderateScale(i);
            } else {
                pixelArr[i] = i;
            }
        }
    }
    return pixelArr;
}

export { scale, verticalScale, moderateScale, scalledPixel };