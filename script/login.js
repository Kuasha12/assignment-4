const container = document.getElementById("job-container");
const totalCount = document.getElementById("total-count");
const jobLength = document.getElementById("job-length");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");

const allBtn = document.getElementById("all-btn");
const interviewBtn = document.getElementById("interview-btn");
const rejectedBtn = document.getElementById("rejected-btn");

let jobs = [];
let currentFilter = "all";

async function loadJobs() {
  const response = await fetch("jobs.json");
  jobs = await response.json();
  renderJobs();
}

function renderJobs() {
  container.innerHTML = "";

  // Count update
  totalCount.innerText = jobs.length;
  interviewCount.innerText = jobs.filter(
    (j) => j.status === "interview",
  ).length;
  rejectedCount.innerText = jobs.filter((j) => j.status === "rejected").length;

  let filteredJobs = jobs;

  if (currentFilter === "interview") {
    filteredJobs = jobs.filter((j) => j.status === "interview");
  }

  if (currentFilter === "rejected") {
    filteredJobs = jobs.filter((j) => j.status === "rejected");
  }

  jobLength.innerText = filteredJobs.length + " jobs";

  if (filteredJobs.length === 0) {
    container.innerHTML = `
      <div class="text-center text-gray-400 text-xl mt-10">
        No jobs Available
      </div>
    `;
    return;
  }

  filteredJobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = "w-[1110px] mx-auto bg-[#f6ecec78] rounded-md p-6";

    card.innerHTML = `
      <div class="flex justify-between">
        <div>
          <h1 class="font-bold text-xl">${job.company}</h1>
          <p class="text-gray-400">${job.position}</p>
        </div>
      </div>

      <p class="text-gray-400 mt-3">
        ${job.location} • ${job.type} • ${job.salary}
      </p>

      <button class="btn bg-gray-300 mt-3">
        ${job.status ? job.status.toUpperCase() : "NOT APPLIED"}
      </button>

      <p class="mt-3">${job.description}</p>

      <div class="flex gap-3 mt-5">
        <button onclick="setStatus(${jobs.indexOf(job)}, 'interview')"
          class="btn w-32 text-green-500 border border-green-600">
          INTERVIEW
        </button>

        <button onclick="setStatus(${jobs.indexOf(job)}, 'rejected')"
          class="btn w-32 text-red-500 border border-red-600">
          REJECTED
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function setStatus(index, status) {
  jobs[index].status = status;
  renderJobs();
}

// ===== TAB BUTTON EVENTS =====

allBtn.addEventListener("click", () => {
  currentFilter = "all";
  setActive(allBtn);
  renderJobs();
});

interviewBtn.addEventListener("click", () => {
  currentFilter = "interview";
  setActive(interviewBtn);
  renderJobs();
});

rejectedBtn.addEventListener("click", () => {
  currentFilter = "rejected";
  setActive(rejectedBtn);
  renderJobs();
});

function setActive(activeBtn) {
  [allBtn, interviewBtn, rejectedBtn].forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("text-gray-400");
  });

  activeBtn.classList.add("btn-primary");
  activeBtn.classList.remove("text-gray-400");
}

loadJobs();
