import { useNotification } from './NotificationStore';

const Notification = () => {
  const message = useNotification();

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  return (
    <div>
      {message && (
        <div style={style} data-testid='notification'>
          {message}
        </div>
      )}
    </div>
  );
};

export default Notification;
