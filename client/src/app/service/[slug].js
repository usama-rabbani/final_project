'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { GetSingleSer } from "@/app/lib/api";

export default function Blogdetail({ params }) {
    const [blogDetail, setBlogDetail] = useState(null);

    const getservices = async () => {
        try {
            const fetchServices = await GetSingleSer(params.slug);
            console.log("Fetched Blog:", fetchedBlog);
            setBlogDetail(fetchServices);
        } catch (error) {
            console.error("Error fetching blog detail:", error);
        }
    };

    useEffect(() => {
        if (params.slug) {
            getservices();
        }
    }, [params.slug]);

    if (!blogDetail) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen">
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
                    {blogDetail.title} 
                </p>
                <img
                    alt="Office"
                    src={blogDetail.image.url} 
                    className="w-full object-cover"
                />
                <br />
                <p className="mb-4 text-lg text-gray-500">
                    {blogDetail.description} 
                </p>

            </div>
        </div>
    );
}