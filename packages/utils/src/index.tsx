export * from './images';
import classNames from 'classnames';
import useCopyClick from 'antd/es/typography/hooks/useCopyClick';
import TransButton from 'antd/es/_util/transButton';
import useMergedState from './hooks/useMergedState';
import useForceUpdate from './hooks/useForceUpdate';
import useCountdown from './hooks/useCountdown';
import useInterval from './hooks/useInterval';


const convertByteUnit = (bytes: number, digits?: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let unitIndex = 0;
  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }
  return `${bytes.toFixed(digits || 2)} ${units[unitIndex]}`;
};

export {
  classNames, TransButton,
  convertByteUnit,
  useMergedState,
  useForceUpdate,
  useCopyClick,
  useCountdown,
  useInterval
};
