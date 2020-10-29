import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProjectPage() {
  const [projectData, setProjectData] = useState({ projects: [], pledges: [] });
  const { id } = useParams();

  useEffect(() => {
    const token = window.localStorage.getItem("token")

    fetch(`${process.env.REACT_APP_API_URL}projects/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    })

      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
      });
  }, [id]);


  // Create a new const data object from our response that is converting it manually to an object
  // Project response
  const formattedProjectRes = Object.values(projectData)[0]

  // Project sum
  const formattedProjectSum = Object.values(projectData)[1]

  return (
    <div>
      <h2>{formattedProjectRes.title}</h2>
      <h3>Created at: {formattedProjectRes.date_created}</h3>
      <h3>Project Type: {formattedProjectRes.category}</h3>
      <h3>Goal: {formattedProjectRes.goal}</h3>
      <h3>{`Status: ${formattedProjectRes.is_open}`}</h3>
      <p>{formattedProjectRes.description}</p>
      <h3>Goal: {formattedProjectRes.owner}</h3>
      <h3>Pledges:</h3>
      {/* Because we are still waiting for the response to come back we need to check that the formattedProjectRes returns and it has pledges before doing a map on it */}
      {(formattedProjectRes && formattedProjectRes.pledges) ?
        <ul>
          {formattedProjectRes.pledges.map((pledgeData, key) => {
            return (
              <li key={key}>
                ${pledgeData.amount} from {pledgeData.supporter_id}
              </li>
            );
          })}
        </ul> : null}
    </div>

  );
}

export default ProjectPage;
