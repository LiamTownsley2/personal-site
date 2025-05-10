import ButtonRow, { ButtonRowParams } from "./button-row";

export default function FooterButtonRow(params: ButtonRowParams) {
    return (
        <div className="w-1/4 mx-auto mt-12">
            <ButtonRow buttons={params.buttons} />
        </div>
    )
}