import { Link, useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { getActivity, deleteActivity } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function Activity() {
  const { token } = useAuth();
  const { id } = useParams();
  const [activity, setActivity] = useState();
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const tryDelete = async () => {
    setError(null);

    try {
      await deleteActivity(token, activity.id);
      navigate("/activities");
    } catch (e) {
      setError(e.message);
    }
  };

  const syncActivity = async () => {
    const data = await getActivity(id);
    setActivity(data);
  };

  useEffect(() => {
    syncActivity();
  }, []);

  return (
    <>
      <h1>{activity?.name}</h1>
      <p>by {activity?.creatorName}</p>
      <p>{activity?.description}</p>
      <button onClick={tryDelete}>Delete Activity</button>
      <Link to="/activities">Return to All Activities</Link>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
