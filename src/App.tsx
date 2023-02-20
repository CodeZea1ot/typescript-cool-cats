import CatsGrid from './components/CatsGrid'
import './App.scss'

export const App = () => {
    return (
        <div className="App">
            <span className="watermark">Cool Cats</span>
            <div className="container my-5">
                <h1 className="heading">Cool Cats</h1>
                <h2 className="subheading">
                    The cats are out of the bag! Select your favorite kittens
                    and put them back in. Don't forget to upvote and downvote
                    cats based on how many cool points you think they deserve!
                </h2>
            </div>
            <CatsGrid />
        </div>
    )
}

export default App
