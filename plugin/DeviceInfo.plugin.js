import DeviceInfo from 'react-native-device-info';

export default {
  getDeviceInfo: async () => {
    var deviceInfo = {
      deviceName: '',
      deviceManufacturer: '',
      deviceBrand: '',
      deviceModel: '',
      deviceID: '',
      deviceUUID: '',
      isTablet: '',
      appVersion: '',
      sysVersion: '',
    };

    const deviceName = await DeviceInfo.getDeviceName();
    const deviceManufacturer = await DeviceInfo.getManufacturer();
    const deviceBrand = await DeviceInfo.getBrand();
    const deviceModel = await DeviceInfo.getModel();
    const deviceID = await DeviceInfo.getDeviceId();
    const deviceUUID = await DeviceInfo.getUniqueId();
    const isTablet = await DeviceInfo.isTablet();
    const appVersion = await DeviceInfo.getVersion();
    const sysVersion = await DeviceInfo.getSystemVersion();

    deviceInfo.deviceName = deviceName;
    deviceInfo.deviceManufacturer = deviceManufacturer;
    deviceInfo.deviceBrand = deviceBrand;
    deviceInfo.deviceModel = deviceModel;
    deviceInfo.deviceID = deviceID;
    deviceInfo.deviceUUID = deviceUUID;
    deviceInfo.isTablet = isTablet;
    deviceInfo.appVersion = appVersion;
    deviceInfo.sysVersion = sysVersion;

    return deviceInfo;
  },
};
