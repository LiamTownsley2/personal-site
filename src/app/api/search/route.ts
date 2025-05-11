import { searchContent } from "@/lib/db-service";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url!);
    const query = searchParams.get("q");

    if (!query) {
        return new Response(JSON.stringify({ message: "Missing query parameter 'q'" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }


    if (query.toLowerCase() == "home" || query.toLowerCase() == "index" || query == "/") {
        return new Response(null, {
            status: 418,
            headers: { Location: `/` },
        });
    }
    if (query.toLowerCase() == "projects" || query.toLowerCase() == "blog" || query.toLowerCase() == "contact") {
        return new Response(null, {
            status: 418,
            headers: { Location: `/${query.toLowerCase()}` },
        });
    }

    try {
        const results = await searchContent(query);
        return new Response(JSON.stringify(results), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
