let token = localStorage.getItem("token");

if(!token) window.location.href = "/login";

document.addEventListener("DOMContentLoaded", function () {
    const monthlyChart = echarts.init(document.getElementById("monthlyChart"));
    const monthlyOption = {
      animation: false,
      grid: { top: 0, right: 0, bottom: 0, left: 0 },
      xAxis: {
        type: "category",
        data: [
          "Yan",
          "Fev",
          "Mar",
          "Apr",
          "May",
          "Iyun",
          "Iyul",
          "Avg",
          "Sen",
          "Okt",
          "Noy",
          "Dek",
        ],
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: "#f3f4f6" } },
      },
      series: [
        {
          data: [28, 32, 45, 38, 52, 48, 55, 62, 58, 65, 72, 68],
          type: "line",
          smooth: true,
          symbol: "none",
          lineStyle: { color: "rgba(87, 181, 231, 1)", width: 3 },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: "rgba(87, 181, 231, 0.1)" },
                { offset: 1, color: "rgba(87, 181, 231, 0.01)" },
              ],
            },
          },
        },
      ],
      tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "#e5e7eb",
        textStyle: { color: "#1f2937" },
      },
    };
    monthlyChart.setOption(monthlyOption);

    const paymentChart = echarts.init(document.getElementById("paymentChart"));
    const paymentOption = {
      animation: false,
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          data: [
            {
              value: 68,
              name: "To'langan",
              itemStyle: { color: "rgba(87, 181, 231, 1)", borderRadius: 8 },
            },
            {
              value: 23,
              name: "Kutilmoqda",
              itemStyle: { color: "rgba(141, 211, 199, 1)", borderRadius: 8 },
            },
            {
              value: 9,
              name: "Kechiktirilgan",
              itemStyle: { color: "rgba(252, 141, 98, 1)", borderRadius: 8 },
            },
          ],
          label: { show: true, formatter: "{b}: {c}%" },
        },
      ],
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "#e5e7eb",
        textStyle: { color: "#1f2937" },
      },
    };
    paymentChart.setOption(paymentOption);
  });


  const profileBtn = document.getElementById("profileBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const arrowIcon = document.getElementById("arrowIcon");

  profileBtn.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
    arrowIcon.classList.toggle("rotate-180");
  });

  // Dropdowndan tashqariga bosilganda yopish uchun
  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.add("hidden");
      arrowIcon.classList.remove("rotate-180");
    }
  });

  const profileName = document.querySelector(".fName");
  const profileRole = document.querySelector(".role");
  const profileIamge = document.querySelector(".profileImg")
  
  let user = JSON.parse(localStorage.getItem("user"));
  
  
  profileName.textContent = `${user.first_name} ${user.last_name}`;
  profileRole.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase();
  profileIamge.src = user.avatar;