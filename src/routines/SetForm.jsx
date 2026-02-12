import { useState, useEffect } from "react";
import { addSet } from "../api/routines";
import { getActivities } from "../api/activities";
import { useAuth } from "../auth/AuthContext";

export default function SetForm({ routineId, syncRoutine }) {
  const { token } = useAuth();
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);

  const populateActivities = async () => {
    const data = await getActivities();
    setActivities(data);
  };

  useEffect(() => {
    populateActivities();
  }, []);

  const tryAddSet = async (formData) => {
    setError(null);

    const activityId = formData.get("activity");
    const count = formData.get("count");

    try {
      await addSet(token, { activityId, count, routineId });
      syncRoutine();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h2>Add a set</h2>
      <form action={tryAddSet}>
        <label>
          Activity
          <select name="activity">
            {activities.map((activity) => (
              <option key={activity.id} value={activity.id}>
                {activity.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Count
          <input type="number" name="count" />
        </label>
        <button>Add set</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </>
  );
}
