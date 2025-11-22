import clientPromise from "../../../lib/mongodb";

export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body?.url || !body?.shorturl) {
            return Response.json(
                { success: false, error: true, message: "Missing fields" },
                { status: 400 }
            );
        }

        const client = await clientPromise;
        const db = client.db("tinylinks");
        const collection = db.collection("url");

        // Check if short URL already exists
        const existing = await collection.findOne({ shorturl: body.shorturl });
        if (existing) {
            return Response.json(
                { success: false, error: true, message: "Short URL already exists!" },
                { status: 409 }
            );
        }

        // Insert into DB
        await collection.insertOne({
            url: body.url,
            shorturl: body.shorturl,
            createdAt: new Date()
        });

        return Response.json(
            { success: true, error: false, message: "URL generated successfully" },
            { status: 201 }
        );

    } catch (error) {
        console.error("POST /api error:", error);
        return Response.json(
            { success: false, error: true, message: "Internal server error" },
            { status: 500 }
        );
    }
}
