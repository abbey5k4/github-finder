import { IGitUsers } from "../../interfaces/IGitUsers";
import Spinner from "react-bootstrap/Spinner";
import ResultsCard from "../resultsCard";

interface ResultListProps {
  searchResults: IGitUsers[] | [];
  loading: boolean;
  error?: string;
}

const ResultsList = ({ searchResults, loading, error }: ResultListProps) => {
  return (
    <div>
      {loading ? (
        <div>
          <Spinner animation="border" role="status" className="text-center">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      ) : (
        <div className="row">
          {searchResults.map((results, id) => {
            return (
              <div className="col-xs-3 col-sm-3 col-md-4 col-lg-3 col-xl-3 mb-3">
                <div key={id}>
                  <ResultsCard results={results} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResultsList;
