document.addEventListener("DOMContentLoaded", () => {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const jobLists = document.querySelector(".list");
      const template = document.querySelector(".job-template").content;

      data.forEach((job) => {
        const jobElement = document.importNode(template, true);

        jobElement.querySelector(".company").textContent = job.company;
        jobElement.querySelector(".logo").src = job.logo;
        if (job.new) {
          const newtag = document.createElement("div");
          newtag.textContent = "NEW!";
          newtag.classList.add("new");
          jobElement.querySelector(".company-new-featured").appendChild(newtag);
        }

        if (job.featured) {
          const featuredtag = document.createElement("div");
          featuredtag.textContent = "FEATURED";
          featuredtag.classList.add("featured");
          jobElement
            .querySelector(".company-new-featured")
            .appendChild(featuredtag);
          jobElement.querySelector(".job-offer").classList.add("featured-job");
        }

        jobElement.querySelector(".title").textContent = job.position;
        jobElement.querySelector(".day-posted").textContent = job.postedAt;
        jobElement.querySelector(".type").textContent = job.contract;
        jobElement.querySelector(".location").textContent = job.location;
        jobElement.querySelector(".skills-list").innerHTML = "";

        const role = document.createElement("div");
        role.textContent = job.role;
        role.classList.add("skill");
        jobElement.querySelector(".skills-list").appendChild(role);

        const level = document.createElement("div");
        level.textContent = job.level;
        level.classList.add("skill");
        jobElement.querySelector(".skills-list").appendChild(level);

        job.languages.forEach((lang) => {
          const language = document.createElement("div");
          language.textContent = lang;
          language.classList.add("skill");
          jobElement.querySelector(".skills-list").appendChild(language);
        });

        job.tools.forEach((tol) => {
          const tool = document.createElement("div");
          tool.textContent = tol;
          tool.classList.add("skill");
          jobElement.querySelector(".skills-list").appendChild(tool);
        });
        jobLists.appendChild(jobElement);
      });
      const skillsLists = document.querySelectorAll(".skills-list");
      skillOnClick(skillsLists);
    })
    .catch((e) => console.error("i cant fetch the data", e));
});

const skills = document.querySelectorAll(".skill");
const jobList = document.querySelector(".list");
const filterBar = document.querySelector(".filter-bar");
const filterBarSkills = document.querySelector(".filter-bar-skills");
const filterBarClear = document.querySelector(".filter-bar-clear");

function skillOnClick(skillsLists) {
  const skills = document.querySelectorAll(".skill");
  skills.forEach((skill) => {
    skill.addEventListener("click", () =>
      addFilterBar(skill.textContent, skillsLists)
    );
  });
}

function addFilterBar(skillText, skillsLists) {
  jobList.style.margin = "0% 10%";
  filterBar.style.display = "flex";

  addSKill(skillText, skillsLists);

  checkAndFilter(skillsLists, skillText);

  filterBarClear.addEventListener("click", () => clear(skillsLists));
}

function addSKill(skillText, skillsLists) {
  if (!filters.includes(skillText)) {
    const filterSkillButton = document.createElement("span");
    const filterSkillText = document.createElement("span");
    const filterSkillX = document.createElement("span");

    filterSkillText.innerText = skillText;
    filterSkillText.classList.add("filter-bar-skill-text");

    filterSkillX.innerHTML = "&times;";
    filterSkillX.classList.add("filter-bar-skill-x");
    filterSkillX.addEventListener("click", () =>
      removeSkill(filterSkillButton, skillText, skillsLists)
    );

    filterSkillButton.appendChild(filterSkillText);
    filterSkillButton.appendChild(filterSkillX);
    filterSkillButton.classList.add("filter-bar-skill");

    filterBarSkills.appendChild(filterSkillButton);
  }
}

function removeSkill(filterSkillButton, skillText, skillsLists) {
  filterBarSkills.removeChild(filterSkillButton);
  if (filterBarSkills.children.length === 0) {
    filterBar.style.display = "none";
  }
  returnOffers(skillText, skillsLists);
}

const filters = [];
function checkAndFilter(skillsLists, skillText) {
  skillsLists.forEach((skillsList) => {
    if (!skillsList.innerText.includes(skillText)) {
      skillsList.parentElement.style.display = "none";
      if (!filters.includes(skillText)) filters.push(skillText);
    }
  });
}

function returnOffers(skillText, skillsLists) {
  const index = filters.indexOf(skillText);
  filters.splice(index, 1);

  skillsLists.forEach((skillsList) => {
    let displayOffer = true;
    filters.forEach((filter) => {
      if (!skillsList.innerText.includes(filter)) displayOffer = false;
    });
    if (displayOffer) {
      skillsList.parentElement.style.display = "flex";
    }
  });
}

function clear(skillsLists) {
  Array.from(filterBarSkills.children).forEach((skill, index) => {
    skill.remove();
  });
  filterBar.style.display = "none";
  skillsLists.forEach(
    (skillsList) => (skillsList.parentElement.style.display = "flex")
  );
  filters.splice(0, filters.length);
  jobList.style.margin = "5% 10%";
}

skills.forEach((skill) => {
  skill.addEventListener("click", () => addFilterBar(skill.textContent));
});

const headerImg = document.querySelector(".header-img");
const mediaQuery = window.matchMedia("(max-width: 375px)");

function updateImageSrc(event) {
    if (event.matches) { 
        headerImg.src = "images/bg-header-mobile.svg"; 
    } else {
        headerImg.src = "images/bg-header-desktop.svg";
    }
}

updateImageSrc(mediaQuery);

mediaQuery.addEventListener('change', updateImageSrc);