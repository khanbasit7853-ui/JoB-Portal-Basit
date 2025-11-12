// ✅ Jobs array with images + requirements
const jobs = [
  {
    title: "Frontend Developer",
    company: "TechSoft",
    location: "New York",
    description: "Build and maintain websites using HTML, CSS, JS.",
    image: "images/front end.jpeg",
    requirements: [
      "Bachelor’s degree in Computer Science or related field",
      "Proficiency in HTML, CSS, and JavaScript",
      "Experience with React or Angular frameworks"
    ]
  },
  {
    title: "Backend Developer",
    company: "DataWorks",
    location: "San Francisco",
    description: "Work with Node.js and databases to build APIs.",
    image: "images/Backend-Engineer-1.jpg",
    requirements: [
      "Bachelor’s degree in Software Engineering",
      "Experience with Node.js and Express",
      "Database knowledge (MySQL or MongoDB)"
    ]
  },
  {
    title: "Driver",
    company: "PSO",
    location: "Shikarpur Sindh",
    description: "Ensure that you have at least four or five years experience of driving.",
    image: "images/driver.jpeg",
    requirements: [
      "Matric certificate",
      "Valid driving license",
      "Minimum 4–5 years of driving experience"
    ]
  },
  {
    title: "Manager",
    company: "Total Parko",
    location: "Faizu Shikarpur",
    description: "You should qualify your degree from affiliated Board or University.",
    image: "images/manager.jpeg",
    requirements: [
      "Bachelor’s or Master’s degree from an HEC recognized university",
      "Strong communication and leadership skills",
      "Minimum 3 years of management experience"
    ]
  },
  {
    title: "Teacher",
    company: "BrightFuture School",
    location: "Sukkur",
    description: "Teach and guide students towards academic excellence.",
    image: "images/teacher.jpeg",
    requirements: [
      "Intermediate or Bachelor’s degree",
      "B.Ed or M.Ed preferred",
      "Strong teaching and communication skills"
    ]
  },
  {
    title: "Electrician",
    company: "PowerTech",
    location: "Hyderabad Sindh",
    description: "Install and repair electrical systems in buildings.",
    image: "images/Electrician.jpeg",
    requirements: [
      "Matric certificate",
      "Technical diploma in Electrical",
      "Minimum 2 years of field experience"
    ]
  },
  {
    title: "HR Officer",
    company: "PeopleFirst",
    location: "Karachi",
    description: "Manage recruitment, employee relations, and HR policies.",
    image: "images/HR Officer.jpeg",
    requirements: [
      "Bachelor’s degree in HR or Business Administration",
      "Good interpersonal and communication skills",
      "Knowledge of labor laws"
    ]
  },
  {
    title: "Graphic Designer",
    company: "Creatify Studio",
    location: "Lahore",
    description: "Design logos, posters, and brand materials using Adobe tools.",
    image: "images/Graphic Designer.jpeg",
    requirements: [
      "Intermediate or Bachelor’s degree",
      "Proficiency in Adobe Photoshop and Illustrator",
      "Creative design portfolio"
    ]
  },
  {
    title: "Sales Executive",
    company: "MarketPro",
    location: "Islamabad",
    description: "Develop sales strategies and maintain client relationships.",
    image: "images/sales.jpeg",
    requirements: [
      "Intermediate or Bachelor’s degree",
      "Strong communication and negotiation skills",
      "Experience in marketing/sales preferred"
    ]
  }
];

// ✅ Display Jobs
function displayJobs(jobList) {
  const container = document.getElementById("job-listings");
  container.innerHTML = "";

  jobList.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.classList.add("job");

    jobCard.innerHTML = `
      <div class="job-card">
        <img src="${job.image}" alt="${job.title}" class="job-image">
        <div class="job-details">
          <h3>${job.title}</h3>
          <p><strong>Company:</strong> ${job.company}</p>
          <p><strong>Location:</strong> ${job.location}</p>
          <p>${job.description}</p>
          <button class="apply-btn" onclick="applyNow('${job.title}')">Apply Now</button>
        </div>
      </div>
    `;
    container.appendChild(jobCard);
  });
}

// ✅ Show Job Requirements
let selectedJobTitle = "";
function applyNow(jobTitle) {
  const selectedJob = jobs.find(job => job.title === jobTitle);
  if (!selectedJob) return;
  selectedJobTitle = selectedJob.title;

  document.getElementById("modal-title").innerText = `✅ ${selectedJob.title}`;
  const reqList = document.getElementById("modal-requirements");
  reqList.innerHTML = "";

  selectedJob.requirements.forEach(req => {
    const li = document.createElement("li");
    li.textContent = req;
    reqList.appendChild(li);
  });

  document.getElementById("requirementModal").style.display = "flex";
}

// ✅ Close requirement modal
function closeModal() {
  document.getElementById("requirementModal").style.display = "none";
}

// ✅ Open job application modal
function openApplyModal() {
  document.getElementById("requirementModal").style.display = "none";
  document.getElementById("applyModal").style.display = "flex";
}

// ✅ Close job application modal
function closeApplyModal() {
  document.getElementById("applyModal").style.display = "none";
}

// ✅ Submit Application — Save in localStorage
function submitApplication(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const message = form.message.value;

  // 🟩 Create application object
  const application = {
    jobTitle: selectedJobTitle,
    name,
    email,
    phone,
    message,
    date: new Date().toLocaleString()
  };

  // 🟩 Retrieve old data
  const existing = JSON.parse(localStorage.getItem("jobApplications")) || [];
  existing.push(application);

  // 🟩 Save updated data
  localStorage.setItem("jobApplications", JSON.stringify(existing));

  alert(
    `✅ Application Submitted!\n\nJob: ${selectedJobTitle}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nYour application has been saved successfully!`
  );

  form.reset();
  closeApplyModal();
}

// ✅ Optional — View saved applications (for debugging)
function showSavedApplications() {
  const applications = JSON.parse(localStorage.getItem("jobApplications")) || [];
  console.table(applications);
  alert(`📦 You have ${applications.length} saved applications. Check console for details.`);
}

// ✅ Click outside modals to close
window.onclick = function(event) {
  const modals = [document.getElementById("requirementModal"), document.getElementById("applyModal")];
  modals.forEach(modal => {
    if (event.target === modal) modal.style.display = "none";
  });
};

// ✅ Search Function
function searchJobs() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(query) ||
    job.company.toLowerCase().includes(query) ||
    job.location.toLowerCase().includes(query)
  );

  if (filteredJobs.length === 0) {
    alert("❌ No matching job found!");
  } else {
    displayJobs(filteredJobs);
  }
}

// ✅ Search Input Events
document.getElementById("searchBox").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchJobs();
  }
});
document.getElementById("searchBox").addEventListener("input", searchJobs);

// ✅ Show all jobs initially
displayJobs(jobs);
