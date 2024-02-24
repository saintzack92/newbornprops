import React from 'react'
import styles from '../../../ui/dashboard/users/addUser/singleUser/singleUser.module.css'
import Input from '../../../ui/dashboard/input/input'
import img from '../../../../../../public/7.jpg'
import Image from 'next/image'

const SingleProductPage = () => {
    return (
        <div className={`${styles.container}  gap-[50px] mt-[20px]`}>
            <div className={`${styles.infoContainer} flex-[1] text-[var(--textSoft)] font-[500] h-max bg-[var(--bgSoft)] p-[20px] rounded-[10px] text-center`}>
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
                        type='number'
                        name='price'
                        placeholder='56000'
                        customClasses={`${styles}`}
                        labelTxt='Price'
                    />
                    <Input
                        type='number'
                        name='stock'
                        placeholder='33'
                        customClasses={`${styles}`}
                        labelTxt='Stock'
                    />
                    <Input
                        type='text'
                        name='color'
                        placeholder='+6289898989'
                        customClasses={`${styles}`}
                        labelTxt='Color'
                    />
                    <Input
                        isSelect={true}
                        name='category'
                        customClasses={`${styles}`}
                        labelTxt='Category'
                    />
                    <Input
                        isTextArea={true}
                        type='text'
                        name='desc'
                        placeholder='Description'
                        customClasses={`${styles}`}
                        labelTxt='Description'
                        rows={"10"}
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