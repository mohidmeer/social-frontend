import TopBar from "../components/TopBar"
import { Controller, useForm } from 'react-hook-form';
import { toast } from "sonner"

import { Switch } from "../components/ui/switch"
import { useEffect, useState } from "react";
import { apiService } from "../api/client";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";


const Settings = () => {



  const { register, handleSubmit, watch , formState: { errors } } = useForm({});


  const onSubmit = (data: any) => {
    const res = apiService.updateUserPassword(data)
    toast.promise(res, {
      loading: 'Updating...',
      success: 'Password Updated Successfully',
      error: 'An Error Occured'
    })

  }


  return (
    <>
      <TopBar pageName="Settings" />

      <div className="my-10">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10  md:max-w-3xl">
          <h3 className="text-lg font-semibold my-4">Profile Settings</h3>
          <div className='p-1  flex md:flex-row flex-col items-center gap-2'>

            <div className="flex flex-col gap-1 w-full ">
              <label className="text-sm font-semibold whitespace-nowrap">
                {errors.password ?
                  <span className=" text-red-500">{errors.password.message as string}</span> :
                  <span>New Password</span>
                }
              </label>
              <div className="relative w-full">

                <input
                  className="input w-full"
                  type="password"
                  data-error={errors.password && true}
                  placeholder="●●●●●●●"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                  })}
                />
              </div>

            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-semibold whitespace-nowrap">
                {errors.confirmPassword ?
                  <span className=" text-red-500">{errors.confirmPassword.message as string}</span> :
                  <span>Confirm new password</span>
                }
              </label>
              <div className="relative w-full">

                <input
                  className="input w-full"
                  type="password"
                  data-error={errors.confirmPassword && true}
                  placeholder="●●●●●●●"
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value: string) => value === watch('password') || 'Passwords do not match'
                  })}
                />
              </div>

            </div>

            <div className="flex flex-col gap-1  w-full md:mt-5">
              <Button className="w-full">Save</Button>
            </div>


          </div>
        </form>
      </div>

      <div className="my-10">
        <SwitchForm />
      </div>
    </>
  )
}
export default Settings




function SwitchForm() {

  type Settings = {
    marketing_emails: boolean
    post_created: boolean
    post_failed: boolean
    low_credits: boolean
  }


  const [loading, setLoading] = useState(true)


  const { control, handleSubmit , reset } = useForm<Settings>()

  useEffect(() => {
    (async () => {
      const { email_notifications } = await apiService.getUserSettings();
      setLoading(false)
       reset(email_notifications)
    })()
  }, [])


async function onSubmit(data: Settings) {
    const settings = apiService.updateSettings(data)
    toast.promise(settings, {
      loading: 'Updating...',
      success: () => {
        return 'Settings Updated Successfully'
      },
      error: 'An Error Occured'
    })

  }

  const fields: {
    name: keyof Settings
    label: string
    description: string
  }[] = [
      {
        name: "marketing_emails",
        label: "Marketing Emails",
        description: "Receive emails about new products, features, and more.",
      },
      {
        name: "post_created",
        label: "Post Created",
        description: "Notify when a post is successfully published.",
      },
      {
        name: "post_failed",
        label: "Post Failed",
        description: "Get notified if a post fails to publish.",
      },
      {
        name: "low_credits",
        label: "Low Credits Warning",
        description: "Get alerts when you're about to run out of credits.",
      },
    ]


    if (loading) {
      return <div>
        YES
      </div>
    }

  return (
    <form onChange={handleSubmit(onSubmit)} className="space-y-6 max-w-md ">
      <h3 className="text-lg font-medium">Email Notifications</h3>

      {fields.map((field) => (
        <Controller
          key={field.name}
          name={field.name}
          control={control}
          render={({ field: controllerField }) => (
            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <Label className="font-semibold text-sm">{field.label}</Label>
                <p className="text-xs font-semibold">{field.description}</p>
              </div>
              <Switch
                checked={controllerField.value}
                onCheckedChange={controllerField.onChange}
              />
            </div>
          )}
        />
      ))}
    </form>
  )
};

