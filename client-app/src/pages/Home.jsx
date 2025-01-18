import { useEffect, useState } from "react";
import { fetchRepositories, fetchStarredRepos } from "../services";

const titleValues = [
  { title: "My GitHub Repositories", type: 0 },
  { title: "Starrer Repositories", type: 1 },
];

function Home({ user }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repoSelected, setRepoSelected] = useState(titleValues[0]);

  const fetchMyRepos = async () => {
    try {
      const repositories = await fetchRepositories(
        user.username,
        user.accessToken
      );
      setRepos(repositories.nodes);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch repositories");
      setLoading(false);
    }
  };

  const fetchMyStarredRepos = async () => {
    try {
      const repositories = await fetchStarredRepos(user.accessToken);
      console.log(repositories);
      setRepos(repositories);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch repositories");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRepos();
  }, []);

  useEffect(() => {
    console.log(repos);
  }, [repos]);

  const viewStarredRepos = () => {
    fetchMyStarredRepos();
    setRepoSelected(titleValues[1]);
  };

  const viewMyRepos = () => {
    fetchMyRepos();
    setRepoSelected(titleValues[0]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <h2>Hi {user.username}!</h2>
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2>Hi {user.username}!</h2>
      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h2>{repoSelected.title}</h2>
          <div>
            <button
              className="btn btn-primary me-2"
              onClick={viewStarredRepos}
              disabled={repoSelected.type === 1}
            >
              Favorites
            </button>
            <button
              className="btn btn-secondary"
              onClick={viewMyRepos}
              disabled={repoSelected.type === 0}
            >
              My repositories
            </button>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.name}>
                <td>{repo.name}</td>
                <td>{repo.description || "No description available"}</td>
                <td>{repo.stargazerCount}</td>
                <td>{repo.forkCount}</td>
                <td>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
