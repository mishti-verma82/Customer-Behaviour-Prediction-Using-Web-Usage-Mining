// Handle form submission
document.getElementById("predictForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Collect form values
  const data = {
    administrative: document.getElementById("administrative").value,
    administrative_duration: document.getElementById("administrative_duration").value,
    informational: document.getElementById("informational").value,
    informational_duration: document.getElementById("informational_duration").value,
    product_related: document.getElementById("product_related").value,
    product_related_duration: document.getElementById("product_related_duration").value,
    bounce_rates: document.getElementById("bounce_rates").value,
    exit_rates: document.getElementById("exit_rates").value,
    page_values: document.getElementById("page_values").value,
    special_day: document.getElementById("special_day").value,
    month: document.getElementById("month").value,
    operating_system: document.getElementById("operating_system").value,
    browser: document.getElementById("browser").value,
    region: document.getElementById("region").value,
    traffic_type: document.getElementById("traffic_type").value,
    visitor_type: document.getElementById("visitor_type").value,
    weekend: document.getElementById("weekend").value
  };

  console.log("Form Data:", data);

  // Mock Prediction (replace with backend API later)
  const willPurchase = Math.random() > 0.5; // Random mock result
  const probability = (Math.random() * 0.5 + (willPurchase ? 0.5 : 0)).toFixed(2);

  const resultBox = document.getElementById("result");
  if (willPurchase) {
    resultBox.textContent = `✅ Likely to Purchase (Probability: ${probability})`;
    resultBox.className = "result-box result-success";
  } else {
    resultBox.textContent = `❌ Unlikely to Purchase (Probability: ${probability})`;
    resultBox.className = "result-box result-failure";
  }

  // Update Chart
  updateChart(probability, willPurchase);
});

// Chart.js setup
let chart;
function updateChart(prob, willPurchase) {
  const ctx = document.getElementById("probabilityChart").getContext("2d");
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Purchase", "Not Purchase"],
      datasets: [{
        data: willPurchase ? [prob, 1 - prob] : [prob, 1 - prob],
        backgroundColor: ["#27ae60", "#e74c3c"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}
