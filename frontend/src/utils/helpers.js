

// Format date
export function formatDate(dateStr) {
  if (!dateStr) return "Not set";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Format time
export function formatTime(timeStr) {
  if (!timeStr) return "Not set";
  return new Date(`2000-01-01T${timeStr}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

// Generate greeting
export function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";

  return "Good Evening";
}

// Get task extras from localStorage
export function getTaskExtras(taskId) {
  const extras = JSON.parse(localStorage.getItem("taskExtras") || "{}");
  return extras[taskId] || {};
}

// Save task extras to localStorage
export function saveTaskExtras(taskId, data) {
  const extras = JSON.parse(localStorage.getItem("taskExtras") || "{}");

  extras[taskId] = {
    ...extras[taskId],
    ...data,
  };

  localStorage.setItem("taskExtras", JSON.stringify(extras));
}

// Delete task extras
export function deleteTaskExtras(taskId) {
  const extras = JSON.parse(localStorage.getItem("taskExtras") || "{}");

  delete extras[taskId];

  localStorage.setItem("taskExtras", JSON.stringify(extras));
}

// Schedule reminder notification
export function scheduleReminder(taskTitle, date, time) {
  if (!date || !time) return;

  if (!("Notification" in window)) {
    alert("Browser notifications are not supported!");
    return;
  }

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      const reminderTime = new Date(`${date}T${time}`);
      const delay = reminderTime.getTime() - new Date().getTime();

      if (delay <= 0) {
        alert("Please select a future time!");
        return;
      }

      setTimeout(() => {
        new Notification("TaskFlow Reminder! ✦", {
          body: taskTitle,
          icon: "/vite.svg",
        });
      }, delay);

      alert(`Reminder set successfully! Notification will appear on ${date} at ${time} ✅`);
    } else {
      alert("Notification permission denied! Please allow it from browser settings.");
    }
  });
}