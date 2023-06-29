"use client"
import ReactIcon from '../../../../../public/react.svg';
import ReduxIcon from '../../../../../public/redux.svg';

import HtmlIcon from '../../../../../public/html.svg';
import JSIcon from '../../../../../public/javascript.svg';
import typescriptIcon from '../../../../../public/typescript.svg';

import CSSIcon from '../../../../../public/css.svg';
import tailwindIcon from '../../../../../public/tailwind.svg';
import npmIcon from '../../../../../public/npm.svg';

import expressIcon from '../../../../../public/express.svg';
import gitIcon from '../../../../../public/git.svg';
import githubIcon from '../../../../../public/github.svg';
import jestIcon from '../../../../../public/jest.svg';
import mysqlIcon from '../../../../../public/mysql.svg';
import postgresIcon from '../../../../../public/postgresql.svg';

import prismaIcon from '../../../../../public/prisma.svg';
import sequelizeIcon from '../../../../../public/sequelize.svg';
import nextIcon from '../../../../../public/next.svg';
import nginxIcon from '../../../../../public/nginx.svg';
import nodeIcon from '../../../../../public/node.svg';
import pm2Icon from '../../../../../public/pm2.svg';
import vscodeIcon from '../../../../../public/VSCode.svg';


import { useLayoutEffect, useState, useRef } from 'react';
import { useCardAnimation } from '../../hooks/useCardAnimation';

interface SkillList {
    name: string,
    active: boolean
}

interface NameIcon {
    name: string,
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
}




export function SkillList({ name, active }: SkillList) {

    const [nameIconList, setNameIconList] = useState(getNameIconList(name));

    const cardElementArrayRef = useRef<HTMLDivElement[] | null[]>([]);

    const { play, pause } = useCardAnimation(cardElementArrayRef, nameIconList.length, active);

    useLayoutEffect(() => {
        if (active && play) {
            play()
        } else if (!active && pause) {
            pause()
        }
    }, [active])

    return (<div
        // parent has to have preserve-3d to be able to use translateZ as z index
        style={{ transformStyle: 'preserve-3d' }}
        className='relative min-h-[28rem] '>
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
                    className={`absolute w-32 h-48 flex flex-col justify-center items-center px-4 pb-4
                border-solid border-black border-2 rounded-lg bg-white
                origin-card-animation opacity-1 translate-y-[80%] transform
                hover:bg-gray-100  `}
                >

                    <h4 className='text-lg mb-2 mt-4'>{NameIcon.name}</h4>

                    <NameIcon.Icon className='max-h-48 max-w-32 w-full h-full' />

                </div>
            )
        })}
    </div>)
}



function getNameIconList(name: string): NameIcon[] {
    if (name === 'Frontend') {
        return [
            { name: 'React', Icon: ReactIcon },
            { name: 'HTML', Icon: HtmlIcon },
            { name: 'CSS', Icon: CSSIcon },
            { name: 'Redux', Icon: ReduxIcon },
            { name: 'Tailwind', Icon: tailwindIcon },
            { name: 'Next.js', Icon: nextIcon },
            { name: 'JavaScript', Icon: JSIcon },
            { name: 'TypeScript', Icon: typescriptIcon },
        ]
    } else if (name === 'Backend') {
        return [
            { name: 'Node', Icon: nodeIcon },
            { name: 'Express', Icon: expressIcon },
            { name: 'Prisma', Icon: prismaIcon },
            { name: 'MySQL', Icon: mysqlIcon },
            { name: 'Sequelize', Icon: sequelizeIcon },
            { name: 'Postgres', Icon: postgresIcon },
        ]
    } else {
        return [
            { name: 'npm', Icon: npmIcon },
            { name: 'git', Icon: gitIcon },
            { name: 'GitHub', Icon: githubIcon },

            { name: 'Jest', Icon: jestIcon },
            { name: 'VS Code', Icon: vscodeIcon },

            { name: 'Nginx', Icon: nginxIcon },
            { name: 'PM2', Icon: pm2Icon },

        ]
    }
}





