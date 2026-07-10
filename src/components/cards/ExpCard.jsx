import React from "react";

export default function ExpCard({ data }) {
  return (
    <div className="glass-card p-4 sm:p-card-padding rounded-xl hover:border-primary/40 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6 gap-3 sm:gap-4">
        <div>
          <span className="font-label-caps text-label-caps-xs sm:text-label-caps text-primary bg-primary/10 px-2 sm:px-3 py-1 rounded-full mb-2 inline-block">
            {data.type}
          </span>
          <h3 className="font-headline-sm text-headline-sm-xs sm:text-headline-sm text-text-primary">
            {data.role}
          </h3>
          <p className="font-body-base text-body-base-sm sm:text-body-base text-text-muted">
            {data.company} • {data.year}
          </p>
        </div>
        <span className="material-symbols-outlined text-text-muted text-3xl sm:text-4xl group-hover:text-primary transition-colors">
          terminal
        </span>
      </div>
      <ul className="space-y-2 sm:space-y-3 text-text-secondary text-sm sm:text-base">
        {data.descriptions.map((data, indexs) => (
          <li key={indexs} className="flex gap-3">
            <span className="text-primary">▹</span>
            <span>{data}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
