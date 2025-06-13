import React from "react";

const Dashboard = () => {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <div className="flex min-w-72 flex-col gap-3">
            <p className="text-[#101418] tracking-light text-[32px] font-bold leading-tight">
              Dashboard
            </p>
            <p className="text-[#5c718a] text-sm font-normal leading-normal">
              Real-time traffic data from IoT devices
            </p>
          </div>
        </div>

        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className="text-[#5c718a] flex border-none bg-[#eaedf1] items-center justify-center pl-4 rounded-l-xl border-r-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                placeholder="Search for devices or locations"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#101418] focus:outline-0 focus:ring-0 border-none bg-[#eaedf1] focus:border-none h-full placeholder:text-[#5c718a] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              />
            </div>
          </label>
        </div>

        <h2 className="text-[#101418] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Traffic Overview
        </h2>

        <div className="flex flex-wrap gap-4 px-4 py-6">
          <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d4dbe2] p-6">
            <p className="text-[#101418] text-base font-medium leading-normal">
              Traffic Volume Over Time
            </p>
            <p className="text-[#101418] tracking-light text-[32px] font-bold leading-tight truncate">
              12,345
            </p>
            <div className="flex gap-1">
              <p className="text-[#5c718a] text-base font-normal leading-normal">
                Last 7 Days
              </p>
              <p className="text-[#07883b] text-base font-medium leading-normal">
                +5%
              </p>
            </div>
            <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
              <svg
                width="100%"
                height="148"
                viewBox="-3 0 478 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                  fill="url(#paint0_linear_1131_5935)"
                />
                <path
                  d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                  stroke="#5c718a"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_1131_5935"
                    x1="236"
                    y1="1"
                    x2="236"
                    y2="149"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#eaedf1" />
                    <stop offset="1" stopColor="#eaedf1" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex justify-around">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <p
                      key={day}
                      className="text-[#5c718a] text-[13px] font-bold leading-normal tracking-[0.015em]"
                    >
                      {day}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d4dbe2] p-6">
            <p className="text-[#101418] text-base font-medium leading-normal">
              Vehicle Types Distribution
            </p>
            <p className="text-[#101418] tracking-light text-[32px] font-bold leading-tight truncate">
              6,789
            </p>
            <div className="flex gap-1">
              <p className="text-[#5c718a] text-base font-normal leading-normal">
                Current Month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
