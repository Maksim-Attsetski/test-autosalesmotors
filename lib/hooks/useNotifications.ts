import { useEffect, useState } from "react";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export function useNotifications() {
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);

  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return { notify: schedulePushNotification, notification };
}

async function schedulePushNotification(content: Notifications.NotificationContentInput) {
  await Notifications.scheduleNotificationAsync({
    content,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 10,
    },
  });
}
