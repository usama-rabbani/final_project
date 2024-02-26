'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { getSingleBlog } from "@/app/hygraph/page";

export default function Blogdetail({ params }) {
  const [blogDetail, setBlogDetail] = useState(null);

  const getBlogDetail = async () => {
    const blogDetail = await getSingleBlog(params.slug);
    setBlogDetail(blogDetail);
    return;
  };

  useEffect(() => {
    if (params?.slug) {
      getBlogDetail();
    }
  }, [params?.slug]);

  return (
    <>
      <div className="min-h-screen">
        {blogDetail && (
          <div className="max-w-[800px] mx-auto py-10">
            <div className="pb-4 ">
              <h1 className=" block text-center text-4xl font-bold">
                {blogDetail?.blogs[0]?.title}
              </h1>
            </div>
            <h1 className="text-left block my-4 text-lg">
              {blogDetail?.blogs[0]?.content}
            </h1>
            <img
              alt="Office"
              src={blogDetail?.blogs[0]?.bannerimage?.url}
              className="w-full h-96 object-cover"
            />
            <br />
            <div
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(blogDetail?.blogs[0]?.details?.raw),
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
