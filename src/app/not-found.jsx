import Link from 'next/link'
import ButtonPrimary from "../app/application/components/misc/ButtonPrimary";

export default function Foundnot() {
  return <>
   <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
    <div className="flex grow items-center px-6 xl:px-10">
      <div className="mx-auto text-center">
        <h1 class="mb-4 text-6xl font-semibold text-orange-500">404</h1>
        <p class="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>
        <div class="animate-bounce">
          <svg class="mx-auto h-16 w-16 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
          </svg>
        </div>
        <p class="mt-4 mb-3 text-gray-600">Let's get you back</p>
        <Link className='py-3 lg:py-2 px-12 lg:px-8 text-white font-semibold rounded-lg bg-orange-500 hover:shadow-orange-400 shadow-2xl transition-all outline-none' href="/">
          Go back home
        </Link>
      </div>
    </div>
    </div>
  </>
}