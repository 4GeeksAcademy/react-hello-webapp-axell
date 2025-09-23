import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { useStore } from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, actions } = useStore();

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} alt="Rigo" />
      </p>
    </div>
  );
};
