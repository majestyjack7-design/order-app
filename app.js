import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://fnbptnjenlepfxizsrcw.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYnB0bmplbmxlcGZ4aXpzcmN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3ODYwMzQsImV4cCI6MjA4NzM2MjAzNH0.HTdsf9C9Atc7EIIk-ctnA2sI62MnN7M5CYMLAOuG1xA";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Register customer
document
  .getElementById("customerForm")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const full_name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    const { error } = await supabase
      .from("customers")
      .insert([{ full_name, email, phone }]);

    if (error) {
      alert("Error: " + error.message);
      return;
    }

    alert("Customer Registered Successfully!");
    document.getElementById("customerForm").reset();
  });

// Load summary
document.getElementById("loadSummary")?.addEventListener("click", async () => {
  const { data, error } = await supabase
    .from("customers")
    .select("full_name, phone");

  if (error) {
    alert("Error loading data");
    return;
  }

  document.getElementById("totalCount").textContent =
    "Total Registered Customers: " + data.length;

  const tbody = document.querySelector("#summaryTable tbody");
  tbody.innerHTML = "";

  data.forEach((c) => {
    const row = `<tr>
      <td>${c.full_name}</td>
      <td>${c.phone}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
});
