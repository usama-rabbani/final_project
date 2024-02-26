import React from 'react'
import { api_endpoint } from '../constants/page';
import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(api_endpoint);
export const getBlogs = async () => {

    const query = gql`
    query MyQuery {
        blogs {
          content
          slug
          title
          details{
            raw
          }
          bannerimage {
            url
          }
        }
      }`
        const response = await graphQLClient.request(query);
        return response;
 
}

export const getSingleBlog = async (slug) => {
    const query = gql`
      query getSingleBlog($slug: String!) {
        blogs(where: { slug: $slug }) {
          title
          content
          details {
           raw
          }
          bannerimage {
            url
          }
        }
      }
    `;
  
    const slugName = {
      slug,
    };
  
    const response = await graphQLClient.request(query, slugName);
    return response;
};



