import React from 'react'
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { apiService } from '../api/client';
import { toast } from 'sonner';

const Register: React.FC = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {
        toast.promise(
            apiService.Register(data).then(res => {
                if (res.success) {
                    navigate('/auth/login');
                    return 'Redirecting...';
                } else {
                    throw new Error(res.message || 'Registration failed');
                }
            }),
            {
                loading: 'Registering...',
                success: (msg) => msg,
                error: (err) => err.message || 'An error occurred',
            }
        );
    };
return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col  justify-center  items-center  ">
        <div className='gap-10 flex flex-col items-center justify-center max-w-[410px] mx-auto  w-full '>
            <Logo size={50} textOrientation={'flex-row'} />
            <div className='mb-6  mr-auto'>
                <h1 className='text-2xl font-semibold mr-auto'>Create a new account</h1>

            </div>
        </div>

        <div className='p-1 flex flex-col gap-4  mx-auto max-w-[400px]  w-full'>
            <div className="flex flex-col gap-1 ">
                <label className="text-sm">Enter your name</label>
                <div className="relative w-full">

                    <input
                        data-error={errors.username && true}
                        className="input w-full"
                        placeholder="John Doe"
                        {...register('username', { required: 'Name is required' })}
                    />
                </div>
                {errors.username && <p className="text-sm font-semibold text-red-500">{errors.username.message as string}</p>}
            </div>

            <div className="flex flex-col gap-1 w-full">
                <label className="text-sm">Enter your email</label>
                <div className="relative w-full">

                    <input
                        className="input w-full"
                        data-error={errors.email && true}
                        placeholder="johndoe@gmail.com"
                        {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
                        })}
                    />
                </div>
                {errors.email && <p className="text-sm font-semibold text-red-500">{errors.email.message as string}</p>}
            </div>

            <div className="flex flex-col gap-1 ">
                <label className="text-sm">Enter your password</label>
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
                {errors.password && <p className="text-sm font-semibold text-red-500">{errors.password.message as string}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-sm">Confirm password</label>
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
                {errors.confirmPassword && <p className="text-sm font-semibold text-red-500">{errors.confirmPassword.message as string}</p>}
            </div>

            <div className="flex flex-col gap-1">
                <Button className="btn-primary">Submit</Button>
            </div>
            <p className='sm:text-center text-sm mt-2'>Already have an account? <Link to={'/auth/login'} className='underline text-sm font-semibold' >Login</Link></p>

        </div>
    </form>
)
}


export default Register
