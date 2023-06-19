"use client"
import Image from 'next/image'
import ReactIcon from '../../../../public/react.svg';
import HtmlIcon from '../../../../public/html.svg';
import CSSIcon from '../../../../public/css.svg';

import { useEffect, useState, useRef } from 'react';

interface SkillList {
    name: string
}

interface NameIcon {
    name: string,
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
}


// duration = timePerItem * numberOfItems
const timePerItem = 2; // in seconds

export function SkillList({ name }: SkillList) {

    const [nameIconList, setNameIconList] = useState(getNameIconList(name));

    const cardElementArrayRef = useRef<HTMLDivElement[] | null[]>([]);

    useEffect(() => {

        const rotationTiming: KeyframeAnimationOptions = {
            duration: timePerItem * 2 * 1000 * nameIconList.length,
            iterations: Infinity,
            composite: 'add'
        }

        const shiftTiming: KeyframeAnimationOptions = {
            duration: timePerItem * 2 * 1000 * nameIconList.length,
            iterations: Infinity,
            composite: 'add'
        }

        const rotationKeyframes = [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' },
        ]

        const shiftKeyframes = [
            { transform: 'translateY(0%)' },
            { transform: 'translateY(50%)' },
        ]





        cardElementArrayRef.current.map((element, index) => {
            if (element) {
                const shiftAnimation = element.animate(shiftKeyframes, shiftTiming);
                const rotationAnimation = element.animate(rotationKeyframes, rotationTiming);

                shiftAnimation.currentTime = index * timePerItem * 1000;
                rotationAnimation.currentTime = index * timePerItem * 1000;
            }
        })


    }, [nameIconList])



    return (<div className='relative min-h-[18rem] '>
        {nameIconList.map((NameIcon: NameIcon, index: number) => {
            return (
                <div key={NameIcon.name}
                    ref={element => cardElementArrayRef.current[index] = element}
                    style={{ transformOrigin: 'center 200%' }}
                    className='w-32 h-48 flex flex-col justify-center items-center px-4
                border-solid border-black border-2 rounded-lg bg-white
                absolute right-1/2 translate-x-1/2 
                hover:bg-yellow-300
                '>

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
            { name: 'CSS', Icon: CSSIcon }
        ]
    } else if (name === 'Backend') {
        return []
    } else {
        return []
    }
}





