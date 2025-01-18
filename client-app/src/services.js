const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

export const fetchRepositories = async (username, token) => {
  const query = `
      query($username: String!) {
        user(login: $username) {
          repositories(first: 10, orderBy: { field: CREATED_AT, direction: DESC }) {
            nodes {
              name
              description
              url
              stargazerCount
              forkCount
            }
            totalCount
          }
        }
      }
    `;

  const variables = { username };

  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await response.json();

  return result.data.user.repositories;
};

export const fetchStarredRepos = async (token) => {
  const query = `
      query {
        viewer {
          login
          starredRepositories(first: 10) {
            nodes {
              name
              owner {
                login
              }
              url
              description
              stargazerCount
              updatedAt
            }
          }
        }
      }
    `;
  const response = await fetch(GITHUB_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();

  return result.data.viewer.starredRepositories.nodes;
};
