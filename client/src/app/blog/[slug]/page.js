'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { getSingleBlog } from "@/app/blog/page";
import Contact_Us from "@/app/contact/page";

export default function Blogdetail({ params }) {
    const [blogDetail, setBlogDetail] = useState(null);

    const getBlogDetail = async () => {
        try {
            const fetchedBlog = await getSingleBlog(params.slug);
           
            setBlogDetail(fetchedBlog);
        } catch (error) {
            console.error("Error fetching blog detail:", error);
        }
    };

    useEffect(() => {
        if (params.slug) {
            getBlogDetail();
        }
    }, [params.slug]);

    if (!blogDetail) {
        return <div>Loading...</div>;
    }

    return (
        <section className="container px-4 mx-auto py-8">
            <div className="max-w-[800px] mx-auto py-10">
                <div className="pb-4">
                    <Link
                        href={`/`}
                        className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-green-600"
                    >
                        <span
                            aria-hidden="true"
                            className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                        >
                            &larr;
                        </span>
                        Go back
                    </Link>
                </div>

                <p className="mb-4 text-lg text-gray-500">
                    {blogDetail.content} 
                </p>
                <img
                    alt="Office"
                    src={blogDetail.bannerimage.url} 
                    className="w-full object-cover"
                />
                <br />
                <p className="mb-4 text-lg text-gray-500">
                    {blogDetail.des} 
                </p>

            </div>
            <Contact_Us/>
        </section>
    );
}
