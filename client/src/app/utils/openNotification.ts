import { IconType } from 'antd/es/notification/interface';
import notification from 'antd/lib/notification';

export const openNotification = (
  title: string,
  description: string,
  type: IconType | undefined = 'info',
) => {
  notification.open({
    message: title,
    description,
    type: type,
  });
};
