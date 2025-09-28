
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      formMessage.textContent = "✅ Message sent successfully!";
      formMessage.style.color = "#00ff7f";
      form.reset();

      if (data.previewUrl) {
        console.log("📧 Preview your email here:", data.previewUrl);
      }
    } else {
      formMessage.textContent = "❌ " + (data.error || "Something went wrong.");
      formMessage.style.color = "#ff4d4d";
    }
  } catch (err) {
    formMessage.textContent = "❌ Could not connect to server.";
    formMessage.style.color = "#ff4d4d";
  }
});