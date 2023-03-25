import Logo from '../assets/Logo';

const AppHeader = () => {
    return (
        <header className="  h-[20vh] text-green-400 items-center flex-col flex justify-center">
            <h1 className=' text-3xl md:text-6xl font-semibold mb-2'>Don't Very, Be Happy!</h1>
            <div className='font-sans font-semibold flex items-end text-base md:text-xl'>
                <h3 className=''>Powered by&nbsp;</h3>
                <Logo className='' />
                <h3 className=''>&nbsp;and Chat GPT  </h3>
            </div>
        </header>
    )
}

export default AppHeader