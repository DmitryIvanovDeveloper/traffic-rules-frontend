export function defineDeviceType(): DeviceType {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return DeviceType.Tab;
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return DeviceType.Phone;
  }
  return DeviceType.Desktop;
}

export enum DeviceType {
  Unknown = "Unknown",
  Desktop = "Desktop",
  Phone = "Phone",
  Tab = "Tab",
}
