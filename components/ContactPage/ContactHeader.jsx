import React from 'react'
import { BiEnvelope, BiMapAlt, BiPhoneCall } from 'react-icons/bi'

export default function ContactHeader() {
    return (
        <div className='flex flex-col w-full gap-3 px-2 mx-4 my-2 md:flex-row'>
            <iframe title="House Solution Egypt Location on map" aria-label="House Solution Egypt Location on map" width="90%" height="300" loading="lazy" allowfullscreen="" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.9715481383646!2d31.265416300000005!3d29.951496999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583807cabfbd7d%3A0x81e98f6ddff99809!2sHouse%20Point%20Egypt!5e0!3m2!1sar!2seg!4v1691790242095!5m2!1sar!2seg"></iframe>
            <div className='flex flex-col gap-4 p-2 text-lg md:text-xl'>
                <h1 className='text-2xl font-semibold md:text-3xl'>Contact Us</h1>
                <h2 className='flex items-center gap-2'>
                    <BiEnvelope /> info@housepointegypt.com
                </h2>
                <h3 className='flex items-center gap-2'>
                    <BiEnvelope /> hazem@housepointegypt.com
                </h3>
                <h3 className='flex items-center gap-2'>
                    <BiPhoneCall /> +201221409530
                </h3>
                <h3 className='flex items-center gap-2'>
                    <BiMapAlt /> 22 Road 9, Maadi Al Khabiri Ash Sharqeyah, Maadi, Egypt 11728
                </h3>
            </div>
        </div>
    )
}
