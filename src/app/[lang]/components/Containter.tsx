
interface Container {
    children: React.ReactNode
}

export function Container({ children }: Container) {
    return (
        <div className="w-full max-w-screen-lg mt-0 mb-0 mx-auto px-8 md:px-16">
            {children}
        </div>
    )
}