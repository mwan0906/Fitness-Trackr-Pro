import { Link, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getRoutine, deleteRoutine, deleteSet } from "../api/routines";
import { useAuth } from "../auth/AuthContext";
import SetForm from "./SetForm";

export default function Routine() {
  const { token } = useAuth();
  const { id } = useParams();
  const [routine, setRoutine] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const tryDeleteRoutine = async () => {
    setError(null);
    try {
      await deleteRoutine(token, routine.id);
      navigate("/routines");
    } catch (e) {
      setError(e.message);
    }
  };

  const tryDeleteSet = async (id) => {
    setError(null);
    try {
      await deleteSet(token, id);
      syncRoutine();
    } catch (e) {
      setError(e.message);
    }
  };

  const syncRoutine = async () => {
    const data = await getRoutine(id);
    setRoutine(data);
  };

  useEffect(() => {
    syncRoutine();
  }, []);

  return (
    <>
      <h1>{routine.name}</h1>
      <p>by {routine.creatorName}</p>
      <p>{routine.goal}</p>
      {token && <button onClick={tryDeleteRoutine}>Delete Routine</button>}
      <h2>Sets</h2>
      <ul>
        {routine.sets?.map((set) => (
          <li key={set.id}>
            {set.name} × {set.count}
            {token && (
              <button onClick={() => tryDeleteSet(set.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
      {token && <SetForm routineId={routine.id} syncRoutine={syncRoutine} />}
      <Link to="/routines">Return to All Routines</Link>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
