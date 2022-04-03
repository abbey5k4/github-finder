import { IGitUsers } from "../../interfaces/IGitUsers";
import "./index.css";

type ResultCardProps = {
  results: IGitUsers;
};

const ResultsCard = ({ results }: ResultCardProps) => {
  // console.log(results);
  return (
    <div className="team">
      <div className="team_member">
        <div className="team_img mb-3">
          <img src={results.avatar_url} alt="Team_image" />
        </div>
        <div className="hideText">
          <h3>{results.login}</h3>
          <p>{results.html_url}</p>
          <p>{results.score}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
