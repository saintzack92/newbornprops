import React from 'react'
import styles from '../../../ui/dashboard/users/addUser/singleUser/singleUser.module.css'
import Input from '../../../ui/dashboard/input/input'
import img from '../../../../../../public/7.jpg'
import Image from 'next/image'

const SingleProductPage = () => {
    return (
        <div className={`${styles.container}  gap-[50px] mt-[20px]`}>
            <div className={`${styles.infoContainer} flex-[1] text-[var(--textSoft)] font-[500] h-max bg-[var(--bgSoft)] p-[20px] rounded-[10px]`}>
                <div className={`${styles.imgContainer} w-[100%] h-[300px] relative rounded-[10px] mb-[20px] overflow-hidden`}>
                    <Image src={img} alt='' fill  className='object-contain'/>
                </div>
                John Doe
            </div>
            <div className={`${styles.formContainer} flex-[3] text-[var(--textSoft)] p-[20px] rounded-[10px] bg-[var(--bgSoft)]`}>
                <form action="" className='flex flex-col'>

                    <Input
                        type='text'
                        name='title'
                        placeholder='title'
                        customClasses={`${styles}`}
                        labelTxt='Title'
                    />
                    <Input
                        type='email'
                        name='email'
                        placeholder='johndoe@gmail.com'
                        customClasses={`${styles}`}
                        labelTxt='Email'
                    />
                    <Input
                        type='password'
                        name='password'
                        placeholder='*******'
                        customClasses={`${styles}`}
                        labelTxt='Password'
                    />
                    <Input
                        type='text'
                        name='phone'
                        placeholder='+6289898989'
                        customClasses={`${styles}`}
                        labelTxt='Phone'
                    />
                    <Input
                        isTextArea={true}
                        type='text'
                        name='address'
                        placeholder='New York'
                        customClasses={`${styles}`}
                        labelTxt='Address'
                    />
                    <Input
                        isSelect={true}
                        name='isAdmin'
                        customClasses={`${styles}`}
                        labelTxt='is Admin ?'
                    />
                    <Input
                        isSelect={true}
                        name='isActive'
                        customClasses={`${styles}`}
                        labelTxt='is Active ?'
                    />
                    <Input
                    isButton={true}
                    customClasses={`mt-[20px] border-none `}
                    name={'Update'}
                    />
                </form>


            </div>
        </div>
    )
}

export default SingleProductPage