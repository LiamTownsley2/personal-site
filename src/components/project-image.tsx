import Image from "next/image";

export type ProjectImageParams = { src: string, alt: string };
export default function ProjectImage(params: ProjectImageParams) {
    return (
        <div>
            <Image
                src={params.src || "/placeholder.svg"}
                alt={params.alt}
                width={600}
                height={400}
                className="rounded-lg object-cover"
            />
        </div>
    )
}