import React, { JSX } from 'react';
import { Button, ButtonParams } from './button';

export type JustifyType = "justify-start" | "justify-end" | "justify-around" | "justify-between" | "justify-center" | "justify-baseline" | "justify-center-safe" | "justify-end-safe" |
    "justify-evenly" | "justify-items-center" | "justify-items-center-safe" | "justify-items-end" | "justify-items-end-safe" | "justify-items-normal" | "justify-items-start" |
    "justify-items-stretch" | "justify-normal" | "justify-self-auto" | "justify-self-center" | "justify-self-center-safe" | "justify-self-end" | "justify-self-end-safe" |
    "justify-self-start" | "justify-self-stretch" | "justify-start" | "justify-stretch" | "text-justify";

export type ButtonRowParams = {
    buttons: (ButtonParams | JSX.Element)[],
    justify?: JustifyType,
    gap?: string
};


export default function ButtonRow(params: ButtonRowParams) {
    const justify = params?.justify || "justify-around";
    const gap = params?.gap || "gap-8";

    return (
        <div className={`flex ${gap} ${justify}`}>
            {
                params.buttons.map((button, index) => {
                    if (React.isValidElement(button)) {
                        return React.cloneElement(button, { key: index });
                    } else {
                        return <Button key={index} {...(button as ButtonParams)} className='h-full' />;
                    }
                })
            }
        </div>
    )
}