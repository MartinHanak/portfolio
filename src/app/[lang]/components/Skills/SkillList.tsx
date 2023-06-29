"use client"
import ReactIcon from '../../../../../public/react.svg';
import HtmlIcon from '../../../../../public/html.svg';
import CSSIcon from '../../../../../public/css.svg';

import { useEffect, useState, useRef } from 'react';
import { useCardAnimation } from '../../hooks/useCardAnimation';

interface SkillList {
    name: string
}

interface NameIcon {
    name: string,
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
}




export function SkillList({ name }: SkillList) {

    const [active, setActive] = useState(false);

    const [nameIconList, setNameIconList] = useState(getNameIconList(name));

    const cardElementArrayRef = useRef<HTMLDivElement[] | null[]>([]);

    const { play, pause } = useCardAnimation(cardElementArrayRef, nameIconList.length, active);

    useEffect(() => {
        if (active && play) {
            play()
        } else if (!active && pause) {
            pause()
        }
    }, [active])

    return (<div
        onClick={() => setActive((prev) => !prev)}
        // parent has to have preserve-3d to be able to use translateZ as z index
        style={{ transformStyle: 'preserve-3d' }}
        className='relative min-h-[18rem] '>
        {nameIconList.map((NameIcon: NameIcon, index: number) => {
            let zIndex = 1
            if (index < nameIconList.length / 2) {
                zIndex = nameIconList.length + index
            } else {
                zIndex = nameIconList.length - (nameIconList.length - index)
            }

            return (



                <div key={NameIcon.name}
                    ref={element => cardElementArrayRef.current[index] = element}
                    style={{ transformStyle: 'preserve-3d', right: 'calc(50% - 4rem)' }}
                    className={`absolute w-32 h-48 flex flex-col justify-center items-center px-4
                border-solid border-black border-2 rounded-lg bg-white
                origin-card-animation opacity-1 translate-y-[80%] transform
                hover:bg-yellow-300  `}
                >

                    <h4 className='text-lg mb-2'>{NameIcon.name}</h4>

                    <NameIcon.Icon fill='black' className='max-h-48 max-w-32' />

                </div>
            )
        })}
    </div>)
}



function getNameIconList(name: string): NameIcon[] {
    if (name === 'Frontend') {
        return [
            { name: 'React', Icon: ReactIcon },
            { name: 'Html', Icon: HtmlIcon },
            { name: 'CSS', Icon: CSSIcon },
            { name: 'React2', Icon: ReactIcon },
            { name: 'React3', Icon: ReactIcon },
            { name: 'React4', Icon: ReactIcon },
        ]
    } else if (name === 'Backend') {
        return []
    } else {
        return []
    }
}





