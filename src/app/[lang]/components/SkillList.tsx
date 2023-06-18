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

    const [timingObject, setTimingObject] = useState<KeyframeEffectOptions | null>(null);
    const [keyframesObject, setKeyframesObject] = useState<Keyframe[] | null>(null);

    const cardElementArrayRef = useRef<HTMLDivElement[] | null[]>([]);

    useEffect(() => {

        const newTimingObject = {
            duration: timePerItem * 2 * 1000 * nameIconList.length,
            iterations: Infinity,
            easing: "ease-in-out",
        }

        const newKeyframes = [
            { transform: 'translateY(0%)', opacity: '1' },
            { transform: 'translateY(50%) rotate(0deg)', opacity: '1' },
            { transform: 'translateY(50%) rotate(45deg)', opacity: '1' },
            { transform: 'translateY(50%) rotate(46deg)', opacity: '0', animationTimingFunction: 'ease' },
            { transform: 'translateY(50%) rotate(90deg)', opacity: '0' },
            { transform: 'translateY(50%) rotate(180deg)', opacity: '0' },
            { transform: 'translateY(50%) rotate(270deg)', opacity: '0' },
            { transform: 'translateY(50%) rotate(315deg)', opacity: '0', display: 'none' },
            { transform: 'translateY(50%) rotate(360deg)', opacity: '1' },
            { transform: 'translateY(0%) rotate(360deg)', opacity: '1' },
        ]


        setTimingObject(newTimingObject);

        setKeyframesObject(newKeyframes)

        cardElementArrayRef.current.map((element) => {
            if (element) {
                element.animate(newKeyframes, newTimingObject)
            }
        })


    }, [nameIconList])



    return (<div className='relative min-h-[18rem] '>
        {nameIconList.map((NameIcon: NameIcon, index: number) => {
            return (
                <div key={NameIcon.name}
                    ref={element => cardElementArrayRef.current[index] = element}
                    style={{ transformOrigin: 'center 300%' }}
                    className='w-32 h-48 flex flex-col justify-center items-center px-4
                border-solid border-black border-2 rounded-lg bg-white
                absolute right-1/2 translate-x-1/2 
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





