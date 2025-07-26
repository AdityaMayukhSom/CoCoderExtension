import { useState } from "react";
import { ContestData } from "@/types/contest";
import { ContestCard } from "./ContestCard";
import { fetchContests } from "@/utils/fetchContests";
import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { DateTime } from "luxon";

function App() {
  const [contests, setContests] = useState<ContestData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getContests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedContests = await fetchContests(
        "CodeChef",
        "Codeforces",
        "LeetCode"
      );
      fetchedContests.sort(
        (a, b) =>
          DateTime.fromISO(a.beginTime).toMillis() -
          DateTime.fromISO(b.beginTime).toMillis()
      );
      setContests(fetchedContests);
    } catch (err) {
      setError((err as Error).message);
      console.error("Failed to fetch contests:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContests();
  }, []);

  return (
    <div className="max-w-2xl w-96 px-3 pb-5 mx-auto bg-zinc-900 min-h-screen text-white *:font-manrope relative">
      <div className="flex flex-row justify-between sticky top-0 bg-zinc-900 py-2 items-center">
        <h2 className="text-2xl font-medium text-white">Upcoming Contests</h2>
        <button
          onClick={() => getContests()}
          className="p-2 bg-gray-700/40 cursor-pointer"
        >
          <ArrowPathIcon className="size-5" />
        </button>
      </div>
      <hr className="border-t border-gray-700" />
      {isLoading && (
        <p className="text-gray-400 text-center">Loading contests...</p>
      )}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!isLoading && !error && contests.length === 0 && (
        <p className="text-gray-400 text-center">No upcoming contests found.</p>
      )}
      {!isLoading && !error && contests.length > 0 && (
        <div className="flex flex-col gap-y-3 py-2">
          {contests.map((contest) => (
            <ContestCard key={contest.contestLink} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
