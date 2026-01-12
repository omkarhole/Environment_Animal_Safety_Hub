document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cursor-container");
  if (!container) return;

  fetch("/frontend/components/cursor.html")
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;

      // 🔥 Execute scripts inside cursor.html
      container.querySelectorAll("script").forEach(oldScript => {
        const newScript = document.createElement("script");

        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }

        document.body.appendChild(newScript);
        oldScript.remove();
      });
    })
    .catch(err => console.error("Cursor load failed:", err));
});
