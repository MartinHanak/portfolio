interface Modal {
    message: string,
    hidden: boolean,
    className?: string
}

export function Modal({ message, hidden, className }: Modal) {
    return (
        <div className={`absolute top-0 left-0 w-full h-full z-10 flex flex-col items-center justify-center transition-all
        ${className && className} ${hidden ? 'opacity-0' : 'opacity-100'} pointer-events-none `}>

            <div className={`bg-green-500 text-white border-solid border-green-700 border-4 rounded-md
            px-4 py-2 font-bold
            transition-all ${hidden ? '-translate-y-full' : 'translate-y-0'}
            `}>
                {message}
            </div>

        </div>
    )
}