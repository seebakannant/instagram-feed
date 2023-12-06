import React, { useEffect, useState } from "react";

const API_URL = "http://local.m246p3/graphql";
const MEDIA_BASE_URL = "http://local.m246p3/media/instagram/";

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
                        <img width={300} height={300} src={MEDIA_BASE_URL + post.media_url} alt="instagram post" ></img>
                    </a>
                </div>
            );
        });
    }

    function getInstagramFeedData(setInstagramFeedData) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query {
                    instagramfeed {
                        entity_id
                        insta_post_id
                        media_type
                        media_url
                        insta_post_url
                        created_at
                        insta_updated_at
                    }
                }`
            })
        }

        fetch(API_URL, options).then(
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
