
interface Container {
    children: React.ReactNode
}

export function BigContainer({ children }: Container) {
    return (
        <div className="w-full max-w-screen-xl mt-0 mb-0 mx-auto ">
            {children}
        </div>
    )
}