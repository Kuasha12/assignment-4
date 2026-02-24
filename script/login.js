const container = document.getElementById("job-container");
const totalCount = document.getElementById("total-count");
const jobLength = document.getElementById("job-length");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");

let jobs = [];

async function loadJobs() {
  const response = await fetch("jobs.json");
  jobs = await response.json();

  renderJobs();
}

function renderJobs() {
  container.innerHTML = "";

  totalCount.innerText = jobs.length;
  jobLength.innerText = jobs.length + " jobs";

  interviewCount.innerText = jobs.filter(
    (j) => j.status === "interview",
  ).length;
  rejectedCount.innerText = jobs.filter((j) => j.status === "rejected").length;

  jobs.forEach((job, index) => {
    const card = document.createElement("div");
    card.className = "w-[1110px] mx-auto bg-[#f6ecec78] rounded-md p-6";

    card.innerHTML = `
      <div class="flex justify-between">
        <div>
          <h1 class="font-bold text-xl">${job.company}</h1>
          <p class="text-gray-400">${job.position}</p>
        </div>
        <span onclick="deleteJob(${index})"
          class="border border-gray-300 rounded-full px-3 py-3 cursor-pointer">
          <i class="fa-regular fa-trash-can"></i>
        </span>
      </div>

      <p class="text-gray-400 mt-3">
        ${job.location} • ${job.type} • ${job.salary}
      </p>

      <button class="btn bg-gray-300 mt-3">
        ${job.status ? job.status.toUpperCase() : "NOT APPLIED"}
      </button>

      <p class="mt-3">${job.description}</p>

      <div class="flex gap-3 mt-5">
        <button onclick="setStatus(${index}, 'interview')"
          class="btn w-32 text-green-500 border border-green-600">
          INTERVIEW
        </button>

        <button onclick="setStatus(${index}, 'rejected')"
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

function deleteJob(index) {
  jobs.splice(index, 1);
  renderJobs();
}

loadJobs();

// let interviwCount = 0;

// const interviwBut = document.getElementById("interview-btn");

// const statusBtn = document.getElementById("status-btn");
// const interviwCountText = document.getElementById("interview-count");

// interviwBut.addEventListener("click", function () {
//   if (statusBtn.innerText === "NOT APPLIED" && interviwCount < 8) {
//     interviwCount++;
//     interviwCountText.innerText = interviwCount;

//     statusBtn.innerText = "INTERVIEW";
//     statusBtn.classList.remove("bg-gray-300");
//     statusBtn.classList.add("bg-green-400", "text-white");
//   }
// });
