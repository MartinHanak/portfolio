interface About {
    id: string
}

export function About({ id }: About) {
    return (
        <div id={id}>
            About me here...
        </div>
    )
}