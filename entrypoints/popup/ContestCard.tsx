import React from "react";
import { DateTime, Duration } from "luxon";
import { ContestData } from "@/types/contest";

interface ContestCardProps {
  contest: ContestData;
}

const formatDate = (date: DateTime): string => {
  return date.toLocaleString(DateTime.DATE_FULL);
};

const formatTime = (date: DateTime): string => {
  return date.toLocaleString(DateTime.TIME_SIMPLE);
};

export const ContestCard: React.FC<ContestCardProps> = ({ contest }) => {
  const beginDateTime = DateTime.fromISO(contest.beginTime);
  const ceaseDateTime = DateTime.fromISO(contest.ceaseTime);

  const beginTimeStr = formatTime(beginDateTime);
  const ceaseTimeStr = formatTime(ceaseDateTime);
  const timeRangeStr = `${beginTimeStr} - ${ceaseTimeStr}`;

  const beginDateStr = formatDate(beginDateTime);
  const ceaseDateStr = formatDate(ceaseDateTime);
  const dateRangeStr = `${beginDateStr} - ${ceaseDateStr}`;

  const duration = Duration.fromISO(contest.duration);

  return (
    <div className="bg-zinc-800 p-4 shadow-lg text-white *:font-manrope">
      <a
        href={contest.contestLink}
        target="_blank"
        className="flex justify-between items-center mb-3 font-medium text-base flex-grow"
      >
        {contest.displayName}
      </a>
      <div className="flex justify-between items-start mb-1">
        <span className="font-medium text-sm text-green-500 flex items-center uppercase">
          {contest.platform}
        </span>
        <span className="text-xs text-gray-400 whitespace-nowrap">
          {dateRangeStr}
        </span>
      </div>
      <div className="flex justify-between items-center text-xs text-gray-300">
        <span className="text-sm">Duration: {duration.toHuman()}</span>
        <span className="text-xs text-gray-400">{timeRangeStr}</span>

        {/* <a
          href={contest.contestLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 text-sm no-underline hover:underline transition-colors duration-200"
        >
          View Contest ↗️
        </a> */}
      </div>
    </div>
  );
};
