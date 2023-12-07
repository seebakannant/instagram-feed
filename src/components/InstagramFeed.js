import React, { useEffect, useState } from "react";
import { query } from 'gql-query-builder';

export default function InstagramFeed() {
    const [instagramFeedData, setInstagramFeedData] = useState({});

    useEffect(() => {
        getInstagramFeedData(setInstagramFeedData);
    }, [setInstagramFeedData]);

    let gallery = "";
    if (instagramFeedData.hasOwnProperty("data")) {
        const posts = instagramFeedData.data.instagramfeed;
        gallery = posts.map((post) => {
            return (
                <div key={post.insta_post_id}>
                    <a href={post.insta_post_url}  >
                        <img width={300} height={300} src={process.env.REACT_APP_MEDIA_BASE_URL + post.media_url} alt="instagram post" ></img>
                    </a>
                </div>
            );
        });
    }

    function getInstagramFeedData(setInstagramFeedData) {
        const graphqlQuery = query({
            operation: "instagramfeed",
            fields: [
                "entity_id",
                "insta_post_id",
                "media_type",
                "media_url",
                "insta_post_url",
                "created_at",
                "insta_updated_at"
            ]
        });

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(graphqlQuery)
        }

        fetch(process.env.REACT_APP_API_URL, options).then(
            result => result.json()
        ).then(
            response => setInstagramFeedData(response)
        ).catch(error => console.error(error));
    }

    return (
        < div className="flex-container">
            {gallery}
        </div>
    );
}
