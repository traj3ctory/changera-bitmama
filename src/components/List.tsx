import { AiOutlineStar } from "react-icons/ai";
import { GoRepoForked } from "react-icons/go";
/**
 * @author traj3ctory
 * @function @List
 **/

const List = (props: any) => {
  const { repos } = props;
  return (
    <div>
      <ol className="list-group list-group-flush">
        {repos.length > 0 ? (
          repos.map((repo: any) => {
            return (
              <li className="list-group-item d-flex justify-content-between align-items-start mb-3">
                <div className="ms-2 me-auto">
                  <h4 className="text-primary fw-bolder">
                    {repo.name}&ensp;{repo.private}
                  </h4>
                  <p>{repo.description}</p>
                  <div className="">
                    {repo.language && (
                      <small>
                        <span className="dot"></span>
                        {repo.language}
                      </small>
                    )}
                    {repo.stargazers_count > 0 && 
                      <small className="mx-3">
                        <AiOutlineStar />
                        &nbsp;{repo.stargazers_count}
                      </small>
                    }
                    {repo.fork === true &&
                      <small className="mx-3">
                        <GoRepoForked />
                        &nbsp;{repo.forks_count}
                      </small>
                    }
                  </div>
                </div>
                <div className="btn-group" role="group">
                  <button
                    id="btnGroupDrop1"
                    type="button"
                    className="btn btn-light shadow-sm px-4 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <AiOutlineStar />
                    &nbsp;Star
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <li>Dropdown link</li>
                    <li>Dropdown link</li>
                  </ul>
                </div>
              </li>
            );
          })
        ) : (
          <div>No Repos</div>
        )}
      </ol>
    </div>
  );
};

export default List;
