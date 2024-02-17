import React from 'react'
import styles from '../../../ui/dashboard/users/addUser/singleUser/singleUser.module.css'
import Input from '../../../ui/dashboard/input/input'
import img from '../../../../../../public/7.jpg'
import Image from 'next/image'

const SingleUserPage = () => {
    return (
        <div className={`${styles.container} flex gap-[50px]`}>
            <div className={`${styles.infoContainer} flex-[1]`}>
                <div className={`${styles.imgContainer} height-[300px] `}>
                    <Image src={img} alt='' width={50} height={50}  />
                </div>
                John Doe
            </div>
            <div className={`${styles.formContainer}`}>
                <Input
                    type='text'
                    name='username'
                    placeholder='John Doe'
                    customClasses={`${styles}`}
                    labelTxt='Username'
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
                <label >is Admin?</label>
                <select name='isAdmin' id='isAdmin'>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
                
                <label >is Active?</label>
                <select name='isActive' id='isActive'>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>


            </div>
        </div>
    )
}

export default SingleUserPage