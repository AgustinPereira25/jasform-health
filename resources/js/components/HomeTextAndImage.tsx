
import React from 'react'

import { JASFormLogo } from './Logo'
"use client";
import { TypewriterEffect } from "@/ui";

const HomeTextAndImage: React.FC = () => {
    const words = [
        {
            text: "Create",
            className: "text-white text-left font-normal",
        },
        {
            text: "awesome",
            className: "text-white text-left font-normal",
        },
        {
            text: "forms",
            className: "text-white text-left font-normal",
        },
        {
            text: "easily,",
            className: "text-white text-left font-normal",
        },
        {
            text: "but",
            className: "text-white text-left font-bold",
        },
        {
            text: "HIPAA",
            className: "text-white text-left font-bold",
        },
        {
            text: "Compliant!",
            className: "text-white text-left font-bold",
        },
    ];

    return (
        <div className="p-6 text-center lg:mr-[10%] justify-center justify-items-center">
            <div className="flex justify-center justify-items-center"
            ><JASFormLogo className="h-32 w-auto justify-center justify-items-center" />
            </div>
            <div className="flex flex-col justify-start justify-items-start items-start w-[250px] lg:w-[460px] h-[150px] mt-5 text-left text-5xl font-light tracking-tight text-white leading-[70px]">
                <TypewriterEffect words={words} />
            </div>
        </div>
    )
}

export default HomeTextAndImage
