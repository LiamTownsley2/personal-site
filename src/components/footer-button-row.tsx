import ButtonRow, { ButtonRowParams } from "./button-row";

export default function FooterButtonRow(params: ButtonRowParams) {
    return (
        <div className="mx-auto mt-12 -mb-4">
            <ButtonRow buttons={params.buttons} justify="justify-center" />
        </div>
    )
}