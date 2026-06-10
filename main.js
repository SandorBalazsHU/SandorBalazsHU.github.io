const TOP_PROJECT_LIMIT = 5;

document.addEventListener("DOMContentLoaded", () => {
  renderAllProjectSections();
});

function renderAllProjectSections() {
  const sections = document.querySelectorAll(".project-section[data-category]");

  sections.forEach((section) => {
    const category = section.dataset.category;
    const projects = getProjectsForCategory(category);

    renderProjectSection(section, projects);
  });
}

function getProjectsForCategory(category) {
  return PROJECTS
    .filter((project) => project.category === category)
    .sort((a, b) => {
      const rankA = Number.isFinite(a.rank) ? a.rank : 9999;
      const rankB = Number.isFinite(b.rank) ? b.rank : 9999;

      return rankA - rankB;
    });
}

function renderProjectSection(section, projects) {
  const mainList = section.querySelector('[data-project-list="main"]');
  const moreList = section.querySelector('[data-project-list="more"]');
  const moreDetails = section.querySelector(".more-projects");
  const summaryCount = section.querySelector("[data-summary-count]");

  if (!mainList || !moreList || !moreDetails) {
    return;
  }

  mainList.replaceChildren();
  moreList.replaceChildren();

  if (projects.length === 0) {
    mainList.appendChild(createEmptyState());
    moreDetails.hidden = true;
    return;
  }

  const visibleProjects = projects.slice(0, TOP_PROJECT_LIMIT);
  const hiddenProjects = projects.slice(TOP_PROJECT_LIMIT);

  visibleProjects.forEach((project, index) => {
    mainList.appendChild(createProjectCard(project, index + 1));
  });

  hiddenProjects.forEach((project, index) => {
    moreList.appendChild(createProjectCard(project, TOP_PROJECT_LIMIT + index + 1));
  });

  if (hiddenProjects.length === 0) {
    moreDetails.hidden = true;
  } else {
    moreDetails.hidden = false;

    if (summaryCount) {
      summaryCount.textContent = `${hiddenProjects.length} more`;
    }
  }
}

function createProjectCard(project, displayIndex) {
  const template = document.querySelector("#project-card-template");

  if (!template) {
    throw new Error("Project card template not found.");
  }

  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".project-row");

  setText(card, "[data-project-index]", String(displayIndex));
  setText(card, "[data-project-name]", project.name);
  setText(card, "[data-project-description]", project.description);
  setText(card, "[data-project-status]", project.status);
  setText(card, "[data-project-year]", project.year);
  setText(card, "[data-project-type]", project.type);

  setupProjectImage(card, project);
  setupProjectLink(card, project);
  setupProjectTags(card, project.tags);

  return fragment;
}

function setText(root, selector, value) {
  const element = root.querySelector(selector);

  if (!element) {
    return;
  }

  if (value === undefined || value === null || value === "") {
    element.hidden = true;
    element.textContent = "";
    return;
  }

  element.hidden = false;
  element.textContent = value;
}

function setupProjectImage(card, project) {
  const image = card.querySelector("[data-project-image]");
  const preview = card.querySelector(".project-preview");

  if (!image || !preview) {
    return;
  }

  if (!project.image) {
    preview.classList.add("no-image");
    preview.innerHTML = "<span>No image</span>";
    return;
  }

  image.src = project.image;
  image.alt = `${project.name} preview`;

  image.addEventListener("error", () => {
    preview.classList.add("no-image");
    preview.innerHTML = "<span>No image</span>";
  });
}

function setupProjectLink(card, project) {
  const link = card.querySelector("[data-project-link]");

  if (!link) {
    return;
  }

  if (!project.github) {
    link.hidden = true;
    link.removeAttribute("href");
    return;
  }

  link.hidden = false;
  link.href = project.github;
}

function setupProjectTags(card, tags) {
  const tagContainer = card.querySelector("[data-project-tags]");

  if (!tagContainer) {
    return;
  }

  tagContainer.replaceChildren();

  if (!Array.isArray(tags) || tags.length === 0) {
    tagContainer.hidden = true;
    return;
  }

  tagContainer.hidden = false;

  tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "project-tag";
    tagElement.textContent = tag;
    tagContainer.appendChild(tagElement);
  });
}

function createEmptyState() {
  const emptyState = document.createElement("div");

  emptyState.className = "empty-state";
  emptyState.textContent = "No projects added yet.";

  return emptyState;
}