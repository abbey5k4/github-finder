import { IGitUsers } from "../../interfaces/IGitUsers";
import "./index.css";

type ResultCardProps = {
  results: IGitUsers;
};

const ResultsCard = ({ results }: ResultCardProps) => {
  return (
    <div className="profile">
      <div className="profile_member">
        <div className="profile_img mb-3">
          <img src={results.avatar_url} alt="profile_image" />
        </div>
        <div className="hideText">
          <h3 className="">{results.login}</h3>
          <p className="font-small">{results.html_url}</p>
          {/* <p className="">{results.html_url.substr(0, 25) + '...'}</p> */}
          <p className="font-small">{`${results.score}.0`}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
