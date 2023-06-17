import { SocialIcon } from 'react-social-icons';

export function ContactInfo() {

    return (
        <div className="text-white pl-8 md:order-1">
            <h3 className='font-bold text-4xl mb-4'>Martin Hanák</h3>
            <h4 className=' text-lg mb-20'>Web Developer Enthusiast</h4>


            <a className='text-2xl ' href="mailto:martinhanak97@gmail.com">martinhanak97@gmail.com</a>


            <div className='flex mt-8'>
                <SocialIcon bgColor='transparent' target='_blank' fgColor='white' style={{ height: '4rem', width: '4rem' }} url="https://github.com/MartinHanak" />
                <SocialIcon bgColor='transparent' fgColor='white' style={{ height: '4rem', width: '4rem' }} url="mailto:martinhanak97@gmail.com" />
            </div>
        </div>
    )
}