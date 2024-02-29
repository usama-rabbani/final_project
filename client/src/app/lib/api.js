
 import { api_endpoint } from '@/app/constants/page';
  import { GraphQLClient, gql } from "graphql-request";

 const graphQLClient = new GraphQLClient(api_endpoint);

export const getBlogs = async () => {
  const query = gql`
    query {
      blogs {
        title
        slug
        content
        des
        bannerimage {
          url
        }
      }
    }
  `;
  const data = await graphQLClient.request(query);
  return data.blogs;
};

export const getSingleBlog = async (slug) => {
  const query = gql`
    query getSingleBlog($slug: String!) {
      blog(slug: $slug) {
        title
        content
        des
        bannerimage {
          url
        }
      }
    }
  `;
  const variables = { slug };
  const data = await graphQLClient.request(query, variables);
  return data.blog;
};
