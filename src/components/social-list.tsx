import { ButtonVarients } from "./button"
import SocialRow, { SocialParams } from "./social-row"

export type SocialListParams = { socials: SocialParams[], variant?: ButtonVarients }
export default function SocialList(params: SocialListParams) {
    return (
        <div className="flex gap-4">
            {params.socials.map((info, value) => (
                <SocialRow key={value} {...info} variant={params.variant || "outline"} />
            ))}
        </div>
    )
}