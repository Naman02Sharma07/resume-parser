// Get the "Add Another Project" button
const addProjectButton = document.getElementById('add-project');
const projectsContainer = document.getElementById('projects-container');

// Event listener to add a new project form when the button is clicked
addProjectButton.addEventListener('click', () => {
  // Create a new project form div
  const newProjectDiv = document.createElement('div');
  newProjectDiv.classList.add('project');

  // Add input fields for title, description, and technologies
  newProjectDiv.innerHTML = `
    <label for="title">Title:</label>
    <input type="text" name="title" required>

    <label for="description">Description:</label>
    <textarea name="description" required></textarea>

    <label for="technologies">Technologies:</label>
    <input type="text" name="technologies" required>
  `;

  // Append the new form to the container
  projectsContainer.appendChild(newProjectDiv);
});
