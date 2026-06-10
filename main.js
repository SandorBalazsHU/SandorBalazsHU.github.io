const TOP_PROJECT_LIMIT = 3;
const FALLBACK_RANK = 9999;

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
    .sort((a, b) => getProjectRank(a) - getProjectRank(b));
}

function getProjectRank(project) {
  const rank = Number(project.rank);
  return Number.isFinite(rank) ? rank : FALLBACK_RANK;
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

  moreDetails.hidden = hiddenProjects.length === 0;

  if (summaryCount) {
    summaryCount.textContent =
      hiddenProjects.length > 0 ? `${hiddenProjects.length} more` : "";
  }
}

function createProjectCard(project, displayIndex) {
  const template = document.querySelector("#project-card-template");

  if (!template) {
    throw new Error("Project card template not found.");
  }

  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector(".project-row");

  if (!card) {
    throw new Error("Project row element not found in template.");
  }

  setText(card, "[data-project-index]", displayIndex);
  setText(card, "[data-project-name]", project.name);
  setText(card, "[data-project-description]", project.description);
  setText(card, "[data-project-status]", project.status);
  setText(card, "[data-project-year]", project.year);
  setText(card, "[data-project-type]", project.type);

  setupProjectImage(card, project);
  setupProjectLink(card, project);
  setupProjectTags(card, project.tags);
  setupProjectHighlights(card, project);
  setupProjectVisibility(card, project);

  return fragment;
}

function setText(root, selector, value) {
  const element = root.querySelector(selector);

  if (!element) {
    return;
  }

  const text = value === undefined || value === null ? "" : String(value).trim();

  if (text === "") {
    element.hidden = true;
    element.textContent = "";
    return;
  }

  element.hidden = false;
  element.textContent = text;
}

function setupProjectImage(card, project) {
  const image = card.querySelector("[data-project-image]");
  const preview = card.querySelector(".project-preview");

  if (!image || !preview) {
    return;
  }

  if (!project.image) {
    showNoImagePlaceholder(preview);
    return;
  }

  image.src = String(project.image).trim();
  image.alt = project.name ? `${project.name} preview` : "Project preview";

  image.addEventListener("error", () => {
    showNoImagePlaceholder(preview);
  });
}

function showNoImagePlaceholder(preview) {
  preview.classList.add("no-image");
  preview.replaceChildren();

  const placeholder = document.createElement("span");
  placeholder.textContent = "No image";

  preview.appendChild(placeholder);
}

function setupProjectLink(card, project) {
  const link = card.querySelector("[data-project-link]");
  const privateIndicator = card.querySelector("[data-project-private]");
  const noneIndicator = card.querySelector("[data-project-none]");

  if (!link || !privateIndicator || !noneIndicator) {
    return;
  }

  hideProjectActionElements(link, privateIndicator, noneIndicator);

  if (isNonPublicProject(project)) {
    privateIndicator.hidden = false;
    setOptionalTitle(privateIndicator, project.nonPublicReason);
    return;
  }

  if (hasGithubLink(project)) {
    link.hidden = false;
    link.href = project.github.trim();
    return;
  }

  noneIndicator.hidden = false;
}

function hideProjectActionElements(link, privateIndicator, noneIndicator) {
  link.hidden = true;
  link.removeAttribute("href");

  privateIndicator.hidden = true;
  privateIndicator.removeAttribute("title");

  noneIndicator.hidden = true;
  noneIndicator.removeAttribute("title");
}

function isNonPublicProject(project) {
  return project.public === false;
}

function hasGithubLink(project) {
  return typeof project.github === "string" && project.github.trim() !== "";
}

function setupProjectTags(card, tags) {
  const tagContainer = card.querySelector("[data-project-tags]");

  if (!tagContainer) {
    return;
  }

  tagContainer.replaceChildren();

  const normalizedTags = Array.isArray(tags)
    ? tags
        .map((tag) => String(tag).trim())
        .filter((tag) => tag !== "")
    : [];

  if (normalizedTags.length === 0) {
    tagContainer.hidden = true;
    return;
  }

  tagContainer.hidden = false;

  normalizedTags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.className = "project-tag";
    tagElement.textContent = tag;
    tagContainer.appendChild(tagElement);
  });
}

function setupProjectHighlights(card, project) {
  const highlightsContainer = card.querySelector("[data-project-highlights]");

  if (!highlightsContainer) {
    return;
  }

  highlightsContainer.replaceChildren();

  const highlights = getProjectHighlights(project);

  if (highlights.length === 0) {
    highlightsContainer.hidden = true;
    return;
  }

  highlightsContainer.hidden = false;

  highlights.forEach((highlight) => {
    highlightsContainer.appendChild(createProjectHighlight(highlight));
  });
}

function getProjectHighlights(project) {
  return [
    {
      key: "award",
      icon: "🏆",
      label: "Award",
      text: project.award
    },
    {
      key: "conference",
      icon: "🎤",
      label: "Conference",
      text: project.conference
    },
    {
      key: "grade",
      icon: "🎓",
      label: "Grade",
      text: project.grade
    }
  ]
    .map((highlight) => ({
      ...highlight,
      text: typeof highlight.text === "string" ? highlight.text.trim() : ""
    }))
    .filter((highlight) => highlight.text !== "");
}

function createProjectHighlight(highlight) {
  const item = document.createElement("div");
  item.className = `project-highlight project-highlight-${highlight.key}`;

  const icon = document.createElement("span");
  icon.className = "project-highlight-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = highlight.icon;

  const text = document.createElement("span");
  text.className = "project-highlight-text";

  const label = document.createElement("strong");
  label.textContent = `${highlight.label}: `;

  const value = document.createElement("span");
  value.textContent = highlight.text;

  text.appendChild(label);
  text.appendChild(value);

  item.appendChild(icon);
  item.appendChild(text);

  return item;
}

function setupProjectVisibility(card, project) {
  const visibility = card.querySelector("[data-project-visibility]");

  if (!visibility) {
    return;
  }

  if (!isNonPublicProject(project)) {
    visibility.hidden = true;
    visibility.textContent = "";
    visibility.removeAttribute("title");
    return;
  }

  visibility.hidden = false;
  visibility.textContent = "Non-public";
  setOptionalTitle(visibility, project.nonPublicReason);
}

function setOptionalTitle(element, title) {
  if (typeof title === "string" && title.trim() !== "") {
    element.title = title.trim();
  } else {
    element.removeAttribute("title");
  }
}

function createEmptyState() {
  const emptyState = document.createElement("div");

  emptyState.className = "empty-state";
  emptyState.textContent = "No projects added yet.";

  return emptyState;
}