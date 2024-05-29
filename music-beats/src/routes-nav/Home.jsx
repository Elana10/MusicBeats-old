import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import UserContext from '../auth/UserContext';
import Navigation from "./Navigation";
import RouteList from "./RoutesList";
import './Home.css'

function Home(){

    

    return (
        <div className="the-container">

            <h1>Welcome to MusicBeats</h1>
            <div className="intro-div">
                <p>
                Introducing our revolutionary music application designed to elevate your shopping experience! With our innovative music playlists tailored specifically to influence consumer behavior, we're transforming the way you shop. Harnessing the power of tempo, our app dynamically adjusts music playlists to match your shopping environment, creating the perfect ambiance to drive desired outcomes.
                </p>
                <p>
                Experience the thrill of faster tempos enhancing the pace of shoppers, encouraging impulse purchases, and energizing the shopping atmosphere. Our upbeat playlists seamlessly synchronize with your shopping journey, infusing excitement and momentum into every aisle.
                </p>
                <p>
                Alternatively, immerse yourself in a tranquil shopping oasis with slower tempos carefully curated to enhance relaxation and promote longer shopping durations. Indulge in a leisurely browsing experience as our soothing melodies envelop you, encouraging a deeper connection with products and fostering a sense of exploration.
                </p>
                <p>
                Join us as we redefine the shopping landscape with our music application, where every beat is crafted to optimize your shopping experience and unlock new realms of consumer engagement
                </p>
            </div>
            <div className="the-container">
                <h4 className="references-header">Resource References</h4>
                <div>
                    <ul>
                        <li>
                            <a href="https://www.linkedin.com/advice/0/how-does-music-tempo-influence-shopping-speed#:~:text=Several%20studies%20have%20shown%20that,leisure%2C%20depending%20on%20the%20BPM">
                                How does music tempo influence shopping speed and spending?
                            </a>
                        </li>
                        <li>
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10497766/">
                            The effects of background music tempo on consumer variety-seeking behavior: the mediating role of arousal 
                            </a>
                        </li>
                        <li>
                            <a href="https://www.tcrwebsite.org/volumes/11116/volumes/e04/E-04">
                            Play That One Again: the Effect of Music Tempo on Consumer Behaviour in a Restaurant
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Home;