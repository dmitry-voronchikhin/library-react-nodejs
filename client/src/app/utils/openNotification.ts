import { IconType } from 'antd/es/notification/interface';
import notification from 'antd/lib/notification';

export const openNotification = ({
  title,
  description,
  type,
}: {
  title?: string;
  description?: string;
  type?: IconType;
}) => {
  notification.open({
    message: title,
    description,
    type: type || 'info',
    closable: false,
  });
};
