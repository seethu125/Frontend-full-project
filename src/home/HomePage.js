import PersistentDrawerLeft from "../navBar/PersistentDrawerLeft";
import Home from "./Home";

export default function HomePage() {

    return (
        <PersistentDrawerLeft>
            <Home />
        </PersistentDrawerLeft>
        )
}