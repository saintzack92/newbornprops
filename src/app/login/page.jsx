import Link from "next/link"
import Input from "../adminpanel/ui/dashboard/input/input"

const style = `p-[30px] border-2 border-solid border-[#2e374a] w-[100%]`
const LoginPage = () => {
    return (
        <div className="w-[100%] h-[100vh] flex items-center justify-center">
            <form action="" className="bg-[var(--bgSoft)] p-[50px] rounded-[10px] w-[500px] h-[500px] flex flex-col justify-center gap-[30px] items-center relative z-0">
                <h1 className="relative z-10 font-[1000] text-[30px] mb-[-30px]">Login</h1>
                <Input
                    type={'text'}
                    placeholder={'username'}
                    customClasses={style}
                />
                <Input
                    type={'password'}
                    placeholder={'password'}
                    customClasses={style}
                />
                <Input
                    isButton={true}
                    name={"Login"}
                    customClasses={`${style}`}
                />
            </form>
        </div>
    )
}

export default LoginPage