import { NOTIFICATION_ALL, NOTIFICATION_PER } from 'constants/request'
import fetchApi from 'helper/fetchApi'

export const pushNotificationAll = (messages) =>
  fetchApi({
    url: NOTIFICATION_ALL,
    options: {
      method: 'POST',
    },
    params: {
      body: messages,
      title: 'Paycheck',
    },
  })

export const pushNotificationPer = (messages, userList) =>
  fetchApi({
    url: NOTIFICATION_PER,
    options: {
      method: 'POST',
    },
    params: {
      body: messages,
      title: 'Paycheck',
      user_ids: userList,
    },
  })
