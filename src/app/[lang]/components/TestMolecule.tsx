export function TestMolecule() {
    return (
        <div style={{
            transform: 'rotateY(45deg)',
            transformStyle: 'preserve-3d'
        }}
            className="relative h-64 " >
            <div style={{
                transform: 'rotateY(-45deg)'
            }}
                className="bg-gradient-to-bl from-red-400 to-red-800 at  w-48 h-48 absolute left-0 top-16 rounded-full z-10">

            </div>
            <div className="bg-yellow-500 w-32 h-32 absolute left-16 top-0 rounded-full ">

            </div>
            <div className="bg-green-500 w-32 h-32 absolute left-16 top-32 rounded-full ">

            </div>
        </div>
    )
}