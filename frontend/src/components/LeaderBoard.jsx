import Profiles from "./Profiles";
import { lb } from "../data";
export default function LeaderBoard() {
  return (
    <div>
      <h1>Leaderboard</h1>
      <Profiles data={lb} />
    </div>
  );
}
