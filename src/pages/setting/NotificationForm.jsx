import { Checkbox } from '@nextui-org/react'
import { useForm, Controller } from 'react-hook-form'
import {
  useGetNoticPrefence,
  useUpdateNoticePrefence,
} from '../../api/settingsApis'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import Loader from '../Loader'
import { useEffect, useState } from 'react'

export default function NotificationForm() {
  const { isLoading } = useGetNoticPrefence()
  return (
    <>
      {isLoading ? (
        <div className='min-h-screen mx-auto'>
          <Loader />
        </div>
      ) : (
        <NotificationsFormContents />
      )}
    </>
  )
}

const NotificationsFormContents = () => {
  const { data: noticePrefencents } = useGetNoticPrefence()
  const queryClient = useQueryClient()
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      email_new_features: false,
      email_new_tasks: false,
      email_money_earned: false,
      in_app_new_features: false,
      in_app_new_tasks: false,
      in_app_money_earned: false,
      push_new_features: false,
      push_new_tasks: false,
      push_money_earned: false,
    },
  })

  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    if (noticePrefencents) {
      const initialValues = {
        email_new_features: noticePrefencents.email_new_features || false,
        email_new_tasks: noticePrefencents.email_new_tasks || false,
        email_money_earned: noticePrefencents.email_money_earned || false,
        in_app_new_features: noticePrefencents.in_app_new_features || false,
        in_app_new_tasks: noticePrefencents.in_app_new_tasks || false,
        in_app_money_earned: noticePrefencents.in_app_money_earned || false,
        push_new_features: noticePrefencents.push_new_features || false,
        push_new_tasks: noticePrefencents.push_new_tasks || false,
        push_money_earned: noticePrefencents.push_money_earned || false,
      }
      reset(initialValues)
      setInitialValues(initialValues)
    }
  }, [noticePrefencents, reset])

  const { mutateAsync: handleNoticePrefencents } = useUpdateNoticePrefence()

  const onSubmit = async (data) => {
    try {
      const changedData = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== initialValues[key]) {
          acc.push({ setting_name: key, value: data[key] })
        }
        return acc
      }, [])

      if (changedData.length === 0) {
        // toast.error('No changes detected')
        return
      }

      for (const change of changedData) {
        const res = await handleNoticePrefencents({ data: change })
        console.log(res)
        if (res?.data?.status === 'success') {
          // toast.success(res.data.message)
        }
      }

      queryClient.invalidateQueries({ queryKey: ['notice_preference'] })
    } catch (error) {
      // toast.error(error.response?.data?.message ?? error.message)
    }
  }

  const renderCheckbox = (name, label) => (
    <div className='self-stretch p-3 bg-gray-200 dark:bg-white dark:bg-opacity-10 dark:border dark:border-stone-900 justify-start items-center gap-1.5 inline-flex'>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            radius='none'
            color='secondary'
            className='text-white'
            {...field}
            isSelected={field.value}
            onChange={(e) => {
              field.onChange(e.target.checked)
              handleSubmit(onSubmit)()
            }}
            classNames={{
              label:
                "grow shrink basis-0 text-black dark:text-white dark:text-opacity-50 text-[12.83px] font-medium font-['Manrope']",
            }}
          >
            {label}
          </Checkbox>
        )}
      />
    </div>
  )

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='w-full md:px-16 py-6 flex-col justify-start items-start gap-12 inline-flex'>
          <div className='self-stretch h-[182px] flex-col justify-start items-start gap-6 flex'>
            <div className="text-sm font-bold font-['Manrope']">
              Email Alert
            </div>
            <div className='self-stretch flex-col justify-start items-center gap-0.5 flex'>
              {renderCheckbox('email_new_features', 'New features and updates')}
              {renderCheckbox('email_new_tasks', 'New Tasks')}
              {renderCheckbox('email_money_earned', 'Money earned')}
            </div>
          </div>
          <div className='self-stretch flex-col justify-start items-start gap-6 flex'>
            <div className="text-sm font-bold font-['Manrope']">
              In-App Alert
            </div>
            <div className='self-stretch flex-col justify-start items-center gap-0.5 flex'>
              {renderCheckbox(
                'in_app_new_features',
                'New features and updates'
              )}
              {renderCheckbox('in_app_new_tasks', 'New Tasks')}
              {renderCheckbox('in_app_money_earned', 'Money earned')}
            </div>
          </div>
          <div className='self-stretch flex-col justify-start items-start gap-6 flex'>
            <div className="text-sm font-bold font-['Manrope']">
              Push Notifications
            </div>
            <div className='self-stretch flex-col justify-start items-center gap-0.5 flex'>
              {renderCheckbox('push_new_features', 'New features and updates')}
              {renderCheckbox('push_new_tasks', 'New Tasks')}
              {renderCheckbox('push_money_earned', 'Money earned')}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
