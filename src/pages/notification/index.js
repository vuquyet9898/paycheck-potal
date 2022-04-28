import { XIcon } from '@heroicons/react/solid'
import { pushNotificationAll, pushNotificationPer } from 'actions/notification'
import { getUser } from 'actions/user'
import Spin from 'components/Spin'
import { debounce, isEmpty } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export default function Index() {
  const [t] = useTranslation('common')
  const [loading, setLoading] = useState(false)
  const [hasFocus, setFocus] = useState(false)
  const [messages, setMessages] = useState('')
  const onChangeMessages = (event) => {
    setMessages(event.target.value)
  }

  const [isPushAllUser, setIsPushAllUser] = useState(false)

  const [listUserPick, setListUserPick] = useState([])
  const [listUserSearch, setListUserSearch] = useState([])
  // search
  const [keyword, setKeyword] = useState('')
  const changeHandler = (event) => {
    setKeyword(event.target.value)
  }
  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), [])

  const fetchUsers = async (page) => {
    const response = await getUser({
      page,
      limit: 10,
      personalId: keyword,
    })
    setListUserSearch(response.data.data)
  }
  useEffect(() => {
    fetchUsers()
  }, [keyword])

  const onSendNotification = async () => {
    try {
      if (loading === true) return
      setLoading(true)
      if (isPushAllUser) {
        await pushNotificationAll(messages)
      } else {
        const listToken = listUserPick?.map((item) => {
          return item?._id
        })
        await pushNotificationPer(messages, listToken)
      }
      toast.success(t('alert.success'))
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  const onPickUser = (user) => {
    if (listUserPick.length === 0) {
      return setListUserPick([
        {
          _id: user?._id,
          full_name: user?.full_name,
          freelancer_type: user?.freelancer_type,
        },
      ])
    }
    const isAddItem = listUserPick?.find((itemFilter) => {
      if (itemFilter?._id === user?._id) {
        return true
      }
      return false
    })
    if (!isAddItem) {
      setListUserPick([
        ...listUserPick,
        {
          _id: user?._id,
          full_name: user?.full_name,
          freelancer_type: user?.freelancer_type,
        },
      ])
    }
    return null
  }
  const onRemoveUser = (userRemove) => {
    const listItem = listUserPick?.filter((itemFilter) => {
      if (itemFilter?._id !== userRemove?._id) {
        return itemFilter
      }
      return null
    })
    setListUserPick(listItem)
  }
  const delayHiddenModal = async () => {
    await setTimeout(() => {
      setFocus(false)
    }, 250)
  }
  //
  const disableBtnSendNoti = isPushAllUser
    ? loading || messages.length === 0
    : loading || messages.length === 0 || isEmpty(listUserPick)
  return (
    <div className="px-4  py-4">
      <h1 className="text-2xl font-bold uppercase flex justify-end">
        {t('noti.title')}
      </h1>

      <div className="w-full  mx-auto  rtl mt-6">
        <div className="inline-flex items-center mt-3 ">
          <span className="ml-2 text-gray-700">{t('noti.sendType')}</span>

          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-yellow-600"
            value={isPushAllUser}
            onClick={() => setIsPushAllUser(!isPushAllUser)}
          />
        </div>
        <div className="flex flex-row mt-4">
          <div>{t('noti.select')}</div>
          <div className="text-red-500 px-2">(*)</div>
        </div>
        <div className=" p-4 px-3 ">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded-lg px-3 py-2 mb-4">
              <div className="flex items-center bg-gray-200 rounded-md">
                <div className="pl-2">
                  <svg
                    className="fill-current text-gray-100 w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="heroicon-ui"
                      d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                    />
                  </svg>
                </div>
                <input
                  disabled={isPushAllUser}
                  className={`w-full rounded-md  text-gray-700 leading-tight focus:outline-none py-2 px-2 ${
                    isPushAllUser ? 'bg-slate-100' : 'bg-slate-200'
                  }`}
                  id="search"
                  type="text"
                  placeholder={t('user.titleSearch')}
                  onChange={debouncedChangeHandler}
                  onFocus={() => setFocus(true)}
                  onBlur={delayHiddenModal}
                />
              </div>
              {hasFocus && (
                <div className=" max-h-80  w-full overflow-scroll">
                  {listUserSearch?.map((itemUser) => {
                    const flagUserPick = listUserPick?.find((item) => {
                      if (item?._id === itemUser?._id) {
                        return true
                      }
                      return false
                    })
                    return (
                      <button
                        type="button"
                        className="flex w-full "
                        key={itemUser?._id}
                        onClick={() => {
                          onPickUser(itemUser)
                          setFocus(false)
                        }}
                      >
                        <div className=" text-sm w-full">
                          <div className="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
                            <span
                              className={` h-2 w-2 m-2 rounded-full ${
                                flagUserPick ? 'bg-green-500' : 'bg-gray-400'
                              } `}
                            />
                            <div className="w-full flex right-0  font-medium px-2  ">
                              {itemUser?.full_name}
                            </div>
                            <div className="text-sm font-normal text-gray-500 tracking-wide">
                              {itemUser?.freelancer_type}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-row">
            {listUserPick?.map((item) => (
              <div
                key={item?._id}
                className={` px-4 py-2 mr-3 rounded-md flex flex-row items-center ${
                  isPushAllUser ? 'bg-slate-100' : 'bg-slate-300'
                }`}
              >
                <button
                  disabled={isPushAllUser}
                  onClick={() => onRemoveUser(item)}
                  type="button"
                  className="w-6 h-6 text-red-500 ml-2"
                >
                  <XIcon />
                </button>
                {item?.full_name}
              </div>
            ))}
          </div>

          <div className="flex flex-row mt-12">
            <div>Content</div>
            <div className="text-red-500 px-2">(*)</div>
          </div>
          <div className="w-1/2 mt-6 ">
            <textarea
              className="h-24 w-full border rounded-xl overflow-hidden resize-none focus:border-blue-500 ring-1 ring-transparent focus:ring-blue-500 focus:outline-none text-black p-2 transition ease-in-out duration-300"
              placeholder={t('noti.mes')}
              value={messages}
              onChange={onChangeMessages}
            />
          </div>

          <button
            onClick={onSendNotification}
            disabled={disableBtnSendNoti}
            type="button"
            className={` w-40 mt-6   px-4  flex items-center justify-center  focus:outline-none focus:ring  text-white py-3 rounded-md text-lg font-semibold ${
              !disableBtnSendNoti
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-500 hover:bg-gray-600'
            }`}
          >
            <div className="absolute text-white  mr-20">
              {loading && <Spin />}
            </div>
            <div className="ml-2">{t('alert.send')}</div>
          </button>
        </div>
      </div>
    </div>
  )
}
