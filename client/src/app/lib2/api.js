import React from 'react'
import { api_endpoint } from '../constants/page';
import { GraphQLClient, gql } from "graphql-request";

const graphQLClient = new GraphQLClient(api_endpoint);
export const GetSer = async () => {

  const query = gql`
  query MyQuery {
    services {
      color {
        hex
      }
      slug
      title
      image {
        url
      }
      description
    }
  }`
  const response = await graphQLClient.request(query);
  return response;

}

export const GetSingleSer = async (slug) => {
  const query = gql`
    query GetSingleSer($slug: String!) {
      service(where: { slug: $slug }) {
        slug
      title
      description
      image {
        url
      }
      color {
        hex
      }
      }
    }
  `;

  const variables = {
    slug,
  };

  const response = await graphQLClient.request(query, variables);
  return response.service; // Access the correct field
};




