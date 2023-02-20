import { useState } from 'react'
import CatCard from '../CatCard'
import { GiSwapBag } from 'react-icons/gi'
import catsData from '../../data/cats'
import './index.scss'
import { CatData } from '../../types/cats'

const initialCats: CatData[] = catsData

const CatsGrid = () => {
    const [cats, setCats] = useState(initialCats)
    const [selectedCats, setSelectedCats] = useState<number[]>([])
    const [bag, setBag] = useState<CatData[]>([])

    function handleSelectCat(id: number) {
        if (selectedCats.includes(id)) {
            setSelectedCats(selectedCats.filter((catId) => catId !== id))
        } else {
            setSelectedCats([...selectedCats, id])
        }
    }

    const handleVote = (catID: number, upvote: boolean) => {
        const objFoundInCats = cats.find((cat) => cat.id === catID)
        const objFoundInBag = bag.find((cat) => cat.id === catID)

        if (objFoundInCats) {
            setCats(updateVoteState(catID, objFoundInCats, upvote, [...cats]))
        } else if (objFoundInBag) {
            setBag(updateVoteState(catID, objFoundInBag, upvote, [...bag]))
        } else {
            console.error('Could not find cat while handling vote')
        }
    }

    const updateVoteState = (
        catID: number,
        catObj: CatData,
        upvote: boolean,
        state: CatData[]
    ) => {
        upvote ? catObj.votes++ : catObj.votes > 0 && catObj.votes--
        state[state.findIndex((c) => c.id === catID)].votes = catObj.votes
        return state
    }

    const handleAddToBag = () => {
        setBag((prevBag) =>
            prevBag.concat(
                cats.filter((availableCat) =>
                    selectedCats.includes(availableCat.id)
                )
            )
        )
        setCats((prevCats) =>
            prevCats.filter((cat) => !selectedCats.includes(cat.id))
        )
        setSelectedCats([])
    }

    const handleRemoveFromBag = () => {
        setCats((prevCats) =>
            prevCats.concat(
                bag.filter((bagCat) => selectedCats.includes(bagCat.id))
            )
        )
        setBag((prevbag) =>
            prevbag.filter((cat) => !selectedCats.includes(cat.id))
        )
        setSelectedCats([])
    }

    return (
        <div className="CatsGrid my-5">
            <section className="cats-available">
                <div className="container">
                    <h2 className="my-5">Available Cats</h2>
                    {cats.length === 0 && (
                        <p>All of the cats are in the bag!</p>
                    )}
                    <div className="cat-grid row">
                        {cats.map((cat) => (
                            <CatCard
                                key={cat.id}
                                cat={cat}
                                onSelect={handleSelectCat}
                                onVote={handleVote}
                                isSelected={selectedCats.includes(cat.id)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <section className="cats-bag my-5 py-5">
                <span className="watermark-bag">
                    <GiSwapBag />
                </span>
                <div className="container">
                    <h2 className="my-5">Bag</h2>
                    {bag.length === 0 ? (
                        <p>Your bag is empty.</p>
                    ) : (
                        <div className="row">
                            {bag.map((cat) => (
                                <CatCard
                                    key={cat.id}
                                    cat={cat}
                                    onSelect={handleSelectCat}
                                    onVote={handleVote}
                                    isSelected={selectedCats.includes(cat.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
            <section className="cat-controls my-5">
                <div className="buttons-wrapper">
                    {cats.length !== 0 && (
                        <button
                            className="btn btn-primary"
                            onClick={handleAddToBag}
                            disabled={selectedCats.length ? false : true}
                        >
                            Add to Bag
                        </button>
                    )}
                    {bag.length >= 1 && (
                        <button
                            className="btn btn-primary"
                            onClick={handleRemoveFromBag}
                            disabled={selectedCats.length ? false : true}
                        >
                            Remove from Bag
                        </button>
                    )}
                </div>
            </section>
        </div>
    )
}
export default CatsGrid
