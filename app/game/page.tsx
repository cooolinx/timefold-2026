import Game from "./components/Game";
import BackLink from "./BackLink";

export default function GamePage() {
  return (
    <main style={{ position: "relative" }}>
      <Game />
      <BackLink />
    </main>
  );
}
