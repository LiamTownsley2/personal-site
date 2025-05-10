import { PostType } from "@/models/post";
import Image from "next/image";

export type ArticleImageParams = { post: PostType };
export default function ArticleImage(params: ArticleImageParams) {
    return (
        <div className="mt-8">
            <Image
                src={params.post.coverImage || "/placeholder.svg"}
                alt={params.post.title}
                width={800}
                height={400}
                className="rounded-lg object-cover"
            />
        </div>
    )
}