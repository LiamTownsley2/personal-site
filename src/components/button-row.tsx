import React, { JSX } from 'react';
import { Button, ButtonParams } from './button';

export type ButtonRowParams = {
    buttons: (ButtonParams | JSX.Element)[],
    justify?: "justify-start" | "justify-end" | "justify-around" | "justify-between",
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