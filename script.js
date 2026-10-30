const repositoryList = document.querySelector("#repository-list");

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    repositoryList.replaceChildren();

    for (const repository of repositories) {
      const item = document.createElement("li");
      const heading = document.createElement("h2");
      const link = document.createElement("a");
      const description = document.createElement("p");
      const date = document.createElement("time");

      link.href = repository.url;
      link.textContent = repository.name;
      heading.append(link);

      description.className = "description";
      description.textContent = repository.description;

      date.dateTime = repository.starredAt;
      date.textContent = `Starred on ${repository.starredAt}`;

      item.append(heading, description, date);
      repositoryList.append(item);
    }
  } catch (error) {
    console.error("Failed to load starred repositories:", error);
    const message = document.createElement("li");
    message.className = "error";
    message.textContent = "Starred repositories could not be loaded.";
    repositoryList.replaceChildren(message);
  }
}

loadRepositories();
