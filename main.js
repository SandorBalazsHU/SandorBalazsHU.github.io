const TOP_PROJECT_LIMIT = 3;

document.addEventListener("DOMContentLoaded", () => {
  renderAllProjectSections();
});

function getProjectsForCategory(category) {
  return PROJECTS
    .filter((project) => project.category === category)
    .sort((a, b) => {
      const rankA = Number.isFinite(a.rank) ? a.rank : 9999;
      const rankB = Number.isFinite(b.rank) ? b.rank : 9999;

      return rankA - rankB;
    });
}

function renderAllProjectSections() {
  const sections = document.querySelectorAll(".project-section[data-category]");

  sections.forEach((section) => {
    const category = section.dataset.category;
    const projects = getProjectsForCategory(category);

    renderProjectSection(section, projects);
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
  setupProjectHighlights(card, project);
  setupProjectVisibility(card, project);

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
  const privateIndicator = card.querySelector("[data-project-private]");

  if (!link || !privateIndicator) {
    return;
  }

  if (hasPublicGithubLink(project)) {
    link.hidden = false;
    link.href = project.github.trim();

    privateIndicator.hidden = true;
    privateIndicator.removeAttribute("title");
    return;
  }

  link.hidden = true;
  link.removeAttribute("href");

  privateIndicator.hidden = false;

  if (project.nonPublicReason) {
    privateIndicator.title = project.nonPublicReason;
  } else {
    privateIndicator.removeAttribute("title");
  }
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

function setupProjectHighlights(card, project) {
  const highlightsContainer = card.querySelector("[data-project-highlights]");

  if (!highlightsContainer) {
    return;
  }

  highlightsContainer.replaceChildren();

  const highlights = [
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
  ].filter((highlight) => {
    return typeof highlight.text === "string" && highlight.text.trim() !== "";
  });

  if (highlights.length === 0) {
    highlightsContainer.hidden = true;
    return;
  }

  highlightsContainer.hidden = false;

  highlights.forEach((highlight) => {
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

    highlightsContainer.appendChild(item);
  });
}

function setupProjectVisibility(card, project) {
  const visibility = card.querySelector("[data-project-visibility]");

  if (!visibility) {
    return;
  }

  if (hasPublicGithubLink(project)) {
    visibility.hidden = true;
    visibility.textContent = "";
    visibility.removeAttribute("title");
    return;
  }

  visibility.hidden = false;
  visibility.textContent = "Non-public";

  if (project.nonPublicReason) {
    visibility.title = project.nonPublicReason;
  } else {
    visibility.removeAttribute("title");
  }
}

function hasPublicGithubLink(project) {
  const isPublic = project.public !== false;
  const hasGithubLink =
    typeof project.github === "string" && project.github.trim() !== "";

  return isPublic && hasGithubLink;
}

function createEmptyState() {
  const emptyState = document.createElement("div");

  emptyState.className = "empty-state";
  emptyState.textContent = "No projects added yet.";

  return emptyState;
}