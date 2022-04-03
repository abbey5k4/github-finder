import { IGitUsers } from "../interfaces/IGitUsers";
import PaginationComponent from "./pagination";
import "./resultsCard.css";

type ResultCardProps = {
  results: IGitUsers;
};

const ResultsCard = ({ results }: ResultCardProps) => {
  // console.log(results);
  return (
    <div className="team">
      <div className="team_member">
        <div className="team_img">
          <img src={results.avatar_url} alt="Team_image" />
        </div>
        <h3>{results.login}</h3>
        <div className="hideText">
          <p className="hiddenText1">{results.html_url}</p>
          <p className="hiddenText2">{results.score}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsCard;
